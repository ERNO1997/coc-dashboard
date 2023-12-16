import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import RouteNames from './route-names';
import MemberList from '@/modules/members/MemberList.vue';
import MySettings from '@/modules/settings/MySettings.vue';
import MemberDetails from '@/modules/members/MemberDetails.vue';
import ClanGamesList from '@/modules/clan-games/ClanGamesList.vue';
import ClanCapitalRaidList from '@/modules/clan-capital/ClanCapitalRaidList.vue';
import ClanWarList from '@/modules/clan-wars/ClanWarList.vue';
import AddClanGamesResult from '@/modules/clan-games/AddClanGamesResult.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteNames.HOME,
      component: HomeView,
    },
    {
      path: '/members',
      name: RouteNames.MEMBERS,
      component: MemberList,
    },
    {
      path: '/members/add',
      name: RouteNames.ADD_MEMBER,
      component: MemberDetails,
    },
    {
      path: '/members/:id',
      name: RouteNames.EDIT_MEMBER,
      component: MemberDetails,
    },
    {
      path: '/clan-games',
      name: RouteNames.CLAN_GAMES,
      component: ClanGamesList,
    },
    {
      path: '/clan-games/add',
      name: RouteNames.ADD_CLAN_GAMES,
      component: AddClanGamesResult,
    },
    {
      path: '/clan-capital',
      name: RouteNames.CLAN_CAPITAL,
      component: ClanCapitalRaidList,
    },
    {
      path: '/clan-wars',
      name: RouteNames.CLAN_WARS,
      component: ClanWarList,
    },
    {
      path: '/settings',
      name: RouteNames.SETTINGS,
      component: MySettings,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

export default router;
