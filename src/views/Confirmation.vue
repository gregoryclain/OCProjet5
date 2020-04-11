<template>
  <default-layout>
    <h1>Confirmation de commande</h1>
    <div v-if="orderId">
      <p>
        Récapitulatif de la commande
        <strong>{{ orderId }}</strong>
      </p>
      <div class="contentCart" v-if="productList.length > 0">
        <table class="table">
          <thead>
            <tr>
              <th scope="col" width="75%" class="text-center">Article</th>
              <th scope="col" width="20%" class="text-right">Prix</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(article,index) in productList" :key="article._id+index">
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
              <th class="text-right">Total :</th>
              <td class="text-right">
                <strong>{{ totalPrice }} €</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </default-layout>
</template>

<script>
import { helpers } from "@/services/helpers.js";
import DefaultLayout from "@/layouts/defaultLayout.vue";

export default {
  name: "Confirmation",
  components: {
    DefaultLayout
  },
  mounted: function() {
    this.setOrderInfos();
  },
  data() {
    return {
      orderId: null,
      productList: [],
      totalPrice: 0
    };
  },
  methods: {
    setOrderInfos() {
      this.orderId = this.$route.params.orderId;
      if (this.$route.params.products) {
        this.productList = this.$route.params.products;
        this.totalPrice = helpers.calculTotal(this.productList);
      }
    }
  }
};
</script>
