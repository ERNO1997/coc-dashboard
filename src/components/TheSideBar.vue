<script setup lang="ts">
import SideBarItem from '@/components/SideBarItem.vue';
import RouteNames from '@/router/route-names';
import { useRoute } from 'vue-router';

const route = useRoute();

interface MenuItem {
  id: string;
  icon: string;
  label: string;
  routeName: string;
}

const menu: MenuItem[] = [
  {
    id: 'dashboard',
    icon: 'mdi-view-dashboard',
    label: 'Dashboard',
    routeName: RouteNames.HOME,
  },
  {
    id: 'members',
    icon: 'mdi-account-group',
    label: 'Members',
    routeName: RouteNames.MEMBERS,
  },
  {
    id: 'clan-games',
    icon: 'mdi-gamepad-variant',
    label: 'Clan Games',
    routeName: RouteNames.CLAN_GAMES,
  },
  {
    id: 'clan-capital',
    icon: 'mdi-image-filter-hdr',
    label: 'Capital raids',
    routeName: RouteNames.CLAN_CAPITAL,
  },
  {
    id: 'clan-wars',
    icon: 'mdi-sword-cross',
    label: 'Wars',
    routeName: RouteNames.CLAN_WARS,
  },
  {
    id: 'settings',
    icon: 'mdi-cog',
    label: 'Settings',
    routeName: RouteNames.SETTINGS,
  },
];

function isActive(routeName: string) {
  return route.name === routeName;
}
</script>

<template>
  <aside>
    <template v-for="item in menu" :key="item.id">
      <router-link :to="{ name: item.routeName }" style="text-decoration: none">
        <side-bar-item :icon="item.icon" :active="isActive(item.routeName)" />
      </router-link>
    </template>
  </aside>
</template>

<style scoped>
aside {
  background-color: #152238;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
}
</style>
