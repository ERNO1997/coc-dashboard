<template>
  <page-view :title="`Members (${members.length}/50)`">
    <template #actions>
      <g-primary-btn prepend-icon="mdi-plus" :to="{ name: RouteNames.ADD_MEMBER }">Add member</g-primary-btn>
    </template>
    <v-card class="pb-2 px-4">
      <g-loading-progress-circular v-if="loadingMembersState === LoadingDataState.LOADING" message="Loading members"/>
      <table v-else-if="loadingMembersState === LoadingDataState.OK">
        <tr>
          <th class="py-2">ID</th>
          <th class="py-2">Name</th>
          <th class="py-2">TH</th>
          <th class="py-2">Role</th>
          <th class="py-2">Last seen</th>
          <th class="py-2">Actions</th>
        </tr>
        <tr v-for="member in members" :key="member.firebaseId">
          <td>{{ member.data.id }}</td>
          <td>{{ member.data.name }}</td>
          <td>{{ member.data.th }}</td>
          <td>
            <v-chip :label="true" :color="getRoleColor(member.data.role)">
              {{ member.data.role }}
            </v-chip>
          </td>
          <td>{{ member.data.lastTimeSeen }}</td>
          <td>
            <v-tooltip>
              <template #activator="attrs">
                <router-link
                  v-bind="attrs.props"
                  icon
                  style="text-decoration: none"
                  :to="{ name: RouteNames.EDIT_MEMBER, params: { id: member.firebaseId } }"
                >
                  <v-icon icon="mdi-account-edit" color="white" />
                </router-link>
              </template>
              Edit member
            </v-tooltip>
          </td>
        </tr>
      </table>
      <div v-else>
        error
      </div>
    </v-card>
  </page-view>
</template>

<script setup lang="ts">
import PageView from '@/components/PageView.vue';
import { onMounted, ref } from 'vue';
import { ClanMemberRole } from '@/models/clan-member-role';
import GPrimaryBtn from '@/components/GPrimaryBtn.vue';
import RouteNames from '@/router/route-names';
import { type ClanMemberFirebase, useMembersAPI } from '@/firebase-api-db/members';
import { LoadingDataState } from '@/models/enum/loading-data-state';
import GLoadingProgressCircular from "@/components/GLoadingProgressCircular.vue";

const loadingMembersState = ref(LoadingDataState.LOADING);
const members = ref<ClanMemberFirebase[]>([]);
const membersApi = useMembersAPI();

async function fetch() {
  try {
    loadingMembersState.value = LoadingDataState.LOADING;
    members.value = await membersApi.getMembers();
    loadingMembersState.value = LoadingDataState.OK;
  } catch (error) {
    loadingMembersState.value = LoadingDataState.ERROR;
    console.error(error);
  }
}

function getRoleColor(role: ClanMemberRole) {
  switch (role) {
    case ClanMemberRole.LEADER:
      return 'yellow';
    case ClanMemberRole.CO_LEADER:
      return 'orange';
    case ClanMemberRole.ELDER:
      return 'green';
    case ClanMemberRole.MEMBER:
      return 'white';
    default:
      return 'grey';
  }
}

onMounted(() => {
  fetch();
});
</script>

<style scoped>
table {
  width: 100%;
}
th {
  text-align: left;
}
</style>
