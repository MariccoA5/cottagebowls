<template>
  <UHeader
    class="sticky top-0 z-50 border-b border-gray-200"
    :ui="{ container: 'py-4' }"
  >
    <template #left>
      <NuxtLink
        to="/"
        class="flex items-center gap-4"
      >
        <img
          src="/images/logosmall.png"
          alt="Cottage Bowls"
          class="h-20 w-auto"
        >
        <span class="text-2xl font-bold text-amber-700 hover:text-amber-900 hidden md:block">
          Cottage Bowls
        </span>
      </NuxtLink>
    </template>

    <template #right>
      <nav class="hidden lg:flex items-center justify-center px-4 gap-4 text-base">
        <NuxtLink
          to="/"
          class="hidden text-gray-700 hover:text-amber-700 font-medium"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="text-gray-700 hover:text-amber-700 font-medium"
        >
          About
        </NuxtLink>
        <NuxtLink
          to="/support"
          class="text-gray-700 hover:text-amber-700 font-medium"
        >
          Support
        </NuxtLink>
      </nav>
      <UButton
        to="/locations"
        color="primary"
        size="xl"
        label="Order Now"
        class="font-medium"
      />
    </template>

    <!-- Body slot: mobile menu content (vertical nav) -->
    <template #body>
      <nav class="flex flex-col gap-4 text-base px-4 py-2">
        <NuxtLink
          to="/"
          class="text-gray-700 hover:text-amber-700 font-medium"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/locations"
          class="text-gray-700 hover:text-amber-700 font-medium"
        >
          Drop-Offs
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="text-gray-700 hover:text-amber-700 font-medium"
        >
          About
        </NuxtLink>
        <NuxtLink
          to="/support"
          class="text-gray-700 hover:text-amber-700 font-medium"
        >
          Support
        </NuxtLink>
      </nav>
    </template>
  </UHeader>
</template>
