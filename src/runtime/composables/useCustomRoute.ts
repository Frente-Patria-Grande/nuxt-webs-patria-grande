import {computed, useRoute} from "#imports";

export const useCustomRoute = () => {
  const customRoute = computed(() => useRoute().query.customRoute)

  return customRoute
}
