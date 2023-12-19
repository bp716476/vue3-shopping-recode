<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- <Loading :active="isLoading"></Loading> -->
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click.prevent="openCouponModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
      <tr>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, key) in coupons" :key="key">
        <td>{{ item.title }}</td>
        <td>{{ item.percent }}%</td>
        <td>{{ $filters.TimestampToDate(item.due_date) }}</td>
        <td>
          <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
          <span v-else class="text-muted">未起用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm"
            @click.prevent="openCouponModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm"
            @click.prevent="deleteCoupon(item)">刪除</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @emit-page="getCoupons"></Pagination>
    <couponModal :coupon="tempCoupons" ref="couponModal"
    @update-coupon="updateCoupon"/>
    <!--<DelModal :item="tempCoupon" ref="delModal" @del-item="delCoupon"/> -->
  </div>
</template>

<script>
import CouponModal from '../components/CouponModal.vue';
import Pagination from '../components/Pagination.vue';

export default ({
  data() {
    return {
      coupons: [],
      tempCoupons: {},
      saveCoupons: {},
      pagination: {},
      IsNew: true,
    };
  },
  components: {
    CouponModal,
    Pagination,
  },
  methods: {
    getCoupons(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons/?page=${page}`;

      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.coupons = res.data.coupons;
          this.pagination = res.data.pagination;
        }
      });
    },
    openCouponModal(isNew, item) {
      if (isNew) {
        this.tempCoupon = {};
      } else {
        this.tempCoupons = { ...item };
        const localDate = new Date(this.tempCoupons.due_date * 1000).toISOString().split('T')[0];
        this.tempCoupons.due_date = localDate;
      }
      this.IsNew = isNew;
      this.$refs.couponModal.showModal();
    },
    updateCoupon(item) {
      this.tempCoupons = item;
      this.tempCoupons.due_date = Math.floor(new Date(this.tempCoupons.due_date) / 1000);

      let api = '';
      let httpMethod = '';

      if (this.IsNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
        httpMethod = 'post';
      } else {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, { data: this.tempCoupons }).then((res) => {
        if (res.data.success) {
          if (this.IsNew) {
            this.getCoupons();
          } else {
            const index = this.coupons.findIndex((Qitem) => Qitem.id === item.id);
            if (index !== -1) {
              this.coupons[index] = { ...item };
            }
          }
          this.$refs.couponModal.hidModal();
        } else {
          console.log(res.data);
        }
      });
    },
    deleteCoupon(item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          this.coupons = this.coupons.filter((Qitem) => Qitem.id !== item.id);
        }
      });
    },
  },
  created() {
    this.getCoupons();
  },
});
</script>
