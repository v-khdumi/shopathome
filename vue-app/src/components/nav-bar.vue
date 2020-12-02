<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import AuthLogin from '@/components/auth-login.vue';
import AuthLogout from '@/components/auth-logout.vue';
import { useAuth } from '../composables/use-auth';

interface ComponentState {
  userInfo: {};
  providers: Array<string>;
}

export default defineComponent({
  name: 'NavBar',
  components: {
    AuthLogin,
    AuthLogout,
  },
  setup() {
    const { authProviders: providers, getUserInfo } = useAuth();

    const state = reactive({
      userInfo: {},
      providers,
    });

    onMounted(async () => {
      state.userInfo = await getUserInfo();
    });

    return {
      getUserInfo,
      ...state,
    };
  },
});
</script>

<template>
  <div class="column is-2">
    <nav class="menu">
      <p class="menu-label">Menu</p>
      <ul class="menu-list">
        <router-link to="/home">Home</router-link>
        <router-link to="/products">My List</router-link>
        <router-link to="/discounts">My Discounts</router-link>
      </ul>
    </nav>
    <nav class="menu auth">
      <p class="menu-label">Auth</p>
      <div class="menu-list auth">
        <template v-if="!userInfo">
          <template v-for="provider in providers" :key="provider">
            <AuthLogin :provider="provider" />
          </template>
        </template>
        <AuthLogout v-if="userInfo" />
      </div>
    </nav>
    <div class="user" v-if="userInfo">
      <p>Welcome</p>
      <p>{{ userInfo.userDetails }}</p>
      <p>{{ userInfo.identityProvider }}</p>
    </div>
  </div>
</template>
