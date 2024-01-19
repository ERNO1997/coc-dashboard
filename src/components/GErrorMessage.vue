<template>
  Error
  <v-btn @click="$emit('tryAgain')">Try again</v-btn>
</template>

<script setup lang="ts">
defineEmits(['tryAgain']);
</script>

<style scoped></style>
