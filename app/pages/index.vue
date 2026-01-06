<!-- app/pages/index.vue -->
<script setup lang="ts">
const waitlistEmail = ref('')
const waitlistLoading = ref(false)
const waitlistMessage = ref('')

function scrollToTop() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

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
    <!-- Hero section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: 'url(/images/hero-bowl3.png)' }"
      />

      <!-- Dark overlay for readability -->
      <div class="absolute inset-0 bg-black/40" />

      <!-- Content -->
      <UContainer class="relative z-10 text-center py-20">
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Fuel Your Day with Raw Power: High-Protein Cottage Cheese Bowls
        </h1>
        <p class="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-12 drop-shadow-md">
          High-protein cottage cheese bowls you pre-order online and pick up fresh at Dixie Springs Park in Hurricane.
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center">
          <UButton
            to="/order"
            size="xl"
            color="primary"
            class="px-12 py-6 text-lg font-medium shadow-lg"
          >
            Customize Now
          </UButton>
        </div>
      </UContainer>
    </section>

    <!-- Main content below hero -->
    <section class="bg-linear-to-b from-white to-amber-50">
      <!-- Grand Opening Banner -->
      <section class="bg-red-50 border-y border-red-200">
        <div class="grand-opening-marquee py-3">
          <div class="grand-opening-marquee__inner text-red-800 text-xs sm:text-sm font-semibold uppercase tracking-wide">
            <span>New at Dixie Springs Park · Grand Opening Pre-Order Phase</span>
            <span>Reserve Your Bowl Online · Pick Up Saturday Around 10am at Dixie Springs Park in Hurricane</span>
            <span>Limited Bowls Each Week · Family-Owned Startup · High-Protein Cottage Cheese Bowls</span>
            <span>Be an Early Supporter · Help Us Launch Cottage Bowls in Southern Utah ☀️</span>
          </div>
        </div>
      </section>

      <!-- Optional "Who this is for" section kept for later reuse. -->

      <!-- Why Cottage Bowls vs Other Snacks -->
      <section class="py-20 bg-white">
        <UContainer class="space-y-16">
          <!-- Quick reasons -->
          <div>
            <h2 class="text-4xl font-bold text-amber-800 text-center mb-12">
              Why Cottage Bowls?
            </h2>
            <div class="grid md:grid-cols-3 gap-12">
              <div class="text-center">
                <div class="text-6xl mb-4">
                  💪
                </div>
                <h3 class="text-2xl font-semibold text-gray-800 mb-3">
                  High-Protein Comfort
                </h3>
              </div>
              <div class="text-center">
                <div class="text-6xl mb-4">
                  ☀️
                </div>
                <h3 class="text-2xl font-semibold text-gray-800 mb-3">
                  Better Than Frozen Treats
                </h3>
              </div>
              <div class="text-center">
                <div class="text-6xl mb-4">
                  😇
                </div>
                <h3 class="text-2xl font-semibold text-gray-800 mb-3">
                  Guilt-Free
                </h3>
              </div>
            </div>
          </div>

          <!-- Nutrition snapshot vs alternatives + pricing -->
          <section class="grid gap-8 lg:grid-cols-3 items-stretch">
            <UCard class="bg-amber-50/80 border-amber-100 flex flex-col justify-between">
              <div>
                <h3 class="text-xl font-semibold text-amber-800 mb-2">
                  Cottage Bowls (6oz, Meal)
                </h3>
                <p class="text-gray-700 text-sm mb-4">
                  Built around cottage cheese, fruit, and healthy toppings.
                </p>
                <ul class="text-sm text-gray-800 space-y-1">
                  <li><span class="font-bold text-md">Protein:</span> ~15–25g</li>
                  <li><span class="font-bold text-md">Sugar:</span> ~5–15g (from natural sweeteners)</li>
                  <li><span class="font-bold text-md">Fiber:</span> ~0–5g</li>
                  <li><span class="font-bold text-md">Calories:</span> ~140–250</li>
                  <li><span class="font-bold text-md">Price:</span> $6–$10+</li>
                  <li>Keeps you full for hours, not minutes.</li>
                </ul>
                <div class="mt-4 flex flex-wrap gap-2 text-xs">
                  <span class="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-800 border border-emerald-200">
                    Best overall macros & cheaper price.
                  </span>
                </div>
              </div>
            </UCard>

            <UCard class="bg-white border-gray-100 flex flex-col justify-between">
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">
                  Frozen Yogurt Cups (6oz, Snack)
                </h3>
                <p class="text-gray-700 text-sm mb-4">
                  Typically lower in protein and higher in added sugar.
                </p>
                <ul class="text-sm text-gray-800 space-y-1">
                  <li><span class="font-bold text-md">Protein:</span> ~4–7g</li>
                  <li><span class="font-bold text-md">Sugar:</span> ~15–30g</li>
                  <li><span class="font-bold text-md">Fiber:</span> ~0–3g</li>
                  <li><span class="font-bold text-md">Calories:</span> ~150–350</li>
                  <li><span class="font-bold text-md">Price:</span> $7–$10+</li>
                  <li>Easy to overdo with candy toppings and syrups.</li>
                </ul>
              </div>
            </UCard>

            <UCard class="bg-white border-gray-100 flex flex-col justify-between">
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">
                  Acai &amp; Smoothie Bowls (6oz, Snack)
                </h3>
                <p class="text-gray-700 text-sm mb-4">
                  Beautiful, fruity—but often sneaky with sugar and price.
                </p>
                <ul class="text-sm text-gray-800 space-y-1">
                  <li><span class="font-bold text-md">Protein:</span> ~3–6g</li>
                  <li><span class="font-bold text-mdd">Sugar:</span> ~15–25g</li>
                  <li><span class="font-bold text-md">Fiber:</span> ~3–7g</li>
                  <li><span class="font-bold text-md">Calories:</span> ~200–350</li>
                  <li><span class="font-bold text-md">Price:</span> $12–$15+</li>
                  <li>Can feel light but still spike energy and hunger.</li>
                </ul>
              </div>
            </UCard>
          </section>
        </UContainer>
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
                Choose your base and toppings—fruits, nuts, sweeteners—and we build a
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
      <!-- CTA -->
      <section class="py-12">
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
              View Locations & Times
            </UButton>
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

      <!-- Back to top button -->
      <section class="py-8">
        <UContainer>
          <div class="text-center">
            <UButton
              variant="ghost"
              color="primary"
              class="px-6"
              @click="scrollToTop"
            >
              Back to top
            </UButton>
          </div>
        </UContainer>
      </section>
    </section>
  </div>
</template>
