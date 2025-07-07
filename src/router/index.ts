import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "@/stores/auth"
import Dashboard from "@/views/Dashboard.vue"
import Login from "@/views/Login.vue"
import Clients from "@/views/Clients.vue"
import Agencies from "@/views/Agencies.vue"
import AdBookings from "@/views/AdBookings.vue"
import Invoices from "@/views/Invoices.vue"
import InvoiceDetails from "@/views/InvoiceDetails.vue"
import Payments from "@/views/Payments.vue"
import Reports from "@/views/Reports.vue"
import DeliveryLogs from "@/views/DeliveryLogs.vue"
import Settings from "@/views/Settings.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { requiresAuth: false },
    },
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: "/clients",
      name: "Clients",
      component: Clients,
      meta: { requiresAuth: true },
    },
    {
      path: "/agencies",
      name: "Agencies",
      component: Agencies,
      meta: { requiresAuth: true },
    },
    {
      path: "/ad-bookings",
      name: "AdBookings",
      component: AdBookings,
      meta: { requiresAuth: true },
    },
    {
      path: "/invoices",
      name: "Invoices",
      component: Invoices,
      meta: { requiresAuth: true },
    },
    {
      path: "/invoices/:id",
      name: "InvoiceDetails",
      component: InvoiceDetails,
      meta: { requiresAuth: true },
    },
    {
      path: "/payments",
      name: "Payments",
      component: Payments,
      meta: { requiresAuth: true },
    },
    {
      path: "/reports",
      name: "Reports",
      component: Reports,
      meta: { requiresAuth: true },
    },
    {
      path: "/delivery-logs",
      name: "DeliveryLogs",
      component: DeliveryLogs,
      meta: { requiresAuth: true },
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings,
      meta: { requiresAuth: true },
    },
  ],
})

// Route guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login")
  } else if (to.path === "/login" && authStore.isAuthenticated) {
    next("/")
  } else {
    next()
  }
})

export default router
