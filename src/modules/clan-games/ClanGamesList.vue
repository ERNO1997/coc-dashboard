<template>
  <page-view title="Clan Games">
    <template #actions>
      <g-primary-btn prepend-icon="mdi-plus" :to="{ name: RouteNames.ADD_CLAN_GAMES }">Add month</g-primary-btn>
    </template>
    Clan games list
  </page-view>
</template>

<script setup lang="ts">

import RouteNames from "@/router/route-names";
import GPrimaryBtn from "@/components/GPrimaryBtn.vue";
import PageView from "@/components/PageView.vue";
</script>

<style scoped>

</style>