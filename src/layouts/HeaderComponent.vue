<script setup>
import { ref } from 'vue';


const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>



<template lang="">
  <header class="bg-white shadow-lg">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center">
        <img src="@/assets/businessPropsLogo.png" alt="BusinessProps" class="h-10 w-10 mr-3" />
        <span class="text-xl font-bold text-gray-800">BusinessProps</span>
      </div>

      <!-- Navigation -->
      <nav class="hidden md:flex space-x-8">
        <router-link to="/" class="text-gray-800 hover:text-primary">Home</router-link>
        <router-link to="/service" class="text-gray-800 hover:text-primary">Service</router-link>
        <router-link to="/about" class="text-gray-800 hover:text-primary">About</router-link>
        <router-link to="/contact" class="text-gray-800 hover:text-primary">Contact</router-link>
      </nav>

      <!-- Get Quotes Button -->
      <div class="hidden md:flex">
        <router-link to="/get-quote" class="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark">
          Get Quotes
        </router-link>
      </div>

      <!-- Mobile Menu Button -->
      <div class="md:hidden">
        <button
          class="text-gray-800 focus:outline-none"
          @click="toggleMenu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <nav v-if="isMenuOpen" class="md:hidden">
      <router-link to="/" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Home</router-link>
      <router-link to="/service" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Service</router-link>
      <router-link to="/about" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">About</router-link>
      <router-link to="/contact" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Contact</router-link>
      <router-link to="/get-quote" class="block px-4 py-2 bg-primary text-white text-center hover:bg-primary-dark">
        Get Quotes
      </router-link>
    </nav>
  </header>
</template>

<style lang="">

</style>