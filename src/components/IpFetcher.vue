<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { getIp } from '@/coc-api/fetchers';
import { useClipboard } from '@vueuse/core';

const props = defineProps({
  modelValue: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue']);

const clipboard = useClipboard();
enum IpFetchingState {
  LOADING,
  OK,
  ERROR,
}

const ipFetchingState = ref<IpFetchingState>(IpFetchingState.LOADING);

const ip = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

const error = ref<string>('');

async function fetchIP() {
  getIp()
    .then(response => {
      console.log(response);
      ip.value = response ?? '';
      ipFetchingState.value = IpFetchingState.OK;
    })
    .catch(reason => {
      console.log(reason);
      ipFetchingState.value = IpFetchingState.ERROR;
      error.value = reason;
    });
}
function copyIp() {
  clipboard.copy(ip.value);
}

onMounted(() => {
  fetchIP();
});
</script>

<template>
  <div v-if="ipFetchingState === IpFetchingState.LOADING">
    Loading IP
    <v-progress-circular size="14" width="2" indeterminate />
  </div>
  <div v-else-if="ipFetchingState === IpFetchingState.OK" class="text-success">
    {{ ip }}
    <v-icon color="lightDark" icon="mdi-content-copy" size="14" @click="copyIp" />
  </div>
  <div v-else class="text-error">{{ error }}</div>
</template>

<style scoped></style>
