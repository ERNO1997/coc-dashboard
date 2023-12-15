<template>
  <v-app>
    <v-main>
      <main-layout />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import MainLayout from "@/layout/MainLayout.vue";
</script>

<style>
body::-webkit-scrollbar {
  display: none;
}
</style>
