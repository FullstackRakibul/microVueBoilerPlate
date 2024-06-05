<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HeaderComponent from "@/layouts/HeaderComponent.vue";
</script>

<template>
  <HeaderComponent />
  <RouterView />
</template>

<style scoped>
@media (min-width: 1024px) {}
</style>