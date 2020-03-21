<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/" class="nav-link">
            Home
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
      </ul>
      <router-link to="/panier" class="btn btn-warning">
        <i class="fa fa-shopping-cart" aria-hidden="true"></i> Panier
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {};
</script>
