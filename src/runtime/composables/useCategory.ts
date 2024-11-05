import { ref, useFetch } from '#imports'

export const useCategory = async (categoryName, fetchOptions) => {
  const data = ref(null)
  const error = ref(null)

  const encodedName = encodeURI(categoryName)
  const { data: fetchedData, error: fetchError } = await useFetch(`/ah-api/categories/${encodedName}`, fetchOptions)

  data.value = fetchedData.value
  error.value = fetchError.value

  return { data, error }
}
