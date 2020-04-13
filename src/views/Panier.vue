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
          <tr v-for="(article, index) in productList" :key="article._id + index">
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
                    <strong>{{ article.name }}</strong>
                    <br />
                    {{ article.description }}
                  </p>
                  <p v-if="article.selectedVariant">Couleur : {{ article.selectedVariant }}</p>
                </div>
              </div>
            </td>
            <td class="text-right">{{ article.price }} €</td>
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
          <div class="col-md-2"></div>
          <div class="col-md-10">
            <div class="row mb-2">
              <div class="col-md-2">
                <label>Nom :</label>
              </div>
              <div class="col-md-4">
                <input
                  type="text"
                  class="form-control"
                  v-model="contact.lastName.value"
                  @blur="checkOnfField('text', contact.lastName)"
                />
              </div>
              <div class="col-md-4">
                <span class="errorZ" v-if="contact.lastName.error">{{ contact.lastName.error }}</span>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-2">
                <label>Prénom :</label>
              </div>
              <div class="col-md-4">
                <input
                  type="text"
                  class="form-control"
                  v-model="contact.firstName.value"
                  @blur="checkOnfField('text', contact.firstName)"
                />
              </div>
              <div class="col-md-4">
                <span class="errorZ" v-if="contact.firstName.error">{{ contact.firstName.error }}</span>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-2">
                <label>Adresse :</label>
              </div>
              <div class="col-md-4">
                <textarea
                  class="form-control"
                  v-model="contact.address.value"
                  @blur="checkOnfField('text', contact.address)"
                ></textarea>
              </div>
              <div class="col-md-4">
                <span class="errorZ" v-if="contact.address.error">{{ contact.address.error }}</span>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-2">
                <label>Ville :</label>
              </div>
              <div class="col-md-4">
                <input
                  type="text"
                  class="form-control"
                  v-model="contact.city.value"
                  @blur="checkOnfField('text', contact.city)"
                />
              </div>
              <div class="col-md-4">
                <span class="errorZ" v-if="contact.city.error">{{ contact.city.error }}</span>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-2">
                <label>Email :</label>
              </div>
              <div class="col-md-4">
                <input
                  type="email"
                  class="form-control"
                  v-model="contact.email.value"
                  @blur="checkOnfField('email', contact.email)"
                />
              </div>
              <div class="col-md-4">
                <span class="errorZ" v-if="contact.email.error">{{ contact.email.error }}</span>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-2"></div>
              <div class="col-md-4">
                <router-link
                  to="/"
                  class="btn btn-info btn-lg btn-block mr-4 mb-1"
                >Continuer mes achats</router-link>
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
/* eslint-disable no-unused-vars */
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
        lastName: { value: "", error: "" },
        firstName: { value: " ", error: "" },
        address: { value: "", error: "" },
        city: { value: "", error: "" },
        email: { value: "", error: "" }
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

      this.checkFields();

      if (!this.validUserInput) {
        let payload = {
          contact: {
            lastName: this.contact.lastName.value,
            firstName: this.contact.firstName.value,
            address: this.contact.address.value,
            city: this.contact.city.value,
            email: this.contact.email.value
          },
          products: products
        };

        this.$axios
          .post(urlApi, payload)
          .then(response => {
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
      }
    },
    checkFields() {
      this.validUserInput = false;
      // eslint-disable-next-line no-useless-escape
      const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const regexStr = /[a-zA-Z]/g;

      for (let propN1 in this.contact) {
        for (let propN2 in this.contact[propN1]) {
          this.contact[propN1]["error"] = ""; // clean champ error
          if (this.contact[propN1]["value"].length < 3) {
            // control nombre carac
            this.contact[propN1]["error"] = "Nombre de caractères insuffisant";
            this.validUserInput = true;
          }
        }
      }

      // controle type value
      if (!regexStr.test(this.contact.firstName.value)) {
        this.contact.firstName.error = "Le prénom n'est pas valide ";
        this.validUserInput = true;
      }
      if (!regexStr.test(this.contact.lastName.value)) {
        this.contact.lastName.error = "Le nom n'est pas valide ";
        this.validUserInput = true;
      }
      if (!regexStr.test(this.contact.address.value)) {
        this.contact.address.error = "L'adresse n'est pas valide";
        this.validUserInput = true;
      }

      if (!regexStr.test(this.contact.city.value)) {
        this.contact.city.error = "La ville n'est pas valide ";
        this.validUserInput = true;
      }
      if (!regexEmail.test(this.contact.email.value)) {
        this.contact.email.error = "L'email n'est pas valide ";
        this.validUserInput = true;
      }
    },
    checkOnfField(type, field) {
      field.error = "";
      // eslint-disable-next-line no-useless-escape
      const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const regexStr = /[a-zA-Z]/g;
      if (type === "text") {
        if (!regexStr.test(field.value)) {
          field.error = "Le champs n'est pas valide ";
          this.validUserInput = true;
        }
      }
      if (type === "email") {
        if (!regexEmail.test(field.value)) {
          field.error = "L'email n'est pas au bon format";
          this.validUserInput = true;
        }
      }
      if (field.value.length < 3) {
        field.error = "Le champs dois contenir au moins 3 caractères";
        this.validUserInput = true;
      }
    },
    fetchInfosCart() {
      this.productList = JSON.parse(window.localStorage.getItem("cart"));
      if (this.productList) {
        this.totalPrice = helpers.calculTotal(this.productList);
      }
    },
    removeArticle(index) {
      this.productList.splice(index, 1);
      window.localStorage.setItem("cart", JSON.stringify(this.productList));
      this.totalPrice = helpers.calculTotal(this.productList);
    }
  }
};
</script>

<style scoped>
.errorZ {
  color: darkred;
  font-size: 0.8em;
  font-weight: bold;
}
</style>
