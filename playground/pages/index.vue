<template>
  <div class="flex flex-col gap-12">
    <span>error: {{ error || 'n' }}</span>
    <div v-for="post in indexCategory?.posts">
      <a
        :href="post.url"
        class="text-2xl font-bold tracking-tight"
      >
        {{ post.title }}
      </a>
    </div>
  </div>
</template>

<script setup>
const { data: indexCategory, error } = await useCategory('Inicio')
</script>
