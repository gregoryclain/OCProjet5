<template>
  <default-layout>
    <h1 class="text-center">{{ dataProduct.name }}</h1>
    <div class="row">
      <div class="col-md-6">
        <figure>
          <img :src="dataProduct.imageUrl" :alt="dataProduct.name" class="img-thumbnail" />
        </figure>
      </div>
      <div class="col-md-6">
        <div>{{ dataProduct.description }}</div>
        <p class="mt-3">
          <strong>{{ dataProduct.price }}</strong> €
        </p>
        <p class="text-right">
          <button type="button" class="btn btn-primary" @click="addToCart(dataProduct.id)"><i class="fa fa-cart-plus" aria-hidden="true"></i> Ajouter au panier</button>
        </p>
      </div>
    </div>
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
    this.idProduct = this.$route.params.id;
    this.fetchData();
  },
  data() {
    return {
      idProduct: null,
      isLoading: false,
      dataProduct: []
    };
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      this.$axios
        .get("http://localhost:3000/api/teddies/" + this.idProduct)
        .then(response => {
          this.dataProduct = response.data;
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
