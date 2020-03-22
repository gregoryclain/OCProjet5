<template>
  <default-layout>
    <h1>Home</h1>
    <ul class="list-group">
      <li class="list-group-item" v-for="data in listDataOurs" :key="data.id">
        <article>
          <div class="row">
            <div class="col-md-3">
              <figure>
                <img :src="data.imageUrl" :alt="data.name" class="img-thumbnail" />
              </figure>
            </div>
            <div class="col-md-7">
              <h2>{{ data.name }}</h2>
              <div>{{ data.description }}</div>
              <p class="mt-3">
                <strong>{{ data.price }}</strong> €
              </p>
            </div>
            <div class="col-md-2">
              <button type="button" class="btn btn-primary" @click="goToPage(data._id)">
                <i class="fa fa-eye" aria-hidden="true"></i> En savoir plus
              </button>
            </div>
          </div>
        </article>
      </li>
    </ul>
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
      isLoading: false,
      listDataOurs: []
    };
  },
  methods: {
    goToPage(id) {
      this.$router.push("/produit/" + id);
    },
    fetchData() {
      this.isLoading = true;
      this.$axios
        .get("http://localhost:3000/api/teddies")
        .then(response => {
          this.listDataOurs = response.data;
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
