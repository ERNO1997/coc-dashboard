import { useSnackbar } from '@/stores';
import { useClipboard } from '@vueuse/core';

export function useCopyToClipboard(
  successMsg?: string | false,
  errorMsg?: string | false,
  notSupportedMsg?: string | false
) {
  const { copy, copied, isSupported } = useClipboard({ legacy: true });
  return async (text: string) => {
    if (!isSupported) {
      console.error('Copying is not supported in your browser.');
      if (notSupportedMsg !== false) {
        useSnackbar().push({
          color: 'success',
          text: notSupportedMsg ?? 'Copying is not supported in your browser.',
        });
      }
      return false;
    }

    if (text === undefined || text === null || text === '') {
      useSnackbar().push({
        color: 'warning',
        text: 'Sorry, the text you are trying to copy is empty.',
      });
      return false;
    }

    await copy(text);

    if (copied.value && successMsg !== false) {
      useSnackbar().push({
        color: 'success',
        text: successMsg ?? 'Successfully copied to clipboard.',
      });
    }

    if (!copied.value && errorMsg !== false) {
      useSnackbar().push({
        color: 'error',
        text: errorMsg ?? 'An error occurred when trying to copy to the clipboard.',
      });
    }
  };
}
