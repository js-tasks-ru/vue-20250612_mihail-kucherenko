import { defineComponent, createApp } from 'vue'

const app = createApp(defineComponent({
  name: 'CurrentDate',
  setup() {
    return {
        currentDate: new Date().toLocaleDateString(navigator.language, {dateStyle: 'long'})
    }
  },

  template: `<div>Сегодня {{ currentDate }}</div>`
}))

app.mount('#app')