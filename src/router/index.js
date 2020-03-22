import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Panier from "../views/Panier.vue";
import Produit from "../views/Produit.vue";
import Confirmation from "../views/Confirmation.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/panier",
    name: "Panier",
    component: Panier
  },
  {
    path: "/produit/:id",
    name: "Produit",
    component: Produit
  },
  {
    path: "/confirmation",
    name: "Confirmation",
    component: Confirmation
  }
];

const router = new VueRouter({
  routes
});

export default router;
