import Modal from 'bootstrap/js/dist/modal';

export default ({
  methods: {
    showModal() {
      this.modal.show();
    },
    hidModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal, Option);
  },
});
