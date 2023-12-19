<template>
  <div class="container">
    <div class="text-end">
      <button class="btn btn-primary" @click="openUserCartModal(true)">購物車</button>
    </div>
    <div class="row mt-4">
        <div class="row md-7">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>圖片</th>
              <th>商品名稱</th>
              <th>價格</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td :style="{ maxWidth: '200px', maxHeight: '100px' }">
                <img class="img-fluid" alt="" :src="item.imageUrl">
              </td>
              <td>
                <a href="#" class="text-dark">{{item.title }}</a>
              </td>
              <td>
                <div class="h5">NT.{{ $filters.currency(item.price) }}</div>
              </td>
              <td>
                <div class="=btn-group btn-group-sm">
                  <button type="button" class="btn btn-outline-secondary"
                  @click.prevent="getProduct(item.id)">
                    <i class="fas fa-spinner fa-spin"></i>查看更多
                  </button>
                  <button type="button" class="btn btn-outline-danger"
                  :disabled="this.status.loadingItem === item.id" @click.prevent="AddCart(item.id)">
                    <div class="spinner-border spinner-border-sm text-primary" role="status"
                    v-if="this.status.loadingItem === item.id">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    加到購物車
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
    </div>
  </div>
  <UserCartModal ref="usercartmodal" :cart="tempcarts"
  @delete-cart="delCart" @update-cart="UpdateCart"></UserCartModal>
</template>

<script>
import UserCartModal from '../components/UserCartModal.vue';

export default ({
  data() {
    return {
      products: [],
      pagination: {},
      tempcarts: [],
      status: {
        loadingItem: '',
      },
    };
  },
  components: {
    UserCartModal,
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`;

      this.$http.get(api).then((res) => {
        if (res.data.success) {
          // console.log(res.data);
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        }
      });
    },
    getCarts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;

      this.$http.get(api).then((res) => {
        if (res.data.success) {
          // console.log(res.data.data);
          this.tempcarts = { ...res.data.data };
        }
      });
    },
    AddCart(id) {
      this.status.loadingItem = id;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = { product_id: id, qty: 1 };

      this.$http.post(api, { data: cart }).then((res) => {
        if (res.data.success) {
          // console.log(res.data);
          this.status.loadingItem = '';
          this.getCarts();
        }
      });
    },
    UpdateCart(item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };
      // console.log(cart);
      this.$http.put(api, { data: cart }).then((res) => {
        if (res.data.success) {
          // console.log(res.data);
          this.getCarts();
        } else {
          console.log(res.data);
        }
      });
    },
    delCart(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;

      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          // console.log(res.data);
          this.getCarts();
        }
      });
    },
    getProduct(id) {
      this.$router.push(`/user/product/${id}`);
    },
    openUserCartModal() {
      this.getCarts();
      this.$refs.usercartmodal.showModal();
    },
  },
  created() {
    this.getProducts();
  },
});
</script>
