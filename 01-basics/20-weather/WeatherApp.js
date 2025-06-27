import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

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
          <div v-if="place.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ place.alert.sender_name }}: {{ place.alert.description }}</span>
          </div>
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
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ (place.current.pressure * .75).toFixed() }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ place.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ place.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ place.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
