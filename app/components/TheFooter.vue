<!-- components/TheFooter.vue -->
<template>
  <UFooter class="border-t border-gray-200 py-12 bg-linear-to-t from-amber-50 to-transparent">
    <template #left>
      <p class="text-md text-gray-600 dark:text-gray-400">
        Made with ♥️ in St. George, Utah • © {{ new Date().getFullYear() }} Cottage Bowls 🇺🇸
      </p>
    </template>

    <template #right>
      <div class="flex items-center justify-center gap-4">
        <UButton
          to="https://x.com/cottagebowls"
          target="_blank"
          icon="i-simple-icons-x"
          color="neutral"
          variant="ghost"
          size="lg"
          aria-label="Follow on X"
        />
        <UButton
          to="https://instagram.com/cottagebowls"
          target="_blank"
          icon="i-simple-icons-instagram"
          color="neutral"
          variant="ghost"
          size="lg"
          aria-label="Follow on Instagram"
        />
      </div>
    </template>
  </UFooter>
</template>
