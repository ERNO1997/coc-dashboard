<template>
  <page-view title="Add member">
    <template #actions>
      <g-primary-btn prepend-icon="mdi-check" @click="saveMember">Save</g-primary-btn>
    </template>
    <v-card class="pb-4 px-4">
      <g-loading-progress-circular v-if="loadingMemberState === LoadingDataState.LOADING" message="Loading member" />
      <v-form v-else-if="loadingMemberState === LoadingDataState.OK" class="pt-8">
        <v-row>
          <v-col cols="4">
            <v-text-field v-model="member.id" label="ID" hide-details />
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
        </v-row>
      </v-form>
      <div v-else>error</div>
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
  th: 1,
  role: ClanMemberRole.MEMBER,
  lastTimeSeen: new Date(),
  isActive: true,
});

const memberRoles = [
  { title: 'Leader', value: ClanMemberRole.LEADER },
  { title: 'Co-leader', value: ClanMemberRole.CO_LEADER },
  { title: 'Elder', value: ClanMemberRole.ELDER },
  { title: 'Member', value: ClanMemberRole.MEMBER },
];

function saveMember() {
  if (isEdit.value) {
    membersApi.editMember(memberId, member.value).then(() => {
      router.push({ name: RouteNames.MEMBERS });
    });
  } else {
    membersApi.addMember(member.value).then(() => {
      router.push({ name: RouteNames.MEMBERS });
    });
  }
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
  }
});
</script>

<style scoped></style>
