import store from '../store';

export function useDiscounts() {
  return {
    getDiscounts,
  };

  async function getDiscounts() {
    await store.dispatch('getDiscountsAction');
  }
}
