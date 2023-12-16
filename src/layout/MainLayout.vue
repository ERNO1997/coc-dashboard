<script setup lang="ts">
import TheSideBar from '@/components/TheSideBar.vue';
import TheHeader from '@/components/TheHeader.vue';
</script>

<template>
  <div class="app">
    <the-header />
    <section>
      <the-side-bar class="menu" />
      <router-view class="content" />
    </section>
  </div>
</template>

<style scoped>
.app {
  background-color: rebeccapurple;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
section {
  background-color: #1c2e4a;
  display: flex;
  flex-grow: 1;
}
.menu {
  width: 64px !important;
  height: 100%;
}
.content {
  flex-grow: 1;
  height: 100%;
}
</style>
