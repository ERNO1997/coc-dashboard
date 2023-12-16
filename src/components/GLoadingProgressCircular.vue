<template>
  <div class="d-flex justify-center align-center py-6">
    <v-progress-circular indeterminate size="24" width="3" class="mr-4" />
    <span>{{ message }}...</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  message: { type: String, default: 'Loading' },
});
</script>

<style scoped></style>
