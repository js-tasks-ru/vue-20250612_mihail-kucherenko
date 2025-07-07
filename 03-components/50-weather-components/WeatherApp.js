import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'
import WeatherDetailsItem from './WeatherDetailsItem.js'
import Alert from './Alert.js'

export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherDetailsItem,
    Alert
  },

  setup() {
    return {
      WeatherData: getWeatherData(),
      WeatherConditionIcons: WeatherConditionIcons,
      isNight(obj) {
        const currentTimeArray = obj.dt.split(':')
        const sunriseArray = obj.sunrise.split(':')
        const sunsetArray = obj.sunset.split(':')
        if ((currentTimeArray[0] > sunriseArray[0] && currentTimeArray[0] < sunsetArray[0]) 
            || (currentTimeArray[0] === sunriseArray[0] && currentTimeArray[1] >= sunriseArray[1]) 
            || (currentTimeArray[0] === sunsetArray[0] && currentTimeArray[1] <= sunsetArray[1])
        ) return false
        else return true
      }
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="place in WeatherData" :class="['weather-card', {'weather-card--night': isNight(place.current)}]">
          <Alert v-if="place.alert" :sender="place.alert.sender_name" :message="place.alert.description" />
          <div>
            <h2 class="weather-card__name">
              {{ place.geographic_name }}
            </h2>
          <div class="weather-card__time">
            {{ place.current.dt }}
          </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="place.current.weather.description">{{ WeatherConditionIcons[place.current.weather.id] }}</div>
            <div class="weather-conditions__temp">{{ (place.current.temp - 273.15).toFixed(1) }} °C</div>
          </div>
          <div class="weather-details">
            <WeatherDetailsItem label="Давление, мм рт. ст." :value="(place.current.pressure * .75).toFixed()" />
            <WeatherDetailsItem label="Влажность, %" :value="place.current.humidity" />
            <WeatherDetailsItem label="Облачность, %" :value="place.current.clouds" />
            <WeatherDetailsItem label="Ветер, м/с" :value="place.current.wind_speed" />
          </div>
        </li>
      </ul>
    </div>
  `,
})