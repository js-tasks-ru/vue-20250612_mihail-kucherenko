import { computed, defineComponent, ref } from 'vue'

// Значения взяты из https://jsonplaceholder.typicode.com/comments
export const emails = [
  'Eliseo@gardner.biz',
  'Jayne_Kuhic@sydney.com',
  'Nikita@garfield.biz',
  'Lew@alysha.tv',
  'Hayden@althea.biz',
  'Presley.Mueller@myrl.com',
  'Dallas@ole.me',
  'Mallory_Kunze@marie.org',
  'Meghan_Littel@rene.us',
  'Carmen_Keeling@caroline.name',
  'Veronica_Goodwin@timmothy.net',
  'Oswald.Vandervort@leanne.org',
  'Kariane@jadyn.tv',
  'Nathan@solon.io',
  'Maynard.Hodkiewicz@roberta.com',
  'Christine@ayana.info',
  'Preston_Hudson@blaise.tv',
  'Vincenza_Klocko@albertha.name',
  'Madelynn.Gorczany@darion.biz',
  'Mariana_Orn@preston.org',
  'Noemie@marques.me',
  'Khalil@emile.co.uk',
  'Sophia@arianna.co.uk',
  'Jeffery@juwan.us',
  'Isaias_Kuhic@jarrett.net',
]

export default defineComponent({
  name: 'MarkedEmailsApp',

  setup() {
    const query = ref(' ')

    const markedEmails = computed(() => {
      return emails.map(function(email) {
        return (query.value && email.toLowerCase().includes(query.value.toLowerCase())) ? { marked: true, value: email } : { marked: false, value: email }
      })
    })

    return {
      query,
      markedEmails
    }
  },

  template: `
    <div>
      <div class="form-group">
        <input type="search" @input="query = $event.target.value" aria-label="Search" />
        <!-- <input type="search" v-model="query" aria-label="Search for email" />-->
      </div>
      <ul aria-label="Emails">
        <li v-for="email in markedEmails" :class="{ marked: email.marked }">
          {{ email.value }}
        </li>
      </ul>
    </div>
  `,
})
