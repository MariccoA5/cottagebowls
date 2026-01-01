<!-- components/TheFooter.vue -->
<template>
  <UFooter class="border-t border-gray-200 dark:border-gray-800 py-12 bg-linear-to-t from-amber-50 to-transparent dark:from-gray-900">
    <template #left>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Built with ☀️ in St. George, Utah • © {{ new Date().getFullYear() }} Cottage Bowls 🇺🇸
      </p>
    </template>

    <template #center>
      <div class="flex items-center justify-center gap-8">
        <UButton
          to="https://x.com/yourusername"
          target="_blank"
          icon="i-simple-icons-x"
          color="neutral"
          variant="ghost"
          size="lg"
          aria-label="Follow on X"
        />
        <UButton
          to="https://instagram.com/yourusername"
          target="_blank"
          icon="i-simple-icons-instagram"
          color="neutral"
          variant="ghost"
          size="lg"
          aria-label="Follow on Instagram"
        />
      </div>
    </template>

    <template #right>
      <p class="text-sm text-gray-500 dark:text-gray-500">
        Fresh bowls, happy souls 🇺🇸
      </p>
    </template>
  </UFooter>
</template>
