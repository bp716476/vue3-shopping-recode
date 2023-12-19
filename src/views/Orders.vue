<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="text-end">
    <button class="btn btn-primary">新增產品</button>
  </div>
  <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">購買時間</th>
          <th>Email</th>
          <th width="120">購買款項</th>
          <th width="120">應付金額</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="orderItem in orderList" :key="orderItem.id">
          <td>{{ $filter.data(orderItem.create_at) }}</td>
          <td>{{ orderItem.user.email }}</td>
          <td class="text-right">
          </td>
          <td class="text-right">
            {{ $filter.currency(orderItem.total) }}
          </td>
          <td>
            <div class="form-check form-switch" id="ckeckitem">
              <input type="checkbox" class="form-check-input"
              v-model="orderItem.is_paid">
              <label class="form-check-label" id="ckeckname">
                <span v-if="orderItem.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm">編輯</button>
              <button class="btn btn-outline-danger btn-sm">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
  </table>
  <!-- <Pagination :pages="pagination" @emit-page="getproducts"></Pagination>
  <ProductModal ref="productmodal" :product="tempproducts"
  @update-product="updatedProducts"></ProductModal> -->
</template>

<script>
export default ({
  data() {
    return {
      orderList: [],
      pagination: {},
    };
  },
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders/?page=${page}`;

      this.$http.get(api).then((res) => {
        if (res.data.success) {
          console.log(res.data);
          this.orderList = res.data.orders;
          this.pagination = res.data.pagination;
        }
      });
    },
  },
  created() {
    this.getOrders();
  },
});
</script>
