<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Sidebar from '@/layouts/Sidebar.vue'
import HeaderComponent from '@/layouts/HeaderComponent.vue'

const route = useRoute()
const authStore = useAuthStore()
const isLoginPage = computed(() => route.path === '/login')

onMounted(() => {
  authStore.initializeAuth()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <template v-if="!isLoginPage && authStore.isAuthenticated">
      <div class="flex">
        <Sidebar />
        <div class="flex-1">
          <HeaderComponent />
          <main class="p-6">
            <RouterView />
          </main>
        </div>
      </div>
    </template>
    <template v-else>
      <RouterView />
    </template>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {}
</style>
