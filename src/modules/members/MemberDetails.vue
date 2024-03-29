<template>
  <page-view :title="isEdit ? 'Edit member' : 'Add member'">
    <template #actions>
      <g-primary-btn prepend-icon="mdi-check" @click="saveMember">Save</g-primary-btn>
      <g-primary-btn v-if="!isEdit" prepend-icon="mdi-check" @click="saveMemberAndKeepAdding" class="ml-4">
        Save & keep adding
      </g-primary-btn>
    </template>
    <v-card class="pb-4 px-4">
      <g-loading-progress-circular v-if="loadingMemberState === LoadingDataState.LOADING" message="Loading member" />
      <v-form v-else-if="loadingMemberState === LoadingDataState.OK" class="pt-8">
        <v-row>
          <v-col cols="4">
            <v-text-field v-model="id" label="ID" hide-details />
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="member.name" label="Name" hide-details />
          </v-col>
          <v-col cols="4">
            <v-autocomplete v-model="member.role" label="Role" :items="memberRoles" hide-details />
          </v-col>
          <v-col cols="12">
            <g-th-picker v-model="member.th" />
          </v-col>
          <v-col cols="4" v-if="isEdit">
            <v-btn-toggle
              v-model="member.warStatus"
              density="compact"
              :multiple="false"
              variant="outlined"
              color="white"
              :selected-class="member.warStatus ? 'bg-green' : 'bg-red'"
              class="text-grey-lighten-1"
              mandatory
            >
              <v-btn :value="true">War enable</v-btn>
              <v-btn :value="false">War disable</v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="4" v-if="isEdit">
            <v-autocomplete v-model="lastTimeSeen" label="Last time seen" :items="lastTimeSeenOptions" hide-details />
          </v-col>
          <v-col cols="4" v-if="isEdit" class="d-flex align-center justify-end">
            <span v-if="member.isActive" class="d-flex align-center">
              <v-badge color="success" :dot="true" offset-y="-4" />
              <span class="ml-2 mr-4">Active</span>
              <v-btn density="comfortable" variant="outlined" class="text-none" @click="kickOutMember">Kick out</v-btn>
            </span>
            <span v-else class="d-flex align-center">
              <v-badge color="error" :dot="true" offset-y="-4" />
              <span class="ml-2 mr-4">Not in the clan</span>
              <v-btn density="comfortable" variant="outlined" class="text-none" @click="reJoinMember">Rejoin</v-btn>
            </span>
          </v-col>
        </v-row>
      </v-form>
      <div v-else>
        <g-error-message @try-again="fetch" />
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
import { useMembersAPI } from '@/firebase-api-db/members';
import { LoadingDataState } from '@/models/enum/loading-data-state';
import GLoadingProgressCircular from '@/components/GLoadingProgressCircular.vue';
import GThPicker from '@/components/GThPicker.vue';
import GErrorMessage from '@/components/GErrorMessage.vue';
import _ from 'lodash';

const loadingMemberState = ref(LoadingDataState.LOADING);

const router = useRouter();
const route = useRoute();

const membersApi = useMembersAPI();
const isEdit = computed(() => {
  return route.name === RouteNames.EDIT_MEMBER;
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

async function fetch() {
  try {
    loadingMemberState.value = LoadingDataState.LOADING;
    member.value = await membersApi.getMember(memberId);
    loadingMemberState.value = LoadingDataState.OK;
  } catch (error) {
    loadingMemberState.value = LoadingDataState.ERROR;
    console.error(error);
  }
}

onMounted(() => {
  if (isEdit.value) {
    fetch();
  } else {
    loadingMemberState.value = LoadingDataState.OK;
  }
});
</script>

<style scoped></style>
