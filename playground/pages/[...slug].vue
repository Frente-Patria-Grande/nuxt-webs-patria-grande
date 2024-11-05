<template>
  <div class="flex flex-col text-ah-blue-500">
    Hey
    <div
      class="mt-12 max-w-3xl mx-auto w-full"
      v-html="post.body"
    />
  </div>
</template>

<script setup>
const customRoute = useCustomRoute()
const post = customRoute.value.post

if (!customRoute.value) {
  throw createError({
    statusCode: 404,
  })
}
</script>
