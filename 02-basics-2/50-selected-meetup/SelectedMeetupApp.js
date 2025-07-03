import { computed, defineComponent, ref, watchEffect } from 'vue'
import { getMeetup } from './meetupsService.ts'
import { get } from '@vueuse/core'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const selectedMeetupId = ref(1)

    const meetup = ref({})
    
    // Получить данные митапа по его ID
    watchEffect(() => {
      getMeetup(selectedMeetupId.value).then(res => {
        meetup.value = res
      })
    })

    return {
      selectedMeetupId,
      meetup,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button 
                button--secondary" 
                type="button" 
                :disabled="selectedMeetupId === 1" 
                @click="selectedMeetupId--"
        >
          Предыдущий
        </button>

        <div class="radio-group" role="radiogroup">
          <div v-for="meetupId in 5" class="radio-group__button">
            <input
              :id="'meetup-id-' + meetupId"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :checked="selectedMeetupId === meetupId"
              :value="meetupId"
              v-model="selectedMeetupId"
            />
            <label :for="'meetup-id-' + meetupId" class="radio-group__label">{{ meetupId }}</label>
          </div>
          <!--
          <div class="radio-group__button">
            <input
              id="meetup-id-2"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="2"
              v-model="selectedMeetup"
            />
            <label for="meetup-id-2" class="radio-group__label">2</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-3"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="3"
              v-model="selectedMeetup"
            />
            <label for="meetup-id-3" class="radio-group__label">3</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-4"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="4"
              v-model="selectedMeetup"
            />
            <label for="meetup-id-4" class="radio-group__label">4</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-5"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="5"
              v-model="selectedMeetup"
            />
            <label for="meetup-id-5" class="radio-group__label">5</label>
          </div>
          -->
        </div>

        <button class="button button--secondary" 
                type="button" 
                :disabled="selectedMeetupId === 5" 
                @click="selectedMeetupId++"
        >
          Следующий
        </button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ meetup.title }}</h1>
        </div>
      </div>

    </div>
  `,
})
