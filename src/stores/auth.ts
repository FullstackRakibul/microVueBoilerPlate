import { ref, computed } from "vue"
import { defineStore } from "pinia"
import axios from "axios"

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token") || "")
  const user = ref<null | { id: number; name: string; email: string; role: string }>(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value)

  const login = async (credentials: { email: string; password: string }) => {
    loading.value = true
    try {
      // Static admin credentials
      const ADMIN_EMAIL = "admin@ch24.com"
      const ADMIN_PASSWORD = "admin@ch24.com"

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
        // Generate a mock token
        const mockToken = "mock-jwt-token-" + Date.now()

        token.value = mockToken
        user.value = {
          id: 1,
          name: "Admin User",
          email: ADMIN_EMAIL,
          role: "admin",
        }

        localStorage.setItem("token", token.value)
        localStorage.setItem("user", JSON.stringify(user.value))

        // Set default authorization header
        axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`

        return { success: true }
      } else {
        return { success: false, message: "Invalid email or password" }
      }
    } catch (error: any) {
      return { success: false, message: "Login failed" }
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    token.value = ""
    user.value = null
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    delete axios.defaults.headers.common["Authorization"]
  }

  const initializeAuth = () => {
    if (token.value) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`

      // Restore user data from localStorage
      const savedUser = localStorage.getItem("user")
      if (savedUser) {
        try {
          user.value = JSON.parse(savedUser)
        } catch (error) {
          console.error("Failed to parse saved user data:", error)
          logout()
        }
      }
    }
  }

  return {
    token,
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    initializeAuth,
  }
})
