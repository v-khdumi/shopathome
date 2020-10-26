import store from '@/store';
import { Product } from '@/store/modules/models';

export function useProducts() {
  return {
    deleteProductAction,
    getProductsAction,
    updateProductAction,
    addProductAction,
  };

  async function deleteProductAction(product: Product) {
    await store.dispatch('deleteProductAction', product);
  }

  async function getProductsAction() {
    await store.dispatch('getProductsAction');
  }

  async function updateProductAction(product: Product) {
    await store.dispatch('updateProductAction', product);
  }

  async function addProductAction(product: Product) {
    await store.dispatch('addProductAction', product);
  }
}
