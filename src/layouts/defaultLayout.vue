<template>
  <div>
    <app-navigation></app-navigation>
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<script>
import AppNavigation from "@/components/AppNavigation.vue";
export default {
  components: {
    "app-navigation": AppNavigation
  }
};
</script>
