<!-- components/TheHeader.vue -->
<template>
  <UHeader class="sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50" :ui="{ container: 'py-4' }">
    <template #left>
      <NuxtLink to="/" class="flex items-center gap-4">
        <img src="/images/logosmall.png" alt="Cottage Bowls" class="h-20 w-auto" />
        <span class="text-2xl font-bold text-amber-700 dark:text-amber-500 hidden md:block">
          Cottage Bowls
        </span>
      </NuxtLink>
    </template>

    <template #right>
      <div class="flex items-center gap-6">
        <!-- Centered Nav Links (moved here with flex-grow to push them center) -->
        <nav class="hidden lg:flex flex-grow justify-center gap-8 text-base">
          <NuxtLink to="/about" class="text-gray-700 hover:text-amber-700 dark:hover:text-amber-500 font-medium">
            About
          </NuxtLink>
          <NuxtLink to="/investor" class="text-gray-700 hover:text-amber-700 dark:hover:text-amber-500 font-medium">
            Support
          </NuxtLink>
        </nav>

        <!-- Order Now Button + Dark Mode -->
        <UButton
          to="/drops"
          color="primary"
          size="lg"
          label="Order Now"
          class="font-semibold px-8"
        />
      </div>
    </template>
  </UHeader>
</template>
