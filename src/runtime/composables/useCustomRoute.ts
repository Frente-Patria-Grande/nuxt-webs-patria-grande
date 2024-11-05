import { computed, useRoute } from '#imports'

export const useCustomRoute = () => {
  return computed(() => useRoute().query.customRoute)
}
