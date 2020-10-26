<script lang="ts">
import { toRefs, defineComponent, onMounted, reactive, computed } from 'vue';
import ListHeader from '@/components/list-header.vue';
import { useDiscounts } from '../composables/use-discounts';
import { Discount } from '../store/modules/models';
import store from '../store';

export interface ComponentState {
  errorMessage: string;
  discounts: Discount[];
}

export default defineComponent({
  name: 'Discounts',
  components: { ListHeader },
  setup() {
    const state: ComponentState = reactive({
      errorMessage: '',
      discounts: computed(() => store.getters.discounts),
    });

    const { getDiscounts } = useDiscounts();

    onMounted(async () => {
      state.errorMessage = '';
      try {
        await getDiscounts();
      } catch (error) {
        console.error(error);
        state.errorMessage = 'Unauthorized';
      }
    });

    return {
      ...toRefs(state),
      getDiscounts,
    };
  },
});
</script>

<template>
  <div class="container columns">
    <div v-if="discounts" class="column is-8">
      <ListHeader
        title="My Discounts"
        @refresh="getDiscounts"
        :showAdd="false"
      ></ListHeader>
      <div v-if="errorMessage">{{ errorMessage }}</div>
      <div v-if="!discounts.length && !errorMessage">Loading data ...</div>
      <ul class="list">
        <li
          role="presentation"
          v-for="discount in discounts"
          :key="discount.id"
        >
          <div class="card">
            <div class="card-content">
              <div class="content discount-grid">
                <label>Store:</label><span>{{ discount.store }}</span>
                <label>Discount:</label><span>{{ discount.percentage }}%</span>
                <label>Code:</label><span>{{ discount.code }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
