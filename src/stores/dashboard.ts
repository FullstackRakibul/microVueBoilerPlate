import { ref } from "vue"
import { defineStore } from "pinia"
import axios from "axios"

export const useDashboardStore = defineStore("dashboard", () => {
  const stats = ref({
    totalInvoices: 0,
    monthlyInvoices: 0,
    yearlyInvoices: 0,
    totalRevenue: 0,
    totalDue: 0,
    totalPaid: 0,
  })

  const topClients = ref([])
  const revenueByAgency = ref([])
  const monthlyRevenue = ref([])
  const loading = ref(false)

  const fetchDashboardData = async () => {
    loading.value = true
    try {
      const [statsRes, clientsRes, agencyRes, revenueRes] = await Promise.all([
        axios.get("/api/dashboard/stats"),
        axios.get("/api/dashboard/top-clients"),
        axios.get("/api/dashboard/revenue-by-agency"),
        axios.get("/api/dashboard/monthly-revenue"),
      ])

      stats.value = statsRes.data
      topClients.value = clientsRes.data
      revenueByAgency.value = agencyRes.data
      monthlyRevenue.value = revenueRes.data
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      loading.value = false
    }
  }

  return {
    stats,
    topClients,
    revenueByAgency,
    monthlyRevenue,
    loading,
    fetchDashboardData,
  }
})
