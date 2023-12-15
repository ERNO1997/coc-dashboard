import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTokenStore = defineStore('token', () => {
  const token = ref(localStorage.getItem('token'));

  function saveToken(ip: string, newToken: string) {
    localStorage.setItem(ip, newToken);
    localStorage.setItem('token', newToken);
    token.value = newToken;
  }

  return { token, saveToken };
});
