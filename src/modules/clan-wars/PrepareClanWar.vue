<template>
  <page-view :title="isEdit ? 'Edit member' : 'Add clan war'">
    <template #actions>
      <g-primary-btn prepend-icon="mdi-check" @click="saveMember">Save</g-primary-btn>
    </template>
    <v-card class="pb-4 px-4">
      <template v-if="loadingMemberState === LoadingDataState.LOADING">
        <v-col cols="12">
          <g-loading-progress-circular message="Loading members" />
        </v-col>
      </template>
      <template v-else-if="loadingMemberState === LoadingDataState.OK">
        <v-form class="pt-8">
          <v-row>
            <v-col cols="12">
              <v-btn-toggle
                v-model="warFormat"
                density="compact"
                :multiple="false"
                variant="outlined"
                color="white"
                selected-class="bg-green"
                class="text-grey-lighten-1"
                mandatory
              >
                <template v-for="option in warFormatOptions" :key="option.value">
                  <v-btn v-if="option.value <= members.length" :value="option.value">{{ option.label }}</v-btn>
                </template>
              </v-btn-toggle>
            </v-col>
            <template v-for="member in recomendedMembers" :key="member.firebaseId">
              <v-col cols="4">
                {{ member }}
              </v-col>
            </template>
            {{ recomendedMembers.length }}
          </v-row>
        </v-form>
      </template>
      <div v-else>
        <g-error-message @try-again="fetchMembers" />
      </div>
    </v-card>
  </page-view>
</template>

<script setup lang="ts">
import PageView from '@/components/PageView.vue';
import { computed, onMounted, ref } from 'vue';
import type ClanMember from '@/models/clan-member';
import GPrimaryBtn from '@/components/GPrimaryBtn.vue';
import { ClanMemberRole } from '@/models/clan-member-role';
import { useRoute, useRouter } from 'vue-router';
import RouteNames from '@/router/route-names';
import { ClanMemberFirebase, useMembersAPI } from '@/firebase-api-db/members';
import { LoadingDataState } from '@/models/enum/loading-data-state';
import GLoadingProgressCircular from '@/components/GLoadingProgressCircular.vue';
import GErrorMessage from '@/components/GErrorMessage.vue';
import { getLastTimeSeenInDays } from '@/helpers/date-helper';

const loadingMemberState = ref(LoadingDataState.LOADING);

const router = useRouter();
const route = useRoute();

const membersApi = useMembersAPI();
const isEdit = computed(() => {
  return route.name === RouteNames.EDIT_CLAN_WAR;
});

const warFormat = ref(5);
const warFormatOptions = [
  { label: '5 vs 5', value: 5 },
  { label: '10 vs 10', value: 10 },
  { label: '15 vs 15', value: 15 },
  { label: '20 vs 20', value: 20 },
  { label: '25 vs 25', value: 25 },
  { label: '30 vs 30', value: 30 },
  { label: '40 vs 40', value: 40 },
  { label: '50 vs 50', value: 50 },
];

const members = ref<ClanMemberFirebase[]>([]);
const recomendedMembers = computed(() => {
  return members.value.filter(it => it.data.warStatus && getLastTimeSeenInDays(it.data.lastTimeSeen) === 0);
});

const memberId = route.params.id ?? '';

const member = ref<ClanMember>({
  id: '',
  name: '',
  th: '1',
  role: ClanMemberRole.MEMBER,
  lastTimeSeen: new Date(),
  isActive: true,
  enteringDate: new Date(),
  warStatus: false,
});

const id = computed({
  get() {
    return member.value.id;
  },
  set(value) {
    member.value.id = value.toUpperCase();
  },
});

const memberRoles = [
  { title: 'Leader', value: ClanMemberRole.LEADER },
  { title: 'Co-leader', value: ClanMemberRole.CO_LEADER },
  { title: 'Elder', value: ClanMemberRole.ELDER },
  { title: 'Member', value: ClanMemberRole.MEMBER },
];

const lastTimeSeenOptions = [
  { title: 'Recently', value: 0 },
  { title: '1 day', value: 1 },
  { title: '2 days', value: 2 },
  { title: '3 days', value: 3 },
  { title: '4 days', value: 4 },
  { title: '5 days', value: 5 },
  { title: '6 days', value: 6 },
  { title: 'More than a week', value: 7 },
];

const lastTimeSeen = computed({
  get() {
    const value = new Date().getDate() - new Date(member.value.lastTimeSeen).getDate();
    return value > 7 ? 7 : value;
  },
  set(value) {
    const now = new Date();
    member.value.lastTimeSeen = new Date(now.setDate(now.getDate() - value));
  },
});

function kickOutMember() {
  member.value.isActive = false;
}

function reJoinMember() {
  member.value.isActive = true;
  member.value.enteringDate = new Date();
}

function saveMember() {
  if (isEdit.value) {
    membersApi.editMember(memberId, member.value).then(() => {
      router.push({ name: RouteNames.MEMBERS });
    });
  } else {
    membersApi.addMember(member.value).then(async response => {
      const body = await response.json();
      router.push({ name: RouteNames.EDIT_MEMBER, params: { id: body.name } });
    });
  }
}

function saveMemberAndKeepAdding() {
  membersApi.addMember(member.value).then(() => {
    member.value = {
      id: '',
      name: '',
      th: '1',
      role: ClanMemberRole.MEMBER,
      lastTimeSeen: new Date(),
      isActive: true,
      enteringDate: new Date(),
      warStatus: false,
    };
  });
}

async function fetchMembers() {
  try {
    loadingMemberState.value = LoadingDataState.LOADING;
    members.value = await membersApi.getMembers();
    loadingMemberState.value = LoadingDataState.OK;
  } catch (error) {
    loadingMemberState.value = LoadingDataState.ERROR;
    console.error(error);
  }
}

onMounted(() => {
  fetchMembers();
  if (isEdit.value) {
    // do nothing
  } else {
    // loadingMemberState.value = LoadingDataState.OK;
  }
});
</script>

<style scoped></style>
