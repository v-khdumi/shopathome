import { Product } from '@/store/modules/models';
import { computed, reactive } from 'vue';
import store from '../../store';

const captains = console;

interface ProductsComponentState {
  errorMessage: string;
  message: string;
  productToDelete: Product | null;
  routePath: string;
  selected: Product | null;
  showModal: boolean;
  title: string;
  products: Product[];
}

export function useProducts() {
  const state: ProductsComponentState = reactive({
    errorMessage: '',
    message: '',
    productToDelete: null,
    routePath: '/products',
    selected: null,
    showModal: false,
    title: 'My List',
    products: computed(() => store.getters.products as Product[]),
  });

  return {
    askToDelete,
    clear,
    closeModal,
    deleteProduct,
    enableAddMode,
    getProducts,
    save,
    select,
    state,
  };

  function askToDelete(p: Product) {
    state.productToDelete = p;
    state.showModal = true;
    if (state.productToDelete.name) {
      state.message = `Would you like to delete ${state.productToDelete.name}?`;
      captains.log(state.message);
    }
  }

  function clear() {
    state.productToDelete = null;
    state.selected = null;
    state.message = '';
  }

  function closeModal() {
    state.showModal = false;
  }

  async function deleteProduct() {
    closeModal();
    if (state.productToDelete) {
      captains.log(`You said you want to delete ${state.productToDelete.name}`);
      await store.dispatch('deleteProductAction', state.productToDelete);
    }
    clear();
  }

  function enableAddMode() {
    state.selected = new Product(0);
  }

  // create a js module that handles all saving activity
  // save, delete, add => in the module
  // useSavingProducts(state);
  async function save(p: Product) {
    captains.log('product changed', p);
    if (p.id) {
      await store.dispatch('updateProductAction', p);
    } else {
      await store.dispatch('addProductAction', p);
    }
  }

  function select(p: Product) {
    state.selected = p;
  }
  async function getProducts() {
    state.errorMessage = '';
    try {
      await store.dispatch('getProductsAction');
    } catch (error) {
      console.error(error);
      state.errorMessage = 'Unauthorized';
    }
  }
}
