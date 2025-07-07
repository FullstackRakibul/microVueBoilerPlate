<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <div class="flex space-x-3">
        <select
          v-model="selectedPeriod"
          @change="fetchData"
          class="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPIBox
        title="Total Invoices"
        :value="dashboardStore.stats.totalInvoices"
        :icon="FileText"
        color="blue"
        format="number"
        change="+12%"
        clickable
        @click="navigateToInvoices"
      />
      <KPIBox
        title="Total Revenue"
        :value="dashboardStore.stats.totalRevenue"
        :icon="DollarSign"
        color="green"
        format="currency"
        change="+8.2%"
        clickable
        @click="navigateToReports"
      />
      <KPIBox
        title="Amount Due"
        :value="dashboardStore.stats.totalDue"
        :icon="Clock"
        color="yellow"
        format="currency"
        change="-3.1%"
        clickable
        @click="navigateToPayments"
      />
      <KPIBox
        title="Paid Amount"
        :value="dashboardStore.stats.totalPaid"
        :icon="CheckCircle"
        color="green"
        format="currency"
        change="+15.3%"
        clickable
        @click="navigateToPayments"
      />
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Revenue Chart -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Monthly Revenue</h3>
        <div class="h-80">
          <canvas ref="revenueChart"></canvas>
        </div>
      </div>

      <!-- Top Clients Chart -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Top Clients</h3>
        <div class="h-80">
          <canvas ref="clientsChart"></canvas>
        </div>
      </div>
    </div>

    <!-- Revenue by Agency -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Revenue by Agency</h3>
      <div class="h-80">
        <canvas ref="agencyChart"></canvas>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
      <div class="space-y-4">
        <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center space-x-3">
          <div class="flex-shrink-0">
            <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <component :is="activity.icon" class="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-gray-900">{{ activity.description }}</p>
            <p class="text-xs text-gray-500">{{ activity.time }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useDashboardStore } from '@/stores/dashboard'
import KPIBox from '@/components/shared/KPIBox.vue'
import {
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  TrendingUp,
  Users,
  Building2
} from 'lucide-vue-next'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const router = useRouter()
const dashboardStore = useDashboardStore()

const selectedPeriod = ref('month')
const revenueChart = ref<HTMLCanvasElement>()
const clientsChart = ref<HTMLCanvasElement>()
const agencyChart = ref<HTMLCanvasElement>()

const recentActivities = ref([
  {
    id: 1,
    description: 'New invoice #INV-001 created for ABC Corp',
    time: '2 minutes ago',
    icon: FileText
  },
  {
    id: 2,
    description: 'Payment received from XYZ Agency',
    time: '1 hour ago',
    icon: DollarSign
  },
  {
    id: 3,
    description: 'New client "Tech Solutions" added',
    time: '3 hours ago',
    icon: Users
  }
])

const navigateToInvoices = () => router.push('/invoices')
const navigateToReports = () => router.push('/reports')
const navigateToPayments = () => router.push('/payments')

const fetchData = async () => {
  await dashboardStore.fetchDashboardData()
  await nextTick()
  initializeCharts()
}

const initializeCharts = () => {
  // Revenue Chart
  if (revenueChart.value) {
    new Chart(revenueChart.value, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue',
          data: [12000, 19000, 15000, 25000, 22000, 30000],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString()
              }
            }
          }
        }
      }
    })
  }

  // Top Clients Chart
  if (clientsChart.value) {
    new Chart(clientsChart.value, {
      type: 'doughnut',
      data: {
        labels: ['ABC Corp', 'XYZ Agency', 'Tech Solutions', 'Media Group', 'Others'],
        datasets: [{
          data: [30, 25, 20, 15, 10],
          backgroundColor: [
            'rgb(59, 130, 246)',
            'rgb(16, 185, 129)',
            'rgb(245, 158, 11)',
            'rgb(239, 68, 68)',
            'rgb(156, 163, 175)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    })
  }

  // Agency Revenue Chart
  if (agencyChart.value) {
    new Chart(agencyChart.value, {
      type: 'bar',
      data: {
        labels: ['Creative Agency', 'Media Partners', 'Digital Solutions', 'Brand Masters', 'Ad Experts'],
        datasets: [{
          label: 'Revenue',
          data: [45000, 38000, 32000, 28000, 22000],
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString()
              }
            }
          }
        }
      }
    })
  }
}

onMounted(() => {
  fetchData()
})
</script>
