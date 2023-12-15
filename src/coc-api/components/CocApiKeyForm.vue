<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { getIp } from '@/coc-api/fetchers';
import { useCocApiKeyStore } from '@/stores';
import { isEmpty } from '@/utils/string-utils';
import { useClipboard } from '@vueuse/core';
import { createKey } from '@/coc-api/fetchers/keys';

const keyStore = useCocApiKeyStore();

const ip = ref<string>('');
const clipboard = useClipboard();
const ipCopied = ref<boolean>(false);

const error = ref<string>('');
const apiKey = ref<string>(keyStore.key);

const isGettingIP = ref<boolean>(false);

function findOutMyIP() {
  isGettingIP.value = true;
  getIp()
    .then(response => {
      console.log(response);
      ip.value = response ?? '';
      isGettingIP.value = false;
    })
    .catch(reason => {
      console.log(reason);
      isGettingIP.value = false;
      error.value = reason;
    });
}

function copyIp() {
  clipboard.copy(ip.value);
}

async function useKey() {
  await createKey(ip.value, apiKey.value);
}

onMounted(() => {
  findOutMyIP();
});
</script>

<template>
  <h4>
    Use this IP to get a key for accessing
    <a>coc api</a>
  </h4>
  <v-card variant="outlined" class="pa-2 my-2">
    <div v-if="isEmpty(ip)" class="d-flex justify-space-between px-2">
      Getting IP...
      <v-progress-circular size="20" color="primary" class="mr-2" indeterminate />
    </div>
    <div v-else class="d-flex justify-space-between px-2">
      <span>{{ ip }}</span>
      <v-icon color="lightDark" icon="mdi-content-copy" size="20" @click="copyIp" />
    </div>
  </v-card>
  <form @submit.prevent="useKey" class="d-flex flex-column">
    <label for="email">Key</label>
    <v-textarea type="text" id="email" rows="4" variant="outlined" v-model="apiKey" />
    <v-btn type="submit" color="success">Confirm</v-btn>
  </form>
</template>

<style scoped></style>
