<template>
  <page-view :title="`Members (${members.length}/50)`">
    <template #actions>
      <g-primary-btn prepend-icon="mdi-plus" :to="{ name: RouteNames.ADD_MEMBER }">Add member</g-primary-btn>
    </template>
    <v-card class="pb-2 px-4">
      <table>
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
    </v-card>
  </page-view>
</template>

<script setup lang="ts">
import PageView from '@/components/PageView.vue';
import { onMounted, ref } from 'vue';
import { ClanMemberRole } from '@/models/clan-member-role';
import GPrimaryBtn from '@/components/GPrimaryBtn.vue';
import RouteNames from '@/router/route-names';
import { ClanMemberFirebase, useMembersAPI } from '@/firebase-api-db/members';

const members = ref<ClanMemberFirebase[]>([]);
const membersApi = useMembersAPI();

async function fetch() {
  try {
    members.value = await membersApi.getMembers();
  } catch (error) {
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
