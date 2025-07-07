import { defineComponent, computed } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    min: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  setup(props, { emit }) {
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне
    const counter = computed({
      get() {
        return props.count
      },
      set(value) {
        emit('update:count', value)
      },
    })

    function increment() {
      counter.value++
    }

    function decrement() {
      counter.value--
    }

    return {
      counter,
      increment,
      decrement,
    }
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" @click="decrement" :disabled="counter <= min">➖</UiButton>
      <span class="count" data-testid="count">{{ counter }}</span>
      <UiButton aria-label="Increment" @click="increment" :disabled="counter >= max">➕</UiButton>
    </div>
  `,
})
