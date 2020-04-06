<template>
  <default-layout>
    <h1>Panier</h1>
    <div class="contentCart" v-if="productList && productList.length > 0">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" width="5%"></th>
            <th scope="col" width="75%" class="text-center">Article</th>
            <th scope="col" width="20%" class="text-right">Prix</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(article, index) in productList" :key="article._id+index">
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

      <form>
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <div class="row mb-2">
              <div class="col-md-4">
                <label>Nom :</label>
              </div>
              <div class="col-md-8">
                <input type="text" class="form-control" v-model="contact.lastName.value" />
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-4">
                <label>Prénom :</label>
              </div>
              <div class="col-md-8">
                <input type="text" class="form-control" v-model="contact.firstName.value" />
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-4">
                <label>Adresse :</label>
              </div>
              <div class="col-md-8">
                <textarea class="form-control" v-model="contact.address.value"></textarea>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-4">
                <label>Ville :</label>
              </div>
              <div class="col-md-8">
                <input type="text" class="form-control" v-model="contact.city.value" />
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-4">
                <label>Email :</label>
              </div>
              <div class="col-md-8">
                <input type="email" class="form-control" v-model="contact.email.value" />
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-4"></div>
              <div class="col-md-8">
                <button type="button" class="btn btn-success btn-lg btn-block" @click="orderCart()">
                  <i class="fa fa-shopping-cart" aria-hidden="true"></i> Commander
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="alert alert-warning" role="alert" v-else>Votre panier est vide</div>
  </default-layout>
</template>

<script>
import { helpers } from "@/services/helpers.js";
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
      validUserInput: false,
      productList: [],
      totalPrice: 0,
      order: {},
      contact: {
        firstName: { value: "testprénom ", error: "" },
        lastName: { value: "testnom", error: "" },
        address: { value: "testadress", error: "" },
        city: { value: "test ville", error: "" },
        email: { value: "testemail@emaildfd.com", error: "" }
      }
    };
  },
  methods: {
    orderCart() {
      let urlApi = "http://localhost:3000/api/teddies/order";
      let products = [];
      this.productList.forEach(prod => {
        products.push(prod._id.toString());
      });

      // TODO: control champs input

      let payload = {
        contact: {
          firstName: this.contact.firstName.value,
          lastName: this.contact.lastName.value,
          address: this.contact.address.value,
          city: this.contact.city.value,
          email: this.contact.email.value
        },
        products: products
      };

      this.$axios
        .post(urlApi, payload)
        .then(response => {
          console.log("response", response.data);
          // on supprime le local storage
          window.localStorage.removeItem("cart");

          // redirect vers la page de confirmation
          this.$router.push({
            name: "Confirmation",
            params: {
              products: response.data.products,
              orderId: response.data.orderId
            }
          });
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    fetchInfosCart() {
      this.productList = JSON.parse(window.localStorage.getItem("cart"));
      this.totalPrice = helpers.calculTotal(this.productList);
    },
    removeArticle(index) {
      this.productList.splice(index, 1);
      window.localStorage.setItem("cart", JSON.stringify(this.productList));
      this.totalPrice = helpers.calculTotal(this.productList);
    }
  }
};
</script>