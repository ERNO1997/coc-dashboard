<script setup lang="ts"></script>

<template>
  <v-btn class="primary-btn">
    <slot />
  </v-btn>
</template>

<style scoped>
.primary-btn {
  background-color: #4a1e9b;
  box-shadow: #4a1e9b 0 0 20px;
  color: white;
}
</style>
