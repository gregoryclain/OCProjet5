<template>
  <default-layout>
    <h1>Panier</h1>
    <div class="contentCart" v-if="productList.length > 0">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" width="5%"></th>
            <th scope="col" width="75%" class="text-center">Article</th>
            <th scope="col" width="20%" class="text-right">Prix</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(article, index) in productList" :key="article._id">
            <td>
              <button type="button" class="btn btn-danger btn-sm" @click="removeArticle(index)">
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </button>
            </td>
            <td>
              <div class="row">
                <div class="col-md-3">
                  <img :src="article.imageUrl" :alt="article.name" class="img-thumbnail" />
                </div>
                <div class="col-md-9">
                  <p>
                    <strong>{{ article.name}}</strong>
                    <br />
                    {{ article.description}}
                  </p>
                  <p v-if="article.selectedVariant">Couleur : {{ article.selectedVariant}}</p>
                </div>
              </div>
            </td>
            <td class="text-right">{{ article.price}} €</td>
          </tr>
          <tr>
            <td></td>
            <th class="text-right">Total :</th>
            <td class="text-right">
              <strong>{{ totalPrice }} €</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div class="col-md-12 text-right">
          <router-link to="/" class="btn btn-info btn-lg mr-4">Continuer mes achats</router-link>
          <button type="button" class="btn btn-success btn-lg" @click="orderCart()">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i> Commander
          </button>
        </div>
      </div>
    </div>

    <div class="alert alert-warning" role="alert" v-else>Votre panier est vide</div>
  </default-layout>
</template>

<script>
import DefaultLayout from "@/layouts/defaultLayout.vue";

export default {
  name: "Home",
  components: {
    DefaultLayout
  },
  mounted() {
    this.fetchInfosCart();
  },
  data() {
    return {
      productList: [],
      totalPrice: 0
    };
  },
  methods: {
    orderCart() {
      console.log("je dois commander");
    },
    fetchInfosCart() {
      this.productList = JSON.parse(window.localStorage.getItem("cart"));
      this.calculTotal();
    },
    removeArticle(index) {
      this.productList.splice(index, 1);
      window.localStorage.setItem("cart", JSON.stringify(this.productList));
      this.calculTotal();
    },
    calculTotal() {
      this.totalPrice = 0;
      this.productList.forEach(el => {
        this.totalPrice += parseFloat(el.price);
      });
    }
  }
};
</script>