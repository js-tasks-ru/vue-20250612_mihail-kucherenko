import { defineComponent, onBeforeMount, onUnmounted, ref } from 'vue'

function getTime() {
  return new Date().toLocaleTimeString(navigator.language, { timeStyle: 'medium' })
}
  
export default defineComponent({
  name: 'UiClock',

  setup() {
    const time = ref(getTime())
    let timer = null

    function updateTime() {
      time.value = getTime()
    }

    onBeforeMount(() => {
      timer = setInterval(updateTime, 1000)
    })

    onUnmounted(() => {
      clearInterval(timer)
    })

    return {
      time,
    }
  },

  template: `<div class="clock">{{ time }}</div>`,
})
