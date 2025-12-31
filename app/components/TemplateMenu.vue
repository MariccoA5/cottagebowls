<template>
  <UHeader class="border-b">
    <template #logo>
      <NuxtLink to="/">
        <img src="/images/futurecottage.jpeg" alt="Cottage Bowls" class="h-10" />
      </NuxtLink>
    </template>
    <template #right>
      <UNavigationLinks :links="[
        { label: 'Home', to: '/' },
        { label: 'Drops', to: '/drops' },
        { label: 'Order', to: '/order' }
      ]" />
    </template>
  </UHeader>
</template>
