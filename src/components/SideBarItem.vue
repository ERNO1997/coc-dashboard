<script setup lang="ts">
const props = defineProps({
  icon: { type: String, required: true },
  active: { type: Boolean, default: false },
});
</script>

<template>
  <div class="icon" :class="{ active }">
    <v-icon :icon="icon" />
  </div>
</template>

<style scoped>
.icon {
  height: 36px;
  width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 12px;
  color: #6d6893;
}

.icon:hover {
  background-color: #1c2e4a;
  color: white;
}

.active,
.active:hover {
  background-color: #4a1e9b;
  box-shadow: #4a1e9b 0 0 20px;
  color: white;
}
</style>
