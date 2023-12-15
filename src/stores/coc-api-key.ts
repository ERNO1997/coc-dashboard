import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCocApiKeyStore = defineStore('coc-api-key', () => {
  const key = ref<string>('');

  return { key };
});
