<template>
  <page-view title="Add clan games month">
    <template #actions>
      <g-primary-btn prepend-icon="mdi-check" @click="saveData">Save</g-primary-btn>
    </template>
    <v-form class="d-flex flex-wrap">
      <template v-for="member in members" :key="member.firebaseId">
        <v-col cols="6" sm="4" md="3" lg="2">
          <v-text-field v-model="monthResult[member.firebaseId]" :label="member.data.name"/>
        </v-col>
      </template>
    </v-form>
  </page-view>
</template>

<script setup lang="ts">
import PageView from '@/components/PageView.vue';
import { onMounted, ref } from 'vue';
import GPrimaryBtn from '@/components/GPrimaryBtn.vue';
import {ClanMemberFirebase, useMembersAPI} from '@/firebase-api-db/members';
import type ClanGamesMonth from '@/models/clan-games-month';

const isLoadingMembers = ref<boolean>(true);

const membersApi = useMembersAPI();
const members = ref<ClanMemberFirebase[]>([]);
const monthResult = ref<ClanGamesMonth>({});

function saveData() {
  /* membersApi.addMember(member.value).then(() => {
    router.push({ name: RouteNames.MEMBERS });
  }); */
}

async function fetchMembers() {
  try {
    members.value = await membersApi.getMembers();
    const result: {[firebaseId: string]: number} = {};
    for (const member of members.value) {
      result[member.firebaseId] = 0;
    }
    monthResult.value = result;
  } catch (error) {
    console.error(error);
  } finally {
    isLoadingMembers.value = false;
  }
}

onMounted(() => {
  fetchMembers();
});
</script>

<style scoped>
span {
  color: #cadeff;
  font-size: 16pt;
}
</style>
