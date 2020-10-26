<script lang="ts">
import { defineComponent, onMounted, toRefs } from 'vue';
import ListHeader from '@/components/list-header.vue';
import Modal from '@/components/modal.vue';
import ProductDetail from '@/views/products/product-detail.vue';
import ProductList from '@/views/products/product-list.vue';
import { useProducts } from './use-products';

export default defineComponent({
  name: 'Products',
  components: {
    ListHeader,
    ProductList,
    ProductDetail,
    Modal,
  },

  setup() {
    const {
      askToDelete,
      clear,
      closeModal,
      deleteProduct,
      enableAddMode,
      getProducts,
      save,
      select,
      state,
    } = useProducts();

    onMounted(async () => getProducts());

    return {
      ...toRefs(state),
      askToDelete,
      clear,
      closeModal,
      deleteProduct,
      enableAddMode,
      getProducts,
      save,
      select,
    };
  },
});
</script>

<template>
  <div class="content-container">
    <ListHeader
      :title="title"
      @refresh="getProducts"
      @add="enableAddMode"
      :routePath="routePath"
    ></ListHeader>
    <div class="columns is-multiline is-variable">
      <div class="column is-8" v-if="products">
        <ProductList
          v-if="!selected"
          :products="products"
          :errorMessage="errorMessage"
          @selected="select($event)"
          @deleted="askToDelete($event)"
        ></ProductList>
        <ProductDetail
          v-if="selected"
          :product="selected"
          @unselect="clear"
          @save="save"
        ></ProductDetail>
      </div>
    </div>

    <Modal
      class="modal-product"
      :message="message"
      :isOpen="showModal"
      @handle-no="closeModal"
      @handle-yes="deleteProduct"
    ></Modal>
  </div>
</template>
