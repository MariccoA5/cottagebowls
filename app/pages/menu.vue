<script setup lang="ts">
const router = useRouter()

const premadeBowls = [
  {
    key: 'classic',
    name: 'Strawberries & Blueberries Bowl',
    tag: 'Customer favorite',
    description: 'Cottage cheese topped with strawberries, blueberries, agave, chia, and almond slices.',
    toppings: ['Strawberries', 'Blueberries', 'Agave', 'Chia seeds', 'Almond slices'],
    note: 'Great as a snack or light meal.',
    priceNote: 'Usually around $7–$9 depending on size and base.'
  },
  {
    key: 'seasonal',
    name: 'Seasonal Bowl',
    tag: 'Rotating fruit',
    description: 'Built around our current seasonal fruit, plus chia, almond slices, and a drizzle of agave.',
    toppings: ['Seasonal fruit', 'Agave', 'Chia seeds', 'Almond slices'],
    note: 'Ask what fruit we are using this week.',
    priceNote: 'Usually around $7–$9 depending on size and base.'
  },
  {
    key: 'banana-dates',
    name: 'Banana & Dates Bowl',
    tag: 'Dessert-style',
    description: 'Bananas, dates, chia, almond slices, and agave for a rich, sweet bowl without added sugar.',
    toppings: ['Bananas', 'Dates', 'Agave', 'Chia seeds', 'Almond slices'],
    note: 'Feels like dessert but stays high-protein.',
    priceNote: 'Usually around $7–$9 depending on size and base.'
  }
]

function goToPreset(key: string) {
  router.push({
    path: '/order',
    query: { preset: key }
  })
}
</script>

<template>
  <UContainer class="py-16 space-y-16 max-w-5xl mx-auto">
    <!-- Intro -->
    <section class="space-y-4 text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-amber-800">
        Menu
      </h1>
      <p class="text-lg text-gray-700 max-w-3xl mx-auto">
        Cottage Bowls is a build-your-own bowl system built around high-protein cottage cheese, fruit, and nuts.
        You can start from a clean base and build it exactly how you like, or choose one of our pre-made favorites
        and tweak it.
      </p>
      <div class="flex justify-center mt-4">
        <UButton
          to="/order"
          size="xl"
          color="primary"
          class="px-10 py-4 text-lg font-medium"
        >
          Start an order
        </UButton>
      </div>
    </section>

    <!-- Build Your Own overview -->
    <section class="grid gap-10 lg:grid-cols-2 items-start">
      <UCard class="bg-amber-50/70 border-amber-100">
        <h2 class="text-2xl font-semibold text-amber-800 mb-3">
          Build Your Own Bowl
        </h2>
        <p class="text-gray-700 text-sm mb-4">
          Pick your size, choose your cottage cheese, then add fruit, nuts, and a sweetener.
          Pricing stays simple and transparent.
        </p>

        <div class="space-y-4 text-sm text-gray-800">
          <div>
            <h3 class="font-semibold text-amber-800 mb-1">
              Sizes
            </h3>
            <ul class="space-y-1">
              <li>
                <span class="font-medium">Kids 1 oz</span>
                <span class="text-gray-500"> · base $1.10</span>
              </li>
              <li>
                <span class="font-medium">Snack 4 oz</span>
                <span class="text-gray-500"> · base $4.00</span>
              </li>
              <li>
                <span class="font-medium">Meal 6 oz</span>
                <span class="text-gray-500"> · base $6.00</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold text-amber-800 mb-1">
              Cottage cheese
            </h3>
            <ul class="space-y-1">
              <li>
                <span class="font-medium">Daisy</span>
                <span class="text-gray-500"> · standard base</span>
              </li>
              <li>
                <span class="font-medium">Lactaid</span>
                <span class="text-gray-500"> · lactose‑free option</span>
              </li>
              <li>
                <span class="font-medium">Good Culture</span>
                <span class="text-gray-500"> · +$1.00 premium upgrade</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold text-amber-800 mb-1">
              Toppings
            </h3>
            <ul class="space-y-1">
              <li>
                <span class="font-medium">Standard nuts</span>
                <span class="text-gray-500"> · +$0.49 per scoop</span>
              </li>
              <li>
                <span class="font-medium">Premium nuts</span>
                <span class="text-gray-500"> · +$0.74 per scoop</span>
              </li>
              <li>
                <span class="font-medium">Standard fruit</span>
                <span class="text-gray-500"> · +$0.75 per scoop</span>
              </li>
              <li>
                <span class="font-medium">Premium fruit</span>
                <span class="text-gray-500"> · +$1.24 per scoop</span>
              </li>
              <li>
                <span class="font-medium">Sweeteners</span>
                <span class="text-gray-500"> · first scoop free, extras +$0.50 each</span>
              </li>
            </ul>
          </div>
        </div>
      </UCard>

      <!-- Pre-made bowls -->
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold text-amber-800">
          Pre-made favorites
        </h2>
        <p class="text-gray-700 text-sm mb-2">
          These are the bowls most people start with. You can order them as‑is or use them as a starting point and
          tweak toppings on the order page.
        </p>

        <div class="grid gap-4 md:grid-cols-1">
          <UCard
            v-for="bowl in premadeBowls"
            :key="bowl.key"
            class="border-amber-100 bg-amber-50/60"
          >
            <template #header>
              <div class="flex items-start justify-between gap-2">
                <div>
                  <h3 class="text-lg font-semibold text-amber-800">
                    {{ bowl.name }}
                  </h3>
                  <p
                    v-if="bowl.tag"
                    class="text-xs font-medium text-amber-600 uppercase tracking-wide"
                  >
                    {{ bowl.tag }}
                  </p>
                </div>
              </div>
            </template>

            <p class="text-sm text-gray-700 mb-2">
              {{ bowl.description }}
            </p>
            <p class="text-xs font-semibold text-gray-700 mb-1">
              Toppings
            </p>
            <ul class="text-xs text-gray-700 list-disc list-inside mb-2">
              <li
                v-for="t in bowl.toppings"
                :key="t"
              >
                {{ t }}
              </li>
            </ul>
            <p
              v-if="bowl.note"
              class="text-xs text-gray-600 mb-1"
            >
              {{ bowl.note }}
            </p>
            <p class="text-xs text-gray-600">
              {{ bowl.priceNote }}
            </p>

            <template #footer>
              <div class="flex justify-between items-center">
                <p class="text-xs text-gray-500">
                  Built on the same pricing rules as the bowl builder.
                </p>
                <UButton
                  size="sm"
                  color="primary"
                  @click="goToPreset(bowl.key)"
                >
                  Order this style
                </UButton>
              </div>
            </template>
          </UCard>
        </div>
      </div>
    </section>
  </UContainer>
</template>
