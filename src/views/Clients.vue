<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto space-y-8">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Clients</h1>
          <p class="text-gray-600 mt-2">Manage your clients and their information</p>
        </div>
        <button
          @click="openCreateModal"
          class="inline-flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
        >
          <Plus class="h-5 w-5" />
          Add Client
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Users class="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ clients.length }}</p>
              <p class="text-gray-600 text-sm">Total Clients</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center">
              <Building2 class="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ agencyClients }}</p>
              <p class="text-gray-600 text-sm">Agency Clients</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <UserCheck class="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ directClients }}</p>
              <p class="text-gray-600 text-sm">Direct Clients</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div class="flex flex-col lg:flex-row gap-4">
          <!-- Search -->
          <div class="flex-1">
            <div class="relative">
              <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                v-model="searchQuery"
                @input="handleSearch"
                type="text"
                placeholder="Search clients by name, email, or contact person..."
                class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>

          <!-- Filters -->
          <div class="flex flex-col sm:flex-row gap-3">
            <select
              v-model="selectedType"
              @change="handleFilter"
              class="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 min-w-[160px]"
            >
              <option value="">All Types</option>
              <option value="direct">Direct Client</option>
              <option value="agency">Agency Client</option>
            </select>

            <select
              v-model="selectedStatus"
              @change="handleFilter"
              class="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 min-w-[160px]"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <button
              @click="resetFilters"
              class="px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all font-medium"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <!-- Clients Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div
          v-for="client in filteredClients"
          :key="client.id"
          class="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group relative"
        >
          <!-- Client Header -->
          <div class="flex items-start justify-between mb-6">
            <div class="flex items-center gap-4">
              <div class="h-14 w-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                <User class="h-7 w-7 text-gray-600" />
              </div>
              <div>
                <h3 class="font-bold text-gray-900 text-lg">{{ client.name }}</h3>
                <div class="flex items-center gap-2 mt-1">
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                    :class="client.type === 'direct' 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-blue-50 text-blue-700 border border-blue-200'"
                  >
                    {{ client.type === 'direct' ? 'Direct' : 'Agency' }}
                  </span>
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                    :class="client.status === 'active' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'"
                  >
                    {{ client.status === 'active' ? 'Active' : 'Inactive' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Actions Menu -->
            <div class="relative">
              <button
                @click="toggleClientMenu(client.id!)"
                class="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                <MoreVertical class="h-5 w-5" />
              </button>

              <!-- Dropdown Menu -->
              <div
                v-if="activeClientMenu === client.id"
                class="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20"
              >
                <button
                  @click="editClient(client)"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                >
                  <Edit class="h-4 w-4" />
                  Edit Client
                </button>
                <button
                  @click="viewClientDetails(client)"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                >
                  <Eye class="h-4 w-4" />
                  View Details
                </button>
                <hr class="my-2 border-gray-100">
                <button
                  @click="deleteClient(client.id!)"
                  class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                >
                  <Trash2 class="h-4 w-4" />
                  Delete Client
                </button>
              </div>
            </div>
          </div>

          <!-- Client Info -->
          <div class="space-y-4">
            <div class="flex items-center gap-3 text-gray-600">
              <Mail class="h-4 w-4 text-gray-400" />
              <span class="text-sm truncate">{{ client.email }}</span>
            </div>
            <div class="flex items-center gap-3 text-gray-600">
              <Phone class="h-4 w-4 text-gray-400" />
              <span class="text-sm">{{ client.phone }}</span>
            </div>
            <div class="flex items-start gap-3 text-gray-600">
              <MapPin class="h-4 w-4 text-gray-400 mt-0.5" />
              <span class="text-sm line-clamp-2">{{ client.address }}</span>
            </div>
            <div class="flex items-center gap-3 text-gray-600">
              <UserCheck class="h-4 w-4 text-gray-400" />
              <span class="text-sm">{{ client.contactPerson }}</span>
            </div>
          </div>

          <!-- Client Footer -->
          <div class="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span class="text-xs text-gray-500">
              Added {{ formatDate(client.createdAt) }}
            </span>
            <div class="flex items-center gap-2">
              <div class="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
              <span class="text-xs text-gray-500">Online</span>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="filteredClients.length === 0 && !clientsStore.loading"
          class="col-span-full flex flex-col items-center justify-center py-16 text-center"
        >
          <div class="h-32 w-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Users class="h-16 w-16 text-gray-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">No clients found</h3>
          <p class="text-gray-500 mb-8 max-w-md">
            {{ searchQuery ? 'Try adjusting your search criteria or filters.' : 'Get started by adding your first client to the system.' }}
          </p>
          <button
            v-if="!searchQuery"
            @click="openCreateModal"
            class="inline-flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all font-semibold"
          >
            <Plus class="h-5 w-5" />
            Add Your First Client
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="clientsStore.loading" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div
          v-for="n in 6"
          :key="n"
          class="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse"
        >
          <div class="flex items-center gap-4 mb-6">
            <div class="h-14 w-14 bg-gray-200 rounded-2xl"></div>
            <div class="flex-1">
              <div class="h-5 bg-gray-200 rounded-lg w-3/4 mb-2"></div>
              <div class="h-4 bg-gray-200 rounded-lg w-1/2"></div>
            </div>
          </div>
          <div class="space-y-4">
            <div class="h-4 bg-gray-200 rounded-lg"></div>
            <div class="h-4 bg-gray-200 rounded-lg w-5/6"></div>
            <div class="h-4 bg-gray-200 rounded-lg w-4/6"></div>
          </div>
        </div>
      </div>

      <!-- Create/Edit Modal -->
      <ClientModal
        v-if="showModal"
        :client="selectedClient"
        :is-edit="isEditMode"
        :loading="clientsStore.loading"
        @close="closeModal"
        @save="handleSave"
      />

      <!-- Click outside to close menu -->
      <div
        v-if="activeClientMenu"
        class="fixed inset-0 z-10"
        @click="activeClientMenu = null"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useClientsStore, type Client } from '@/stores/clients'
import ClientModal from '@/components/forms/ClientModal.vue'
import {
  Plus,
  Search,
  User,
  Users,
  Building2,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  MoreVertical,
  Edit,
  Eye,
  Trash2
} from 'lucide-vue-next'

const clientsStore = useClientsStore()

const searchQuery = ref('')
const selectedType = ref('')
const selectedStatus = ref('')
const showModal = ref(false)
const isEditMode = ref(false)
const selectedClient = ref<Client | null>(null)
const activeClientMenu = ref<number | null>(null)

const clients = computed(() => clientsStore.clients)
const agencyClients = computed(() => clients.value.filter(c => c.type === 'agency').length)
const directClients = computed(() => clients.value.filter(c => c.type === 'direct').length)

const filteredClients = computed(() => {
  let filtered = [...clients.value]
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(client =>
      client.name.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query) ||
      client.contactPerson.toLowerCase().includes(query)
    )
  }
  
  if (selectedType.value) {
    filtered = filtered.filter(client => client.type === selectedType.value)
  }
  
  if (selectedStatus.value) {
    filtered = filtered.filter(client => client.status === selectedStatus.value)
  }
  
  return filtered
})

const handleSearch = () => {
  // Search is handled by computed property
}

const handleFilter = () => {
  // Filtering is handled by computed property
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedType.value = ''
  selectedStatus.value = ''
}

const openCreateModal = () => {
  selectedClient.value = null
  isEditMode.value = false
  showModal.value = true
}

const toggleClientMenu = (clientId: number) => {
  activeClientMenu.value = activeClientMenu.value === clientId ? null : clientId
}

const editClient = (client: Client) => {
  selectedClient.value = client
  isEditMode.value = true
  showModal.value = true
  activeClientMenu.value = null
}

const viewClientDetails = (client: Client) => {
  console.log('View client details:', client)
  activeClientMenu.value = null
}

const deleteClient = async (id: number) => {
  if (confirm('Are you sure you want to delete this client? This action cannot be undone.')) {
    const result = await clientsStore.deleteClient(id)
    if (result.success) {
      // Show success message
    }
  }
  activeClientMenu.value = null
}

const closeModal = () => {
  showModal.value = false
  selectedClient.value = null
  isEditMode.value = false
}

const handleSave = async (clientData: Client) => {
  let result
  
  if (isEditMode.value && selectedClient.value?.id) {
    result = await clientsStore.updateClient(selectedClient.value.id, clientData)
  } else {
    result = await clientsStore.createClient(clientData)
  }
  
  if (result.success) {
    closeModal()
    // Show success message
  } else {
    // Show error message
    console.error(result.message)
  }
}

const formatDate = (date: string | undefined) => {
  if (!date) return 'Recently'
  return new Date(date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  })
}

onMounted(() => {
  clientsStore.fetchClients()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
