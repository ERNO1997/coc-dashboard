<template>
  {{ token.token }}
</template>

<script setup lang="ts">
import { useTokenStore } from '@/stores/token';

const token = useTokenStore();
</script>

<style scoped>
fieldset {
  padding: 16px;
  border: none;
}
input {
  border: solid 1px #333;
  margin-left: 8px;
  border-radius: 4px;
}
button {
  background-color: #009944;
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  margin-left: 8px;
}
button:hover {
  background-color: #007722;
}
</style>
