import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Panier from "../views/Panier.vue";
import Produit from "../views/Produit.vue";

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
  }
];

const router = new VueRouter({
  routes
});

export default router;
