<script setup lang="ts">
import { computed } from 'vue';

// Вместо <span> должен быть <RouterLink> или <a>
// Используйте динамический компонент <component :is="...">
const props = defineProps<{
  to?: string | object,
  href?: string,
}>()

const linkType = computed(() => {
  if (props.to) return 'RouterLink'
  else return 'a'
})
</script>

<template>
  <component :is="linkType" v-bind="props" class="link" tabindex="0">
    <slot />
  </component>
</template>

<style scoped>
.link {
  color: var(--color-text-primary);
}

.link:hover {
  text-decoration: underline;
}
</style>
