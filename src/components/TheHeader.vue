<script setup lang="ts">
import CocApiKeyForm from '@/coc-api/components/CocApiKeyForm.vue';
import cocIcon from '@/assets/coc-vector-free.png';
</script>

<template>
  <header>
    <div class="logo">
      <v-img :src="cocIcon" class="pr-2" />
    </div>
    <div>
      <v-menu>
        <template #activator="{ props }">
          <v-btn v-bind="props" variant="flat" color="white" density="compact" icon>
            <v-icon icon="mdi-alert-circle" color="error" />
          </v-btn>
        </template>
        <v-card class="pa-4 mt-2" @click.stop>
          <coc-api-key-form />
        </v-card>
      </v-menu>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  background-color: #152238;
}
.logo {
  display: flex;
  align-items: center;
  padding: 4px;
  background-color: #1c2e4a;
  height: 64px;
  width: 64px;
}
</style>
