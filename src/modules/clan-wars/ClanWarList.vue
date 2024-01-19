<template>
  <page-view title="Clan Wars">
    <template #actions>
      <g-primary-btn prepend-icon="mdi-plus" :to="{ name: RouteNames.ADD_CLAN_WAR }">Add clan war</g-primary-btn>
    </template>
    <v-card class="pb-2">
      <g-loading-progress-circular
        v-if="loadingMembersState === LoadingDataState.LOADING"
        message="Loading clan wars"
      />
      <template v-else-if="loadingMembersState === LoadingDataState.OK"></template>
    </v-card>
  </page-view>
</template>

<script setup lang="ts">
import RouteNames from '@/router/route-names';
import { LoadingDataState } from '@/models/enum/loading-data-state';
import { ref } from 'vue';
import GLoadingProgressCircular from '@/components/GLoadingProgressCircular.vue';
import GPrimaryBtn from '@/components/GPrimaryBtn.vue';
import PageView from '@/components/PageView.vue';

const loadingMembersState = ref(LoadingDataState.LOADING);
</script>

<style scoped></style>
<script setup lang="ts"></script>
