import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherDetailsItem',

  props: {
    sender: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },

  template: `
    <div class="weather-alert">
        <span class="weather-alert__icon">⚠️</span>
        <span class="weather-alert__description">{{ sender }}: {{ message }}</span>
    </div>
  `,
})