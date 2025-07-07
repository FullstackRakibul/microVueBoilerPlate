<template>
  <div class="bg-gray-800 text-white w-64 min-h-screen p-4">
    <div class="mb-8">
      <div class="flex items-center">
        <img src="@/assets/CH24.png" alt="Channel 24" class="h-8 w-8 mr-3" />
        <span class="text-xl font-bold">Channel 24</span>
      </div>
    </div>

    <nav class="space-y-2">
      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="item.path"
        class="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
        :class="{ 'bg-[#D55A22] text-white': $route.path === item.path }"
      >
        <component :is="item.icon" class="h-5 w-5 mr-3" />
        {{ item.name }}
      </router-link>
    </nav>

    <div class="mt-auto pt-8">
      <button
        @click="logout"
        class="flex items-center px-4 py-2 text-[#D55A22] rounded-lg hover:bg-gray-700 hover:text-white transition-colors w-full"
      >
        <LogOut class="h-5 w-5 mr-3" />
        Logout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  LayoutDashboard,
  Users,
  Building2,
  Calendar,
  FileText,
  CreditCard,
  BarChart3,
  Truck,
  Settings,
  LogOut
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const menuItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Clients', path: '/clients', icon: Users },
  { name: 'Agencies', path: '/agencies', icon: Building2 },
  { name: 'Ad Bookings', path: '/ad-bookings', icon: Calendar },
  { name: 'Invoices', path: '/invoices', icon: FileText },
  { name: 'Payments', path: '/payments', icon: CreditCard },
  { name: 'Reports', path: '/reports', icon: BarChart3 },
  { name: 'Delivery Logs', path: '/delivery-logs', icon: Truck },
  { name: 'Settings', path: '/settings', icon: Settings }
]

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
