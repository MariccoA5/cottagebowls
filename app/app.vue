<script setup lang="ts">
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/images/logosmall.png' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title: 'Cottage Bowls — Fresh High-Protein Bowls in St. George',
  description: 'Custom cottage cheese bowls with fresh toppings. Daily pickup in St. George, UT. Healthy, delicious, made with sunshine ☀️',
  ogTitle: 'Cottage Bowls',
  ogDescription: 'Fresh, high-protein cottage cheese bowls — pickup daily in St. George',
  ogImage: '/images/logosmall.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <TheHeader />

    <UMain>
      <!-- Current page content -->
      <NuxtPage />
    </UMain>

    <TheFooter />
  </UApp>
</template>
