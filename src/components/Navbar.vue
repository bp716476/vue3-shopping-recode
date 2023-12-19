<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
    aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0"
      :class="{'hidden-class': $route.fullPath.split('/')[1]  !== 'dashboard'}">
        <li class="nav-item">
          <router-link :class="{ 'active': $route.fullPath  === '/dashboard/products'}"
          class="nav-link" :to="{path: '/dashboard/products'}">產品</router-link>
        </li>
        <li class="nav-item">
          <router-link :class="{ 'active': $route.fullPath  === '/dashboard/orders'}"
          class="nav-link" :to="{path: '/dashboard/orders'}">訂單</router-link>
        </li>
        <li class="nav-item">
          <router-link  :class="{ 'active': $route.fullPath  === '/dashboard/coupons'}"
          class="nav-link" :to="{path: '/dashboard/coupons'}">優惠碼</router-link>
        </li>
      </ul>

      <ul class="navbar-nav me-auto mb-2 mb-lg-0"
      :class="{'hidden-class': $route.fullPath.split('/')[1]  !== 'user'}">
        <li class="nav-item">
          <router-link :class="{ 'active': $route.fullPath  === '/user/cart'}"
          class="nav-link" :to="{path: '/user/cart'}">產品</router-link>
        </li>
      </ul>
      <form class="d-flex">
          <a class="navbar-brand" href="#" @click.prevent="logout">登出</a>
      </form>
    </div>
  </div>
</nav>
</template>

<style>
  .navbar-nav li {
    border-left: 1px solid white;
  }
  .active {
    font-weight: bold;
  }
  .hidden-class {
  display: none;
  }
</style>

<script>
export default {
  watch: {
    $route() {
    },
  },
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}logout`;

      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            this.$router.push('/login');
          }
        });
    },
  },
};
</script>
