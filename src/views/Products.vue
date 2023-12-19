<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable max-len -->
<template>
  <div class="text-end">
    <button class="btn btn-primary" @click="openProductsModal(true)">新增產品</button>
  </div>
  <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ $filters.currency(item.origin_price) }}
          </td>
          <td class="text-right">
            {{ $filters.currency(item.price) }}
          </td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-muted" v-else>不啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openProductsModal(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm"
                @click="deleteproducts(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
  </table>
  <Pagination :pages="pagination" @emit-page="getproducts"></Pagination>
  <ProductModal ref="productmodal" :product="tempproducts"
  @update-product="updatedProducts"></ProductModal>
</template>

<script>
import ProductModal from '../components/ProductModal.vue';
import Pagination from '../components/Pagination.vue';

export default ({
  data() {
    return {
      products: [],
      pagination: {},
      tempproducts: {},
      IsNew: false,
    };
  },
  components: {
    ProductModal,
    Pagination,
  },
  methods: {
    getproducts(page = 1) {
      // console.log(page);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`;

      this.$http.get(api).then((res) => {
        if (res.data.success) {
          console.log(res.data.products);
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        }
      });
    },
    openProductsModal(isNew, item) {
      if (isNew) {
        this.tempproducts = { fileName: null };
      } else {
        this.tempproducts = { ...item, fileName: null };
      }
      this.isNew = isNew;
      this.$refs.productmodal.showModal();
    },
    updatedProducts(item) {
      this.tempproducts = item;

      let api = '';
      let httpMethod = '';
      let confirmText = '';

      if (this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
        httpMethod = 'post';
        confirmText = '確認是否新增!!!';
      } else {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
        confirmText = '確認是否修改!!!';
      }

      // eslint-disable-next-line no-alert
      const userConfirmed = window.confirm(confirmText);

      if (userConfirmed) {
        this.$refs.productmodal.ButtonDisabled(true);
        this.$http[httpMethod](api, { data: this.tempproducts }).then((res) => {
          if (res.data.success) {
            if (this.isNew) {
              this.getproducts();
            } else {
              const index = this.products.findIndex((Qitem) => Qitem.id === item.id);
              if (index !== -1) {
                this.products[index] = { ...item };
              }
            }

            this.$refs.productmodal.hidModal();
            this.$refs.productmodal.ButtonDisabled(false);
          }
        });
      }
    },
    deleteproducts(item) {
      // eslint-disable-next-line no-alert
      const userConfirmed = window.confirm('確認是否刪除!!!');

      if (userConfirmed) {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        // console.log(api);
        this.$http.delete(api).then((res) => {
          if (res.data.success) {
            this.products = this.products.filter((Qitem) => Qitem.id !== item.id);
          }
        });
      }
    },
  },
  created() {
    this.getproducts();
  },
});
</script>
