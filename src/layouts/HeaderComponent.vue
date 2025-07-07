<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Bell, Search, User, ChevronDown } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const searchQuery = ref('')
const showNotifications = ref(false)
const showUserMenu = ref(false)

const currentUser = computed(() => authStore.user || { 
  name: 'Admin User', 
  email: 'admin@ch24.com' 
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

// Close dropdowns when clicking outside
const closeDropdowns = () => {
  showNotifications.value = false
  showUserMenu.value = false
}
</script>

<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Search Bar -->
        <div class="flex-1 max-w-lg">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search invoices, clients, agencies..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <div class="relative">
            <button
              @click="showNotifications = !showNotifications"
              class="p-2 text-gray-400 hover:text-gray-600 relative transition-colors"
            >
              <Bell class="h-5 w-5" />
              <span class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            <!-- Notifications Dropdown -->
            <div
              v-if="showNotifications"
              class="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
              @click.stop
            >
              <div class="px-4 py-2 border-b border-gray-200">
                <h3 class="text-sm font-medium text-gray-900">Notifications</h3>
              </div>
              <div class="max-h-64 overflow-y-auto">
                <div class="px-4 py-3 hover:bg-gray-50">
                  <p class="text-sm text-gray-900">New invoice payment received</p>
                  <p class="text-xs text-gray-500">2 minutes ago</p>
                </div>
                <div class="px-4 py-3 hover:bg-gray-50">
                  <p class="text-sm text-gray-900">Invoice #INV-001 is overdue</p>
                  <p class="text-xs text-gray-500">1 hour ago</p>
                </div>
                <div class="px-4 py-3 hover:bg-gray-50">
                  <p class="text-sm text-gray-900">New client registration</p>
                  <p class="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
              <div class="px-4 py-2 border-t border-gray-200">
                <button class="text-sm text-primary hover:text-primary-dark">View all notifications</button>
              </div>
            </div>
          </div>

          <!-- User Menu -->
          <div class="relative">
            <button
              @click="showUserMenu = !showUserMenu"
              class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                <User class="h-4 w-4 text-white" />
              </div>
              <div class="text-left hidden md:block">
                <div class="text-sm font-medium text-gray-900">{{ currentUser.name }}</div>
                <div class="text-xs text-gray-500">{{ currentUser.email }}</div>
              </div>
              <ChevronDown class="h-4 w-4 text-gray-400" />
            </button>

            <!-- User Dropdown -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
              @click.stop
            >
              <div class="px-4 py-2 border-b border-gray-200">
                <p class="text-sm font-medium text-gray-900">{{ currentUser.name }}</p>
                <p class="text-xs text-gray-500">{{ currentUser.email }}</p>
              </div>
              <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profile Settings
              </router-link>
              <router-link to="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                System Settings
              </router-link>
              <hr class="my-1">
              <button
                @click="handleLogout"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Click outside to close dropdowns -->
    <div
      v-if="showNotifications || showUserMenu"
      class="fixed inset-0 z-40"
      @click="closeDropdowns"
    ></div>
  </header>
</template>
