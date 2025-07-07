import { ref } from "vue"
import { defineStore } from "pinia"

export interface Client {
  id?: number
  name: string
  email: string
  phone: string
  address: string
  type: "agency" | "direct"
  agencyId?: number
  contactPerson: string
  taxId?: string
  createdAt?: string
  status?: "active" | "inactive"
}

export const useClientsStore = defineStore("clients", () => {
  const clients = ref<Client[]>([
    {
      id: 1,
      name: "TechCorp Solutions",
      email: "contact@techcorp.com",
      phone: "+1 (555) 123-4567",
      address: "123 Business Ave, Suite 100, New York, NY 10001",
      type: "direct",
      contactPerson: "John Smith",
      taxId: "TC-2024-001",
      createdAt: "2024-01-15T10:30:00Z",
      status: "active",
    },
    {
      id: 2,
      name: "Creative Media Group",
      email: "hello@creativemedia.com",
      phone: "+1 (555) 987-6543",
      address: "456 Design Street, Floor 5, Los Angeles, CA 90210",
      type: "agency",
      agencyId: 1,
      contactPerson: "Sarah Johnson",
      taxId: "CMG-2024-002",
      createdAt: "2024-02-20T14:15:00Z",
      status: "active",
    },
    {
      id: 3,
      name: "Global Retail Inc",
      email: "partnerships@globalretail.com",
      phone: "+1 (555) 456-7890",
      address: "789 Commerce Blvd, Chicago, IL 60601",
      type: "direct",
      contactPerson: "Michael Chen",
      taxId: "GRI-2024-003",
      createdAt: "2024-03-10T09:45:00Z",
      status: "active",
    },
  ])

  const loading = ref(false)
  const currentPage = ref(1)
  const totalPages = ref(1)
  const searchQuery = ref("")

  const fetchClients = async (page = 1, search = "") => {
    loading.value = true
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      let filteredClients = [...clients.value]

      if (search) {
        filteredClients = filteredClients.filter(
          (client) =>
            client.name.toLowerCase().includes(search.toLowerCase()) ||
            client.email.toLowerCase().includes(search.toLowerCase()) ||
            client.contactPerson.toLowerCase().includes(search.toLowerCase()),
        )
      }

      // Simulate pagination
      const itemsPerPage = 10
      totalPages.value = Math.ceil(filteredClients.length / itemsPerPage)
      currentPage.value = page
    } catch (error) {
      console.error("Failed to fetch clients:", error)
    } finally {
      loading.value = false
    }
  }

  const createClient = async (clientData: Client) => {
    try {
      loading.value = true
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      const newClient: Client = {
        ...clientData,
        id: Math.max(...clients.value.map((c) => c.id || 0)) + 1,
        createdAt: new Date().toISOString(),
        status: "active",
      }

      clients.value.unshift(newClient)
      return { success: true }
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || "Failed to create client" }
    } finally {
      loading.value = false
    }
  }

  const updateClient = async (id: number, clientData: Client) => {
    try {
      loading.value = true
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      const index = clients.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        clients.value[index] = { ...clientData, id }
      }
      return { success: true }
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || "Failed to update client" }
    } finally {
      loading.value = false
    }
  }

  const deleteClient = async (id: number) => {
    try {
      loading.value = true
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      clients.value = clients.value.filter((c) => c.id !== id)
      return { success: true }
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || "Failed to delete client" }
    } finally {
      loading.value = false
    }
  }

  return {
    clients,
    loading,
    currentPage,
    totalPages,
    searchQuery,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
  }
})
