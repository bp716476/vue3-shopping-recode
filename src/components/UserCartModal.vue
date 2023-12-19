<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>購物車</span>
          </h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 110px;">數量</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in Cart.carts" :key="item.id">
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm"
                  @click.prevent="$emit('delete-cart', item.id)">刪除</button>
                </td>
                <td>{{ item.product.title }}</td>
                <td>
                  <div class="input-group input-group-sm">
                    <input type="number" class="form-control"
                      @change="$emit('update-cart', item)"
                      min="1" v-model="item.qty">
                    <div class="input-group-text">/ {{ item.product.unit }}</div>
                  </div>
                </td>
                <td>{{ $filters.currency(item.product.price) }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end">{{ $filters.currency(this.Cart.total) }}</td>
              </tr>
              <tr>
                <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">
                  {{ $filters.currency(this.Cart.final_total) }}</td>
              </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm" width="50px">
          <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="CouponCode">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click.prevent="addCouponCode">
              套用優惠碼
            </button>
          </div>
          </div>
          <!-- <td class="my-5 row justify-content">
            <form class="col-md-6" @submit="CresteOrder"></form>

          </td> -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary"
                  data-bs-dismiss="modal">取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalMixins from '@/Mixins/ModalMixins';

export default ({
  props: {
    cart: {
      type: Object,
      default() { return {}; },
    },
  },
  watch: {
    cart() {
      // console.log(this.cart);
      this.Cart = this.cart;
    },
  },
  data() {
    return {
      Cart: [],
      CouponCode: '',
    };
  },
  methods: {
    addCouponCode() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      const Coupon = { code: this.CouponCode };

      this.$http.post(api, { data: Coupon }).then((res) => {
        if (res.data.success) {
          this.Cart.final_total = res.data.data.final_total;
        }
      });
    },
    // CresteOrder() {

    // },
  },
  mixins: [ModalMixins],
});
</script>
