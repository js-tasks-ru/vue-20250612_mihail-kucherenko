import {defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const first = ref(0)
    const second = ref(0)
    const operator = ref('sum')
    const result = computed(() => {
      switch (operator.value) {
        case 'sum':
          return first.value + second.value
        case 'subtract':
          return first.value - second.value
        case 'multiply':
          return first.value * second.value
        case 'divide':
          return first.value / second.value
      }
    })

    return {
      first,
      second,
      operator,
      result
    }
  },

  template: `
    <div class="calculator">
      <input type="number" v-model="first" aria-label="First operand" />

      <div class="calculator__operators">
        <label><input type="radio" name="operator" value="sum" v-model="operator"/>➕</label>
        <label><input type="radio" name="operator" value="subtract" v-model="operator"/>➖</label>
        <label><input type="radio" name="operator" value="multiply" v-model="operator"/>✖</label>
        <label><input type="radio" name="operator" value="divide" v-model="operator"/>➗</label>
      </div>

      <input type="number" v-model="second" aria-label="Second operand" />

      <div>=</div>

      <output>{{result}}</output>
    </div>
  `,
})
