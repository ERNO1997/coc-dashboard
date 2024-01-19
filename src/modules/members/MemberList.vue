<template>
  <page-view :title="`Members (${amountOfMembers}/50)`">
    <template #actions>
      <g-primary-btn prepend-icon="mdi-plus" :to="{ name: RouteNames.ADD_MEMBER }">Add member</g-primary-btn>
    </template>
    <v-card class="pb-2">
      <g-loading-progress-circular v-if="loadingMembersState === LoadingDataState.LOADING" message="Loading members" />
      <template v-else-if="loadingMembersState === LoadingDataState.OK">
        <table v-if="amountOfMembers > 0">
          <tr>
            <th class="py-2 pl-4">War</th>
            <th class="py-2">TH</th>
            <th class="py-2">Name</th>
            <th class="py-2">Role</th>
            <th class="py-2">Last seen</th>
            <th class="py-2">Actions</th>
          </tr>
          <template v-for="member in members" :key="member.firebaseId">
            <tr v-if="member.data.isActive" class="data-row">
              <td class="pl-4 py-2">
                <war-status-icon v-model="member.data.warStatus" :member="member" />
              </td>
              <td>
                <v-img v-if="getThPath(member.data.th)" :src="getThPath(member.data.th)" height="36px" width="36px" />
                <span v-else>??</span>
              </td>
              <td>{{ member.data.name }}</td>
              <td>
                <v-chip :label="true" :color="getRoleColor(member.data.role)">
                  {{ member.data.role }}
                </v-chip>
              </td>
              <td>
                <last-time-seen-label v-model="member.data.lastTimeSeen" :member="member" />
              </td>
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
          </template>
        </table>
        <span>There is no members. Press "Add member" to add a new one</span>
      </template>
      <div v-else>
        <g-error-message @try-again="fetch" />
      </div>
    </v-card>
  </page-view>
</template>

<script setup lang="ts">
import PageView from '@/components/PageView.vue';
import { computed, onMounted, ref } from 'vue';
import { ClanMemberRole } from '@/models/clan-member-role';
import GPrimaryBtn from '@/components/GPrimaryBtn.vue';
import RouteNames from '@/router/route-names';
import { type ClanMemberFirebase, useMembersAPI } from '@/firebase-api-db/members';
import { LoadingDataState } from '@/models/enum/loading-data-state';
import GLoadingProgressCircular from '@/components/GLoadingProgressCircular.vue';
import { getThPath } from '@/helpers/th-helper';
import WarStatusIcon from '@/modules/members/components/WarStatusIcon.vue';
import LastTimeSeenLabel from '@/modules/members/components/LastTimeSeenLabel.vue';
import GErrorMessage from '@/components/GErrorMessage.vue';

const loadingMembersState = ref(LoadingDataState.LOADING);
const members = ref<ClanMemberFirebase[]>([]);
const membersApi = useMembersAPI();

async function fetch() {
  try {
    loadingMembersState.value = LoadingDataState.LOADING;
    members.value = (await membersApi.getMembers()).sort((a, b) => +b.data.th - +a.data.th);
    loadingMembersState.value = LoadingDataState.OK;
  } catch (error) {
    loadingMembersState.value = LoadingDataState.ERROR;
    console.error(error);
  }
}

const amountOfMembers = computed(() => members.value.filter(it => it.data.isActive).length);

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
  border-collapse: collapse;
}
th {
  text-align: left;
}
.data-row:hover {
  background-color: #ffffff11;
}
</style>
