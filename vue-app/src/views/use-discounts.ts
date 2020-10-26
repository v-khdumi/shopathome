import { Discount } from '@/store/modules/models';
import { computed, reactive } from 'vue';
import store from '../store';

export interface DiscountsComponentState {
  errorMessage: string;
  discounts: Discount[];
}

export function useDiscounts() {
  const state: DiscountsComponentState = reactive({
    errorMessage: '',
    discounts: computed(() => store.getters.discounts),
  });

  return {
    getDiscounts,
    state,
  };

  async function getDiscounts() {
    state.errorMessage = '';
    try {
      await store.dispatch('getDiscountsAction');
    } catch (error) {
      console.error(error);
      state.errorMessage = 'Unauthorized';
    }
  }
}
