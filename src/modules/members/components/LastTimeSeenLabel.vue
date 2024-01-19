<template>
  <template v-if="dataState === LoadingDataState.OK">
    {{ lastTimeSeen }}
  </template>
  <v-progress-circular v-else indeterminate size="24" width="3" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { LoadingDataState } from '@/models/enum/loading-data-state';
import { ClanMemberFirebase, useMembersAPI } from '@/firebase-api-db/members';

const props = defineProps({
  modelValue: Date,
  member: Object as ClanMemberFirebase,
});

const emit = defineEmits(['update:modelValue']);

const localModel = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const dataState = ref(LoadingDataState.OK);
const membersApi = useMembersAPI();

async function updateToNow() {
  if (props.member) {
    dataState.value = LoadingDataState.LOADING;
    const value = new Date();
    membersApi
      .editMember(props.member.firebaseId, { ...props.member.data, lastTimeSeen: value })
      .then(() => {
        localModel.value = value;
        dataState.value = LoadingDataState.OK;
      })
      .catch(() => {
        dataState.value = LoadingDataState.OK;
      });
  }
}

const lastTimeSeen = computed(() => {
  const now = new Date();
  if (localModel.value) {
    const days = now.getDate() - new Date(localModel.value).getDate();
    if (days === 0) {
      return 'Recently';
    } else if (days === 1) {
      return '1 day';
    } else if (days < 7) {
      return `${days} days`;
    }
  }
  return 'More than a week';
});
</script>

<style scoped></style>
