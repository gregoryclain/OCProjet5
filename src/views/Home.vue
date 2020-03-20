<template>
  <default-layout>
    <h1>Home</h1>
  </default-layout>
</template>

<script>
import DefaultLayout from "@/layouts/defaultLayout.vue";

export default {
  name: "Home",
  components: {
    DefaultLayout
  },
  mounted: function() {
    this.fetchData();
  },
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    fetchData() {
      console.log("je dois récupérer les données");
      this.isLoading = true;
      this.$axios
        .get("http://localhost:3000/api/teddies")
        .then(response => {
          console.log("response", response.data);
        })
        .catch(error => {
          console.log("error", error);
        })
        .then(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>
