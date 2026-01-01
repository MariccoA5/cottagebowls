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
          class="h-32 w-auto"
        >
        <span class="text-2xl font-bold text-amber-700 hidden md:block">
          Cottage Bowls
        </span>
      </NuxtLink>
    </template>

    <!-- Default slot (center): desktop navigation, auto-hidden on mobile -->
    <nav class="hidden lg:flex items-center justify-center flex-grow gap-8 text-base">
      <NuxtLink
        to="/"
        class="text-gray-700 hover:text-amber-700 font-medium"
      >
        Home
      </NuxtLink>
      <NuxtLink
        to="/drops"
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
        to="/investor"
        class="text-gray-700 hover:text-amber-700 font-medium"
      >
        Support
      </NuxtLink>
    </nav>

    <template #right>
      <UButton
        to="/order"
        color="primary"
        size="lg"
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
          to="/drops"
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
          to="/investor"
          class="text-gray-700 hover:text-amber-700 font-medium"
        >
          Support
        </NuxtLink>
      </nav>
    </template>
  </UHeader>
</template>
