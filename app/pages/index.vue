<!-- app/pages/index.vue -->
<template>
  <div>
    <!-- Hero Section with Background Image -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Image (replace with your Grok image path) -->
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: 'url(/images/hero-bowl3.png)' }"
      />

      <!-- Dark overlay for text readability -->
      <div class="absolute inset-0 bg-black/40" />

      <!-- Content -->
      <UContainer class="relative z-10 text-center py-20">
        <!-- <img
          src="/images/logosmall.png"
          alt="Cottage Bowls"
          class="mx-auto w-80 md:w-96 mb-10 drop-shadow-2xl"
        /> -->
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Fresh Cottage Bowls ☀️🥣
        </h1>
        <p class="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-12 drop-shadow-md">
          High-protein, customizable bowls made fresh daily in St. George, Utah
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center">
          <UButton
            to="/locations"
            size="xl"
            color="primary"
            class="px-12 py-6 text-lg font-medium shadow-lg"
          >
            View Pickup Locations
          </UButton>
        </div>
      </UContainer>
    </section>

    <!-- Features Preview -->
    <section class="py-20 bg-white">
      <UContainer>
        <h2 class="text-4xl font-bold text-amber-800 text-center mb-12">
          Why Cottage Bowls?
        </h2>
        <div class="grid md:grid-cols-3 gap-12">
          <div class="text-center">
            <div class="text-6xl mb-4">
              🥗
            </div>
            <h3 class="text-2xl font-semibold text-gray-800 mb-3">
              Fresh & Healthy
            </h3>
            <p class="text-gray-600">
              High-protein cottage cheese with premium toppings
            </p>
          </div>
          <div class="text-center">
            <div class="text-6xl mb-4">
              ☀️
            </div>
            <h3 class="text-2xl font-semibold text-gray-800 mb-3">
              Made with Sunshine
            </h3>
            <p class="text-gray-600">
              Crafted daily in beautiful St. George
            </p>
          </div>
          <div class="text-center">
            <div class="text-6xl mb-4">
              🚶‍♂️
            </div>
            <h3 class="text-2xl font-semibold text-gray-800 mb-3">
              Easy Pickup
            </h3>
            <p class="text-gray-600">
              Meet us at local spots — no delivery fees
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Bowl Preview — Fixed -->
    <section class="py-20 bg-linear-to-r from-amber-50 to-sky-50">
      <UContainer>
        <h2 class="text-4xl font-bold text-amber-800 text-center mb-12">
          Build Your Perfect Bowl
        </h2>
        <div class="flex items-center justify-center gap-12 max-w-5xl mx-auto">
          <img
            src="/images/banana1.jpeg"
            alt="Banana Bowl"
            class="rounded-3xl shadow-2xl object-cover h-80"
          >
          <img
            src="/images/strawberry3.jpeg"
            alt="Strawberry Bowl"
            class="rounded-3xl shadow-2xl object-cover h-80"
          >
        </div>
        <div class="text-center mt-12">
          <UButton
            to="/location"
            size="xl"
            color="primary"
            class="px-12 py-6 text-lg"
          >
            Start Your Order
          </UButton>
        </div>
      </UContainer>
    </section>
  </div>
</template>
