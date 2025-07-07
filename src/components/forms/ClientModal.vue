<template>
  <!-- Modal Backdrop -->
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <!-- Modal Container -->
    <div 
      class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all"
      @click.stop
    >
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-8 border-b border-gray-100">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">
            {{ isEdit ? 'Edit Client' : 'Add New Client' }}
          </h2>
          <p class="text-gray-600 mt-1">
            {{ isEdit ? 'Update client information below' : 'Fill in the details to add a new client' }}
          </p>
        </div>
        <button
          @click="$emit('close')"
          class="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-2xl transition-all"
        >
          <X class="h-6 w-6" />
        </button>
      </div>

      <!-- Modal Body -->
      <div class="overflow-y-auto max-h-[calc(90vh-200px)]">
        <form @submit.prevent="handleSubmit" class="p-8 space-y-8">
          <!-- Basic Information Section -->
          <div class="space-y-6">
            <div class="flex items-center gap-3 mb-6">
              <div class="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <User class="h-5 w-5 text-blue-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Basic Information</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-900 mb-3">
                  Client Name *
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Enter client name"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-900 mb-3">
                  Contact Person *
                </label>
                <input
                  v-model="form.contactPerson"
                  type="text"
                  required
                  placeholder="Enter contact person name"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-900 mb-3">
                  Email Address *
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Enter email address"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-900 mb-3">
                  Phone Number *
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  required
                  placeholder="Enter phone number"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-900 mb-3">
                Address *
              </label>
              <textarea
                v-model="form.address"
                rows="3"
                required
                placeholder="Enter complete address"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none text-gray-900 placeholder-gray-500"
              ></textarea>
            </div>
          </div>

          <!-- Client Classification Section -->
          <div class="space-y-6">
            <div class="flex items-center gap-3 mb-6">
              <div class="h-10 w-10 bg-purple-50 rounded-xl flex items-center justify-center">
                <Building2 class="h-5 w-5 text-purple-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Client Classification</h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-900 mb-3">
                  Client Type *
                </label>
                <select
                  v-model="form.type"
                  required
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900"
                >
                  <option value="">Select client type</option>
                  <option value="direct">Direct Client</option>
                  <option value="agency">Agency Client</option>
                </select>
              </div>

              <div v-if="form.type === 'agency'">
                <label class="block text-sm font-semibold text-gray-900 mb-3">
                  Associated Agency
                </label>
                <select
                  v-model="form.agencyId"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900"
                >
                  <option value="">Select agency</option>
                  <option value="1">Creative Agency</option>
                  <option value="2">Media Partners</option>
                  <option value="3">Digital Solutions</option>
                  <option value="4">Brand Masters</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Additional Information Section -->
          <div class="space-y-6">
            <div class="flex items-center gap-3 mb-6">
              <div class="h-10 w-10 bg-green-50 rounded-xl flex items-center justify-center">
                <FileText class="h-5 w-5 text-green-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Additional Information</h3>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-900 mb-3">
                Tax ID / Registration Number
              </label>
              <input
                v-model="form.taxId"
                type="text"
                placeholder="Enter tax ID or registration number"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
              />
              <p class="text-sm text-gray-500 mt-2">Optional - Used for invoice generation and tax purposes</p>
            </div>
          </div>
        </form>
      </div>

      <!-- Modal Footer -->
      <div class="flex items-center justify-end gap-4 p-8 border-t border-gray-100 bg-gray-50">
        <button
          type="button"
          @click="$emit('close')"
          class="px-6 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all font-semibold"
        >
          Cancel
        </button>
        <button
          @click="handleSubmit"
          :disabled="!isFormValid || loading"
          class="px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold flex items-center gap-2"
        >
          <span v-if="loading" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          {{ loading ? 'Saving...' : (isEdit ? 'Update Client' : 'Create Client') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Client } from '@/stores/clients'
import { X, User, Building2, FileText } from 'lucide-vue-next'

interface Props {
  client?: Client | null
  isEdit?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  client: null,
  isEdit: false,
  loading: false
})

const emit = defineEmits<{
  close: []
  save: [client: Client]
}>()

const form = ref<Client>({
  name: '',
  email: '',
  phone: '',
  address: '',
  type: 'direct',
  contactPerson: '',
  taxId: ''
})

const isFormValid = computed(() => {
  return form.value.name.trim() && 
         form.value.email.trim() && 
         form.value.phone.trim() && 
         form.value.address.trim() && 
         form.value.contactPerson.trim() && 
         form.value.type
})

watch(() => props.client, (newClient) => {
  if (newClient) {
    form.value = { ...newClient }
  } else {
    // Reset form for new client
    form.value = {
      name: '',
      email: '',
      phone: '',
      address: '',
      type: 'direct',
      contactPerson: '',
      taxId: ''
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  if (isFormValid.value && !props.loading) {
    emit('save', form.value)
  }
}
</script>
