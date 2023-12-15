<script setup lang="ts">
import PageView from '@/components/PageView.vue';
import IpFetcher from '@/components/IpFetcher.vue';
import { ref } from 'vue';
import { useTokenStore } from '@/stores/token';

const tokenStore = useTokenStore();

const settings: {
  clanTag: string;
} = {
  clanTag: '',
};

const ip = ref('');
const loadedToken = ref('');
const token = ref('');

function saveToken() {
  if (ip.value !== '' && token.value !== '') {
    tokenStore.saveToken(ip.value, token.value);
  }
}
</script>

<template>
  <page-view title="Settings">
    <v-card title="API Key">
      <v-form class="px-4">
        <p class="mb-4">
          In order to access to the Clash of Clan API it's necessary a key that allows the current IP of this Website.
          <br />
          Since this website is not deployed with a static IP, you as the user should provide that key following the
          next steps.
        </p>
        <ol class="px-4">
          <li>
            Go to the Clash of Clan API website and register or login in
            <a href="https://developer.clashofclans.com" target="_blank">
              Clash of Clans API
              <v-icon icon="mdi-open-in-new" size="14" />
            </a>
          </li>
          <li>
            Enter to your
            <a href="https://developer.clashofclans.com/#/account" target="_blank">
              account settings
              <v-icon icon="mdi-open-in-new" size="14" />
            </a>
            and create a new key for the next IP:
            <ip-fetcher v-model="ip" />
          </li>
          <li>
            Open the created key, copy the Token and paste it here
            <v-textarea v-model="token" rows="4" hide-details />
          </li>
        </ol>
        <v-btn color="success" class="my-4" @click="saveToken">Save token for this IP</v-btn>
      </v-form>
    </v-card>

    <v-card title="Clan tag" class="mt-2">
      <v-form class="px-4">
        <p>Insert the clan tag to automatically get the data from the Clash of Clan API.</p>
        <div class="d-flex align-center my-2">
          <v-text-field class="mr-4" style="max-width: 200px" placeholder="Example: #dasdads" hide-details />
          <v-btn color="success">Search</v-btn>
        </div>
      </v-form>
    </v-card>
  </page-view>
</template>

<style scoped>
a {
  text-decoration: none;
  color: #aa7efb;
}
</style>
