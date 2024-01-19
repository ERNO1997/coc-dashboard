<template>
  <template v-if="dataState === LoadingDataState.OK">
    <v-icon v-if="localModel" icon="mdi-shield-check" color="success" @click="updateWarStatus(false)" />
    <v-icon v-else icon="mdi-shield-alert" color="error" @click="updateWarStatus(true)" />
  </template>
  <v-progress-circular v-else indeterminate size="24" width="3" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { LoadingDataState } from '@/models/enum/loading-data-state';
import { ClanMemberFirebase, useMembersAPI } from '@/firebase-api-db/members';

const props = defineProps({
  modelValue: Boolean,
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

async function updateWarStatus(value: boolean) {
  if (props.member) {
    dataState.value = LoadingDataState.LOADING;
    membersApi
      .editMember(props.member.firebaseId, { ...props.member.data, warStatus: value })
      .then(() => {
        localModel.value = value;
        dataState.value = LoadingDataState.OK;
      })
      .catch(() => {
        dataState.value = LoadingDataState.OK;
      });
  }
}
</script>

<style scoped></style>
