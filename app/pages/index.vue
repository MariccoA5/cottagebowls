<!-- app/pages/index.vue -->
<script setup lang="ts">
const waitlistEmail = ref('')
const waitlistLoading = ref(false)
const waitlistMessage = ref('')

async function joinWaitlist() {
  if (!waitlistEmail.value) {
    waitlistMessage.value = 'Please enter your email to join the list.'
    return
  }

  waitlistLoading.value = true
  waitlistMessage.value = ''

  try {
    await $fetch('/api/waitlist', {
      method: 'POST',
      body: {
        email: waitlistEmail.value,
        source: 'landing-page'
      }
    })

    waitlistMessage.value = 'You\'re on the list! We\'ll share new flavors, drops, and rewards soon.'
    waitlistEmail.value = ''
  } catch (error) {
    console.error('Waitlist signup failed', error)
    waitlistMessage.value = 'Something went wrong. Please try again in a moment.'
  } finally {
    waitlistLoading.value = false
  }
}
</script>

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
          Naturally Sweetend, Cottage Cheese Bowls ☀️🥣
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

    <!-- Grand Opening Banner -->
    <section class="bg-red-50 border-y border-red-200">
      <div class="grand-opening-marquee py-3">
        <div class="grand-opening-marquee__inner text-red-800 text-xs sm:text-sm font-semibold uppercase tracking-wide">
          <span>Grand Opening Phase · Limited Pickup Spots · Fresh Bowls Made Daily in St. George</span>
          <span>Join the First 100 Customers · Early Access to New Flavors &amp; Locations</span>
          <span>Family-Owned · High-Protein Cottage Cheese Bowls · Made with Sunshine ☀️</span>
          <span>Grand Opening Phase · Limited Pickup Spots · Fresh Bowls Made Daily in St. George</span>
          <span>Join the First 100 Customers · Early Access to New Flavors &amp; Locations</span>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-16 bg-white">
      <UContainer>
        <h2 class="text-3xl md:text-4xl font-bold text-amber-800 text-center mb-10">
          How Cottage Bowls Works
        </h2>
        <div class="grid gap-10 md:grid-cols-3 text-center">
          <div class="space-y-3">
            <div class="text-4xl">
              📍
            </div>
            <h3 class="text-xl font-semibold text-gray-800">
              1. Choose Your Pickup Spot
            </h3>
            <p class="text-gray-600 text-sm">
              Check our <span class="font-semibold">Locations</span> page to find the closest drop spot and pickup time
              that fits your day.
            </p>
          </div>
          <div class="space-y-3">
            <div class="text-4xl">
              🥣
            </div>
            <h3 class="text-xl font-semibold text-gray-800">
              2. Pick Your Style
            </h3>
            <p class="text-gray-600 text-sm">
              Choose your base and toppings—fruits, crunch, drizzles—and we build a
              high-protein bowl that feels like a treat.
            </p>
          </div>
          <div class="space-y-3">
            <div class="text-4xl">
              ☀️
            </div>
            <h3 class="text-xl font-semibold text-gray-800">
              3. Grab &amp; Go
            </h3>
            <p class="text-gray-600 text-sm">
              Meet us at your pickup spot, grab your bowl, and enjoy a snack or meal
              that actually keeps you full.
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Why Cottage Bowls vs Other Snacks -->
    <section class="py-20 bg-linear-to-r from-amber-50 to-sky-50">
      <UContainer class="space-y-16">
        <!-- Quick reasons -->
        <div>
          <h2 class="text-4xl font-bold text-amber-800 text-center mb-12">
            Why Cottage Bowls?
          </h2>
          <div class="grid md:grid-cols-3 gap-12">
            <div class="text-center">
              <div class="text-6xl mb-4">
                🥗
              </div>
              <h3 class="text-2xl font-semibold text-gray-800 mb-3">
                High-Protein Comfort
              </h3>
              <p class="text-gray-600">
                Cottage cheese bowls that feel like dessert but eat like a meal—
                satisfying, creamy, and built around protein.
              </p>
            </div>
            <div class="text-center">
              <div class="text-6xl mb-4">
                ☀️
              </div>
              <h3 class="text-2xl font-semibold text-gray-800 mb-3">
                Better Than Frozen Treats
              </h3>
              <p class="text-gray-600">
                More protein than frozen yogurt and acai bowls, without the sugar
                crash or mystery bases.
              </p>
            </div>
            <div class="text-center">
              <div class="text-6xl mb-4">
                🚶‍♂️
              </div>
              <h3 class="text-2xl font-semibold text-gray-800 mb-3">
                Grab & Go Goodness
              </h3>
              <p class="text-gray-600">
                Simple pickup locations around St. George—no long lines or
                delivery fees.
              </p>
            </div>
          </div>
        </div>

        <!-- Nutrition snapshot vs alternatives -->
        <section class="grid gap-8 lg:grid-cols-3 items-stretch">
          <UCard class="bg-amber-50/80 border-amber-100 flex flex-col justify-between">
            <div>
              <h3 class="text-xl font-semibold text-amber-800 mb-2">
                Cottage Bowls (Typical)
              </h3>
              <p class="text-gray-700 text-sm mb-4">
                Built around cottage cheese, fruit, and crunchy toppings.
              </p>
              <ul class="text-sm text-gray-800 space-y-1">
                <li><span class="font-semibold">Protein:</span> ~20–30g</li>
                <li><span class="font-semibold">Sugar:</span> ~10–18g (from fruit &amp; light sweeteners)</li>
                <li><span class="font-semibold">Calories:</span> ~300–450</li>
                <li><span class="font-semibold">Keeps you full</span> for hours, not minutes.</li>
              </ul>
            </div>
          </UCard>

          <UCard class="bg-white border-gray-100 flex flex-col justify-between">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">
                Frozen Yogurt Cups
              </h3>
              <p class="text-gray-700 text-sm mb-4">
                Typically lower in protein and higher in added sugar.
              </p>
              <ul class="text-sm text-gray-800 space-y-1">
                <li><span class="font-semibold">Protein:</span> ~5–8g</li>
                <li><span class="font-semibold">Sugar:</span> ~20–35g+</li>
                <li><span class="font-semibold">Calories:</span> ~300–500+</li>
                <li>Easy to overdo with candy toppings and syrup.</li>
              </ul>
            </div>
          </UCard>

          <UCard class="bg-white border-gray-100 flex flex-col justify-between">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">
                Acai &amp; Smoothie Bowls
              </h3>
              <p class="text-gray-700 text-sm mb-4">
                Beautiful, fruity—and often sneaky with sugar and price.
              </p>
              <ul class="text-sm text-gray-800 space-y-1">
                <li><span class="font-semibold">Protein:</span> ~5–12g (unless you add extra)</li>
                <li><span class="font-semibold">Sugar:</span> ~25–40g+</li>
                <li><span class="font-semibold">Calories:</span> ~400–650+</li>
                <li>Can feel light but still spike energy and hunger.</li>
              </ul>
            </div>
          </UCard>
        </section>

        <!-- Story + image placeholders -->
        <section class="grid gap-10 lg:grid-cols-2 items-start">
          <div class="space-y-4 max-w-xl">
            <h3 class="text-2xl font-semibold text-amber-800">
              A Better Everyday Snack (or Meal)
            </h3>
            <p class="text-gray-700">
              Cottage Bowls sits in the sweet spot between treat and fuel. You get
              the creamy, cold-bowl experience you love from frozen yogurt or acai,
              but with the staying power of real protein.
            </p>
            <p class="text-gray-700">
              Whether it&apos;s a mid-morning snack, post-gym fuel, or a light dinner,
              our bowls are built to keep you satisfied without the sugar crash or
              fast-food regret.
            </p>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="h-40 rounded-xl bg-amber-100/70 border border-dashed border-amber-300 flex items-center justify-center text-amber-700 text-sm text-center px-4">
              Placeholder: side-by-side photo of a Cottage Bowl vs. a frozen yogurt
              cup.
            </div>
            <div class="h-40 rounded-xl bg-sky-100/70 border border-dashed border-sky-300 flex items-center justify-center text-sky-800 text-sm text-center px-4">
              Placeholder: top-down shot comparing Cottage Bowl toppings to an
              acai bowl.
            </div>
          </div>
        </section>

        <!-- Price comparison -->
        <section class="max-w-5xl mx-auto space-y-6">
          <h3 class="text-2xl font-semibold text-amber-800 text-center">
            Smart on Your Wallet Too
          </h3>
          <div class="grid gap-6 md:grid-cols-3">
            <UCard class="bg-amber-50/80 border-amber-100 text-center">
              <p class="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-1">
                Cottage Bowls
              </p>
              <p class="text-3xl font-bold text-amber-800 mb-2">
                $9–$11
              </p>
              <p class="text-xs text-gray-700">
                High-protein base, fresh toppings, and a full-meal feel.
              </p>
            </UCard>
            <UCard class="text-center">
              <p class="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-1">
                Frozen Yogurt
              </p>
              <p class="text-3xl font-bold text-gray-900 mb-2">
                $7–$10
              </p>
              <p class="text-xs text-gray-700">
                Base price + extra for toppings—with less protein per serving.
              </p>
            </UCard>
            <UCard class="text-center">
              <p class="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-1">
                Acai Bowls
              </p>
              <p class="text-3xl font-bold text-gray-900 mb-2">
                $12–$15
              </p>
              <p class="text-xs text-gray-700">
                Often premium-priced, even when you&apos;re mostly paying for sugar.
              </p>
            </UCard>
          </div>
          <p class="text-xs text-gray-500 text-center max-w-3xl mx-auto">
            Ranges are typical example pricing for similar products and may vary by
            location and ingredients. Cottage Bowls pricing is kept simple and
            transparent so you know exactly what you&apos;re getting.
          </p>
        </section>
      </UContainer>
    </section>

    <!-- Who Cottage Bowls Is For -->
    <section class="py-16 bg-white">
      <UContainer class="space-y-10">
        <div class="text-center max-w-2xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
            Who Cottage Bowls Is For
          </h2>
          <p class="text-gray-700">
            If you love feeling good after you eat—and not like you need a nap—
            Cottage Bowls was built for you.
          </p>
        </div>
        <div class="grid gap-8 md:grid-cols-3">
          <UCard class="bg-amber-50/70 border-amber-100">
            <h3 class="text-xl font-semibold text-amber-800 mb-2">
              Busy Parents &amp; Professionals
            </h3>
            <p class="text-sm text-gray-700">
              Grab-and-go fuel between school runs, meetings, and practices—without
              relying on drive-thru snacks.
            </p>
          </UCard>
          <UCard class="bg-amber-50/70 border-amber-100">
            <h3 class="text-xl font-semibold text-amber-800 mb-2">
              Gym-Goers &amp; Movers
            </h3>
            <p class="text-sm text-gray-700">
              A high-protein bowl that works pre- or post-workout and actually fits
              your goals.
            </p>
          </UCard>
          <UCard class="bg-amber-50/70 border-amber-100">
            <h3 class="text-xl font-semibold text-amber-800 mb-2">
              Healthy Snack Lovers
            </h3>
            <p class="text-sm text-gray-700">
              When you want something sweet and satisfying that still feels
              aligned with healthy habits.
            </p>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Email waitlist / newsletter -->
    <section class="py-16 bg-amber-900">
      <UContainer class="max-w-3xl mx-auto text-center space-y-6">
        <h2 class="text-3xl md:text-4xl font-bold text-amber-50">
          Join the Cottage List
        </h2>
        <p class="text-amber-100 text-sm md:text-base">
          Be the first to know about new pickup locations, flavors, and future
          rewards for our earliest supporters.
        </p>

        <UForm @submit="joinWaitlist">
          <div class="flex flex-col sm:flex-row gap-4 items-stretch">
            <UInput
              v-model="waitlistEmail"
              type="email"
              required
              class="flex-1 bg-white text-black placeholder:text-black"
              color="neutral"
              placeholder="you@example.com"
            />
            <UButton
              type="submit"
              size="lg"
              color="primary"
              :loading="waitlistLoading"
              class="px-8"
            >
              Get Updates
            </UButton>
          </div>
        </UForm>

        <p
          v-if="waitlistMessage"
          class="text-xs md:text-sm text-amber-100"
        >
          {{ waitlistMessage }}
        </p>
      </UContainer>
    </section>

    <!-- Bottom order CTA -->
    <section class="py-12 bg-linear-to-r from-amber-50 to-sky-50">
      <UContainer>
        <div class="text-center space-y-4">
          <p class="text-gray-700 text-sm md:text-base">
            Ready when you are—grab your first Cottage Bowl at one of our pickup spots.
          </p>
          <UButton
            to="/locations"
            size="xl"
            color="primary"
            class="px-12 py-6 text-lg"
          >
            View Pickup Locations &amp; Order
          </UButton>
        </div>
      </UContainer>
    </section>
  </div>
</template>
