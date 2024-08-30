<template>
  <div class="flex flex-col gap-12">
    <div v-for="post in indexCategory?.posts">
      <h2 class="text-2xl font-bold tracking-tight">
        {{ post.title }}
      </h2>
    </div>
  </div>
</template>

<script setup>
const response = await useFetch(`/ah-api/categories/Inicio`);
const indexCategory = response?.data;
</script>
