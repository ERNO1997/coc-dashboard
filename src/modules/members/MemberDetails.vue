<template>
  <page-view title="Add member">
    <template #actions>
      <g-primary-btn prepend-icon="mdi-check" @click="saveMember">Save</g-primary-btn>
    </template>
    <v-form>
      <v-text-field v-model="member.id" label="ID" />
      <v-text-field v-model="member.name" label="Name" />
      <v-text-field v-model="member.th" type="integer" label="TH" />
      <v-autocomplete v-model="member.role" label="Role" :items="memberRoles" />
    </v-form>
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

const router = useRouter();
const route = useRoute();

const membersApi = useMembersAPI();
const isEdit = computed(() => {
  return route.name === RouteNames.EDIT_MEMBER;
});
const memberId = route.params.id?.[0] ?? '';

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
    member.value = await membersApi.getMember(memberId);
  } catch (error) {
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
