<script setup lang="ts">
defineProps({
  title: { type: String },
});
</script>

<template>
  <div class="py-4 px-8" style="overflow-y: scroll">
    <div class="d-flex align-center">
      <h1 v-if="title !== undefined" class="mb-2">{{ title }}</h1>
      <v-spacer />
      <slot name="actions" />
    </div>
    <slot />
  </div>
</template>

<style scoped>
h1 {
  color: #cadeff;
  font-size: 24pt;
}
</style>
