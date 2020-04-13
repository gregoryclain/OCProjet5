<template>
  <default-layout>
    <h1 class="text-center">{{ dataProduct.name }}</h1>
    <div class="row" v-if="dataProduct">
      <div class="col-md-6">
        <figure>
          <img :src="dataProduct.imageUrl" :alt="dataProduct.name" class="img-thumbnail" />
        </figure>
      </div>
      <div class="col-md-6">
        <div>{{ dataProduct.description }}</div>
        <div class="row my-3">
          <div class="col-md-6">
            <span>Prix :</span>
          </div>
          <div class="col-md-6 text-right">
            <strong>{{ dataProduct.price }}</strong> €
          </div>
        </div>

        <div class="row my-3">
          <div class="col-md-4">Couleur :</div>
          <div class="col-md-8">
            <select class="form-control" v-model="dataProduct.selectedVariant">
              <option value>Veuillez choisir une couleur</option>
              <option v-for="color in dataProduct.colors" :key="color.id">{{ color }}</option>
            </select>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-6"></div>
          <div class="col-md-6 text-right">
            <button type="button" class="btn btn-primary" @click="addToCart(dataProduct.id)">
              <i class="fa fa-cart-plus" aria-hidden="true"></i> Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<script>
/* eslint-disable no-unused-vars */
// import { helpers } from "@/services/helpers.js";
import DefaultLayout from "@/layouts/defaultLayout.vue";

export default {
  name: "Produit",
  components: {
    DefaultLayout
  },
  mounted: function() {
    this.getParams();
    this.fetchData();
  },
  data() {
    return {
      idProduct: null,
      isLoading: false,
      dataProduct: {}
    };
  },
  methods: {
    addToCart() {
      let currentCart = JSON.parse(window.localStorage.getItem("cart"));
      // check if cart exist
      if (currentCart && currentCart.length > 0) {
        let checkDupplicateVariant = false;
        currentCart.forEach(product => {
          if (
            product._id === this.dataProduct._id &&
            product.selectedVariant === this.dataProduct.selectedVariant
          ) {
            checkDupplicateVariant = true;
          }
        });
        if (checkDupplicateVariant == false) {
          currentCart.push(this.dataProduct);
          window.localStorage.setItem("cart", JSON.stringify(currentCart));
        }
      } else {
        // création new cart
        let cart = [];
        cart.push(this.dataProduct);
        window.localStorage.setItem("cart", JSON.stringify(cart));
      }
      this.$router.push("/panier");
    },
    getParams() {
      this.idProduct = this.$route.params.id;
    },
    fetchData() {
      this.isLoading = true;
      this.$axios
        .get("http://localhost:3000/api/teddies/" + this.idProduct)
        .then(response => {
          this.dataProduct = response.data;
          this.dataProduct.selectedVariant = "";
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
