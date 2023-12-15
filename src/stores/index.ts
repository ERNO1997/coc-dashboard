import { createPinia, type Pinia } from 'pinia';
import { markRaw } from 'vue';
import router from '@/router';

const pinia: Pinia = createPinia();

// Use router inside pinia
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
export default pinia;

import { useCocApiKeyStore } from '@/stores/coc-api-key';
import { useSnackbar } from '@/stores/global-snackbar';

export { useCocApiKeyStore, useSnackbar };
