<template>
  <UContainer class="pt-10 pb-28 md:pt-12 md:pb-16 max-w-5xl mx-auto">
    <h1 class="text-4xl font-bold text-amber-800 text-center mb-2">
      Build Your Cottage Bowl ☀️
    </h1>
    <p class="text-lg text-center text-gray-700 mb-2">
      Choose your cottage cheese, size, and toppings. Snack 4 oz or Meal 6 oz.
    </p>
    <p class="text-md text-center text-gray-700 mb-8">
      Pickup Saturdays at Dixie Springs Park in Hurricane (around 10am for 2 hours).
    </p>

    <!-- Pickup location selector -->
    <UCard class="mb-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p class="font-semibold text-amber-800">
            Pickup Location
          </p>
          <p class="text-gray-900">
            {{ activeLocation.label }}
          </p>
          <p class="text-sm text-gray-500">
            {{ activeLocation.schedule }}
          </p>
        </div>
        <div class="flex flex-wrap gap-2 justify-start md:justify-end">
          <UButton
            v-for="loc in pickupLocations"
            :key="loc.id"
            size="sm"
            :color="loc.id === selectedLocationId ? 'primary' : 'gray'"
            variant="soft"
            @click="selectedLocationId = loc.id"
          >
            {{ loc.shortLabel }}
          </UButton>
        </div>
      </div>
    </UCard>

    <div class="grid md:grid-cols-3 gap-8">
      <div class="md:col-span-2 space-y-8">
        <UForm @submit="submit">
          <!-- Customer info -->
          <UCard class="mb-6">
            <h2 class="text-2xl font-semibold text-amber-800 mb-4">
              Your Info
            </h2>
            <div class="space-y-4">
              <UFormField
                label="Name"
                required
              >
                <UInput
                  v-model="form.name"
                  placeholder="Jane Doe"
                />
              </UFormField>

              <UFormField
                label="Email"
                required
              >
                <UInput
                  v-model="form.email"
                  type="email"
                  placeholder="you@example.com"
                />
              </UFormField>

              <UFormField
                label="Phone"
                required
              >
                <UInput
                  v-model="form.phone"
                  placeholder="(555) 555-5555"
                />
              </UFormField>
            </div>
          </UCard>

          <!-- Base bowl: cottage cheese type & size -->
          <UCard class="mb-6">
            <h2 class="text-2xl font-semibold text-amber-800 mb-4">
              Base Bowl
            </h2>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <UFormField>
                  <template #label>
                    <span class="text-sm font-semibold text-amber-700">Bowl Size</span>
                  </template>
                  <div class="flex flex-col space-y-2">
                    <label class="inline-flex items-center gap-2 text-sm">
                      <input
                        v-model="form.size"
                        type="radio"
                        value="kids"
                        class="text-amber-600"
                      >
                      <span>Kids 1 oz</span>
                      <span class="text-xs text-gray-500 ml-1">
                        $1.10 base
                      </span>
                    </label>
                    <label class="inline-flex items-center gap-2 text-sm">
                      <input
                        v-model="form.size"
                        type="radio"
                        value="snack"
                        class="text-amber-600"
                      >
                      <span>Snack 4 oz</span>
                      <span class="text-xs text-gray-500 ml-1">
                        $4 base
                      </span>
                    </label>
                    <label class="inline-flex items-center gap-2 text-sm">
                      <input
                        v-model="form.size"
                        type="radio"
                        value="meal"
                        class="text-amber-600"
                      >
                      <span>Meal 6 oz</span>
                      <span class="text-xs text-gray-500 ml-1">
                        $6 base
                      </span>
                    </label>
                  </div>
                </UFormField>
              </div>
              <div>
                <UFormField>
                  <template #label>
                    <span class="text-sm font-semibold text-amber-700">Cottage Cheese</span>
                  </template>
                  <div class="grid md:grid-cols-2 gap-4">
                    <div>
                      <p class="text-xs font-semibold text-amber-700 mb-1">
                        Standard
                      </p>
                      <label class="inline-flex items-center gap-2 text-sm mb-2">
                        <input
                          v-model="cottageChoice"
                          type="radio"
                          value="daisy"
                          class="text-amber-600"
                        >
                        <span>Daisy</span>
                      </label>
                      <label class="inline-flex items-center gap-2 text-sm">
                        <input
                          v-model="cottageChoice"
                          type="radio"
                          value="lactaid"
                          class="text-amber-600 ml-3 md:ml-0"
                        >
                        <span>Lactaid (lactose-free)</span>
                      </label>
                    </div>
                    <div>
                      <p class="text-xs font-semibold text-amber-700 mb-1">
                        Premium
                      </p>
                      <label class="inline-flex items-center gap-2 text-sm">
                        <input
                          v-model="cottageChoice"
                          type="radio"
                          value="good-culture"
                          class="text-amber-600"
                        >
                        <span>Good Culture</span>
                      </label>
                      <p class="text-xs text-gray-500 mt-1 mx-5">
                        $1 more for any bowl size.
                      </p>
                    </div>
                  </div>
                </UFormField>
              </div>
            </div>
          </UCard>

          <!-- Premade bowls -->
          <UCard class="mb-6">
            <h2 class="text-2xl font-semibold text-amber-800 mb-4">
              Premade Favorites
            </h2>
            <p class="text-sm text-gray-600 mb-4">
              Tap a bowl to pre-fill toppings. You can still add or change toppings below.
            </p>
            <div class="grid md:grid-cols-3 gap-4">
              <UCard
                v-for="bowl in sortedPremadeBowls"
                :key="bowl.key"
                class="cursor-pointer transition hover:shadow-lg"
                :class="form.presetKey === bowl.key ? 'ring-2 ring-amber-400' : ''"
                @click="selectPreset(bowl)"
              >
                <template #header>
                  <div class="flex items-start justify-between gap-2">
                    <p class="font-semibold text-amber-800">
                      {{ bowl.name }}
                    </p>
                    <span
                      class="text-sm text-gray-400 font-semibold"
                    >
                      {{ formatPresetPriceLabel(bowl.estimatedPriceCents) }}
                    </span>
                  </div>
                </template>
                <ul class="text-sm text-gray-700 list-disc list-inside space-y-1">
                  <li
                    v-for="tKey in bowl.toppings"
                    :key="tKey"
                  >
                    {{ toppingLabelByKey(tKey) }}
                  </li>
                </ul>
                <template #footer>
                  <p class="text-xs text-gray-500">
                    From {{ formatPresetPriceLabel(bowl.estimatedPriceCents) }} · Base + {{ bowl.toppings.length }} toppings
                  </p>
                </template>
              </UCard>

              <!-- Custom build your own -->
              <UCard
                class="cursor-pointer transition hover:shadow-lg border-dashed border-amber-300"
                :class="!form.presetKey ? 'ring-2 ring-amber-400' : ''"
                @click="clearPresetToCustom"
              >
                <template #header>
                  <p class="font-semibold text-amber-800">
                    Build Your Own Bowl
                  </p>
                </template>
                <p class="text-sm text-gray-700">
                  Start from a plain bowl and choose all toppings yourself below.
                </p>
                <template #footer>
                  <p class="text-xs text-gray-500">
                    No preset – full control
                  </p>
                </template>
              </UCard>
            </div>
          </UCard>

          <!-- Custom toppings -->
          <UCard class="mb-6">
            <h2 class="text-2xl font-semibold text-amber-800 mb-4">
              Build Your Own Toppings
            </h2>
            <p class="text-sm text-gray-600 mb-4">
              Set how many scoops of each topping you want. Standard nuts are +$0.49 per scoop, standard fruit is +$0.75 per scoop.
              Premium nuts are +$0.25 extra and premium fruits are +$0.49 extra. The first sweetener is free (extra sweeteners +$0.50 each).
            </p>

            <div class="grid md:grid-cols-3 gap-6">
              <div>
                <h3 class="font-semibold text-amber-700 mb-2">
                  Sweeteners
                </h3>
                <p class="text-xs text-gray-500 mb-2">
                  First sweetener is free; extra scoops +$0.50 each.
                </p>
                <div
                  v-for="topping in toppingCategories.sweetener"
                  :key="topping.key"
                  class="flex items-center justify-between mb-2"
                >
                  <span class="text-sm">
                    {{ topping.label }}
                  </span>
                  <div class="flex items-center gap-2">
                    <UButton
                      size="xs"
                      color="gray"
                      variant="soft"
                      :disabled="(form.toppingCounts[topping.key] || 0) <= 0"
                      @click="changeToppingCount(topping.key, -1)"
                    >
                      -
                    </UButton>
                    <span class="w-6 text-center text-sm font-medium">
                      {{ form.toppingCounts[topping.key] || 0 }}
                    </span>
                    <UButton
                      size="xs"
                      color="primary"
                      variant="soft"
                      :disabled="(form.toppingCounts[topping.key] || 0) >= MAX_TOPPING_COUNT"
                      @click="changeToppingCount(topping.key, 1)"
                    >
                      +
                    </UButton>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="font-semibold text-amber-700 mb-2">
                  Nuts &amp; Seeds
                </h3>
                <div
                  v-for="topping in baseNuts"
                  :key="topping.key"
                  class="flex items-center justify-between mb-2"
                >
                  <span class="text-sm">
                    {{ topping.label }}
                  </span>
                  <div class="flex items-center gap-2">
                    <UButton
                      size="xs"
                      color="gray"
                      variant="soft"
                      :disabled="(form.toppingCounts[topping.key] || 0) <= 0"
                      @click="changeToppingCount(topping.key, -1)"
                    >
                      -
                    </UButton>
                    <span class="w-6 text-center text-sm font-medium">
                      {{ form.toppingCounts[topping.key] || 0 }}
                    </span>
                    <UButton
                      size="xs"
                      color="primary"
                      variant="soft"
                      :disabled="(form.toppingCounts[topping.key] || 0) >= MAX_TOPPING_COUNT"
                      @click="changeToppingCount(topping.key, 1)"
                    >
                      +
                    </UButton>
                  </div>
                </div>

                <div class="mt-3 mb-1 text-xs font-semibold text-amber-700">
                  Premium (+$0.25)
                </div>
                <div
                  v-for="topping in premiumNuts"
                  :key="`premium-nut-${topping.key}`"
                  class="flex items-center justify-between mb-2"
                >
                  <span class="text-sm">
                    {{ topping.label }}
                  </span>
                  <div class="flex items-center gap-2">
                    <UButton
                      size="xs"
                      color="gray"
                      variant="soft"
                      :disabled="(form.toppingCounts[topping.key] || 0) <= 0"
                      @click="changeToppingCount(topping.key, -1)"
                    >
                      -
                    </UButton>
                    <span class="w-6 text-center text-sm font-medium">
                      {{ form.toppingCounts[topping.key] || 0 }}
                    </span>
                    <UButton
                      size="xs"
                      color="primary"
                      variant="soft"
                      :disabled="(form.toppingCounts[topping.key] || 0) >= MAX_TOPPING_COUNT"
                      @click="changeToppingCount(topping.key, 1)"
                    >
                      +
                    </UButton>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="font-semibold text-amber-700 mb-2 -2">
                  Fruits
                </h3>
                <div
                  v-for="topping in baseFruits"
                  :key="topping.key"
                  class="flex items-center justify-between mb-2"
                >
                  <span class="text-sm">
                    {{ topping.label }}
                  </span>
                  <div class="flex items-center gap-2">
                    <UButton
                      size="xs"
                      color="gray"
                      variant="soft"
                      :disabled="(form.toppingCounts[topping.key] || 0) <= 0"
                      @click="changeToppingCount(topping.key, -1)"
                    >
                      -
                    </UButton>
                    <span class="w-6 text-center text-sm font-medium">
                      {{ form.toppingCounts[topping.key] || 0 }}
                    </span>
                    <UButton
                      size="xs"
                      color="primary"
                      variant="soft"
                      :disabled="(form.toppingCounts[topping.key] || 0) >= MAX_TOPPING_COUNT"
                      @click="changeToppingCount(topping.key, 1)"
                    >
                      +
                    </UButton>
                  </div>
                </div>

                <div class="mt-3 mb-1 text-xs font-semibold text-amber-700">
                  Premium (+$0.49)
                </div>
                <div
                  v-for="topping in premiumFruits"
                  :key="`premium-fruit-${topping.key}`"
                  class="flex items-center justify-between mb-2"
                >
                  <span class="text-sm">
                    {{ topping.label }}
                  </span>
                  <div class="flex items-center gap-2">
                    <UButton
                      size="xs"
                      color="gray"
                      variant="soft"
                      :disabled="(form.toppingCounts[topping.key] || 0) <= 0"
                      @click="changeToppingCount(topping.key, -1)"
                    >
                      -
                    </UButton>
                    <span class="w-6 text-center text-sm font-medium">
                      {{ form.toppingCounts[topping.key] || 0 }}
                    </span>
                    <UButton
                      size="xs"
                      color="primary"
                      variant="soft"
                      :disabled="(form.toppingCounts[topping.key] || 0) >= MAX_TOPPING_COUNT"
                      @click="changeToppingCount(topping.key, 1)"
                    >
                      +
                    </UButton>
                  </div>
                </div>
              </div>
            </div>
          </UCard>

          <!-- Quantity & submit (main button for mobile) -->
          <UCard class="mb-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <UFormField label="Quantity">
                <UInput
                  v-model.number="form.quantity"
                  type="number"
                  :min="1"
                  class="w-32"
                />
              </UFormField>

              <UButton
                type="submit"
                size="xl"
                color="primary"
                :loading="loading"
              >
                Place Order – ${{ totalDollars }}
              </UButton>
            </div>
          </UCard>
        </UForm>

        <p
          v-if="message"
          class="text-center text-lg mt-2"
        >
          {{ message }}
        </p>
      </div>

      <!-- Summary card -->
      <div class="md:col-span-1">
        <UCard class="md:sticky md:top-24">
          <h2 class="text-xl font-semibold text-amber-800 mb-2">
            Order Summary
          </h2>
          <p class="text-sm text-gray-600 mb-4">
            Review your bowl before placing your order.
          </p>

          <div class="space-y-3">
            <div>
              <p class="font-semibold">
                Location
              </p>
              <p class="text-sm text-gray-800">
                {{ activeLocation.label }}
              </p>
              <p class="text-xs text-gray-500">
                {{ activeLocation.schedule }}
              </p>
            </div>

            <div>
              <p class="font-semibold">
                Name
              </p>
              <p class="text-sm text-gray-800">
                {{ form.name || 'Not entered yet' }}
              </p>
            </div>

            <div>
              <p class="font-semibold">
                Base bowl
              </p>
              <p class="text-sm text-gray-800">
                {{ baseDescription }}
              </p>
            </div>

            <div>
              <p class="font-semibold">
                Bowl Type
              </p>
              <p class="text-sm text-gray-800">
                <span v-if="form.presetKey">
                  {{ presetLabel }}
                </span>
                <span v-else>
                  Custom bowl
                </span>
              </p>
            </div>

            <div>
              <p class="font-semibold">
                Toppings ({{ toppingsUnits }} scoops)
              </p>
              <ul class="text-sm text-gray-800 list-disc list-inside">
                <li
                  v-for="t in selectedToppingsDetailed"
                  :key="t.key"
                >
                  {{ t.label }} × {{ t.count }}
                </li>
                <li
                  v-if="selectedToppingsDetailed.length === 0"
                  class="text-gray-500"
                >
                  No toppings selected yet
                </li>
              </ul>
            </div>

            <div class="border-t pt-3 mt-2 text-sm space-y-2">
              <div class="flex justify-between mb-1">
                <span>Base (x{{ form.quantity }})</span>
                <span>${{ (basePriceCents * form.quantity / 100).toFixed(2) }}</span>
              </div>
              <div class="flex justify-between mb-1">
                <span>Toppings</span>
                <span>${{ (toppingsSubtotalCents / 100).toFixed(2) }}</span>
              </div>
              <div class="flex justify-between font-semibold text-amber-800 mt-2">
                <span>Total</span>
                <span>${{ totalDollars }}</span>
              </div>

              <div class="mt-3 pt-3 border-t text-xs text-gray-600">
                <p class="font-semibold text-amber-800 mb-1">
                  Estimated macros (per bowl)
                </p>
                <div class="flex flex-wrap gap-x-4 gap-y-1">
                  <span>Protein: ~{{ estimatedMacros.protein }}g</span>
                  <span>Added sugar: ~{{ estimatedMacros.addedSugar }}g</span>
                  <span>Calories: ~{{ estimatedMacros.calories }}</span>
                </div>
                <p class="mt-1 text-[11px] text-gray-500">
                  Rough estimates based on your size, base, and toppings. For general guidance only.
                </p>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Mobile sticky checkout bar -->
    <div class="fixed inset-x-0 bottom-0 md:hidden border-t bg-white/95 backdrop-blur-sm shadow-lg z-50">
      <UContainer class="py-3 flex items-center justify-between gap-3 max-w-5xl mx-auto">
        <div>
          <p class="text-xs text-gray-500">
            Total ({{ form.quantity }} bowl<span v-if="form.quantity > 1">s</span>)
          </p>
          <p class="text-lg font-semibold text-amber-800">
            ${{ totalDollars }}
          </p>
        </div>
        <UButton
          size="lg"
          color="primary"
          :loading="loading"
          @click="submit"
        >
          Place Order
        </UButton>
      </UContainer>
    </div>
  </UContainer>
</template>

<script setup>
const KIDS_STANDARD_PRICE_CENTS = 110
const KIDS_PREMIUM_PRICE_CENTS = 210 // $1 more than standard for Good Culture
const SNACK_STANDARD_PRICE_CENTS = 400
const SNACK_PREMIUM_PRICE_CENTS = 500 // $1 more than standard for Good Culture
const MEAL_STANDARD_PRICE_CENTS = 600
const MEAL_PREMIUM_PRICE_CENTS = 700 // $1 more than standard for Good Culture

const NUT_PRICE_CENTS = 49
const FRUIT_PRICE_CENTS = 75
const SWEETENER_EXTRA_PRICE_CENTS = 50
const MAX_TOPPING_COUNT = 5

// Rough macro estimates used for the nutrition snapshot (per bowl)
const BASE_MACROS = {
  kids: {
    // 1 oz
    standard: { protein: 3.25, addedSugar: 0, calories: 23 },
    premium: { protein: 3.5, addedSugar: 0, calories: 25 }
  },
  snack: {
    // 4 oz
    standard: { protein: 13, addedSugar: 0, calories: 92 },
    premium: { protein: 14, addedSugar: 0, calories: 100 }
  },
  meal: {
    // 6 oz
    standard: { protein: 19.5, addedSugar: 0, calories: 138 },
    premium: { protein: 21, addedSugar: 0, calories: 150 }
  }
}

const TOPPING_MACROS = {
  // approximate per 1 tbsp scoop
  nutsBase: { protein: 2, addedSugar: 0, calories: 30 },
  nutsPremium: { protein: 2.5, addedSugar: 0, calories: 35 },
  fruitBase: { protein: 0, addedSugar: 0, calories: 15 },
  fruitPremium: { protein: 0, addedSugar: 0, calories: 20 },
  sweetener: { protein: 0, addedSugar: 0, calories: 20 }
}

const route = useRoute()

const pickupLocations = [
  {
    id: 'dixie-springs-park',
    shortLabel: 'Dixie Springs Park',
    label: 'Dixie Springs Park, Hurricane, UT',
    schedule: 'Saturday · around 10am for 2 hours'
  }
]

const initialLocationIdFromQuery = (() => {
  const q = route.query.locationId
  const asString = Array.isArray(q) ? q[0] : q
  if (!asString) return pickupLocations[0]?.id
  const match = pickupLocations.find(loc => String(loc.id) === String(asString))
  return match ? match.id : pickupLocations[0]?.id
})()

const selectedLocationId = ref(initialLocationIdFromQuery)

const activeLocation = computed(() => {
  return pickupLocations.find(loc => loc.id === selectedLocationId.value) ?? pickupLocations[0]
})

const toppingCategories = {
  sweetener: [
    { key: 'agave', label: 'Agave', category: 'sweetener' },
    { key: 'honey', label: 'Honey', category: 'sweetener' }
  ],
  nuts: [
    { key: 'almond-slices', label: 'Almond slices', category: 'nuts' },
    { key: 'chia', label: 'Chia seeds', category: 'nuts' },
    { key: 'walnuts', label: 'Walnuts', category: 'nuts' },
    { key: 'pecans', label: 'Pecans', category: 'nuts' }
  ],
  fruit: [
    { key: 'strawberries', label: 'Sliced strawberries', category: 'fruit' },
    { key: 'blueberries', label: 'Blueberries', category: 'fruit' },
    { key: 'raspberries', label: 'Raspberries', category: 'fruit' },
    { key: 'bananas', label: 'Sliced bananas', category: 'fruit' },
    { key: 'dates', label: 'Sliced dates', category: 'fruit' },
    { key: 'mangos', label: 'Sliced mangos', category: 'fruit' },
    { key: 'pomegranate', label: 'Pomegranate seeds', category: 'fruit' }
  ]
}

const premadeBowls = [
  {
    key: 'standard-agave',
    name: 'Standard',
    description: 'Uses your selected cottage cheese & size with agave.',
    toppings: ['agave']
  },
  {
    key: 'original',
    name: 'Original Bowl',
    description: 'Standard + agave plus chia and almond slices.',
    toppings: ['agave', 'chia', 'almond-slices']
  },
  {
    key: 'classic',
    name: '#1 Strawberries & Blueberries Bowl',
    description: 'Snack size · classic berry combo',
    toppings: ['strawberries', 'blueberries', 'agave', 'chia', 'almond-slices']
  },
  {
    key: 'seasonal',
    name: '#2 Seasonal Bowl',
    description: 'Snack size · rotating seasonal fruit',
    toppings: ['mangos', 'pomegranate', 'agave', 'chia', 'almond-slices']
  },
  {
    key: 'banana-dates',
    name: '#3 Banana & Dates Bowl',
    description: 'Snack size · banana, dates, and crunch',
    toppings: ['bananas', 'dates', 'agave', 'chia', 'almond-slices']
  }
]

function estimatePresetPriceCents(bowl) {
  const base = basePriceCents.value
  let nutsCents = 0
  let fruitCents = 0
  let sweetenerCount = 0

  bowl.toppings.forEach((key) => {
    const t = allToppingsFlat.value.find(item => item.key === key)
    if (!t) return
    if (t.category === 'nuts') {
      const isPremiumNut = t.key === 'pecans' || t.key === 'almond-slices'
      const pricePerUnit = isPremiumNut ? NUT_PRICE_CENTS + 25 : NUT_PRICE_CENTS
      nutsCents += pricePerUnit
    } else if (t.category === 'fruit') {
      const isPremiumFruit = t.key === 'dates' || t.key === 'mangos' || t.key === 'pomegranate'
      const pricePerUnit = isPremiumFruit ? FRUIT_PRICE_CENTS + 49 : FRUIT_PRICE_CENTS
      fruitCents += pricePerUnit
    } else if (t.category === 'sweetener') {
      sweetenerCount += 1
    }
  })

  const sweetenerPaidCount = Math.max(0, sweetenerCount - 1)
  const sweetenerCents = sweetenerPaidCount * SWEETENER_EXTRA_PRICE_CENTS

  return base + nutsCents + fruitCents + sweetenerCents
}

function formatPresetPriceLabel(cents) {
  const dollars = cents / 100
  const rounded = Math.round(dollars)
  return `$${rounded.toFixed(0)}`
}

const sortedPremadeBowls = computed(() => {
  return premadeBowls
    .map(bowl => ({
      ...bowl,
      estimatedPriceCents: estimatePresetPriceCents(bowl)
    }))
    .sort((a, b) => a.estimatedPriceCents - b.estimatedPriceCents)
})

const form = ref({
  name: '',
  email: '',
  phone: '',
  quantity: 1,
  size: 'snack',
  cottageType: 'standard',
  standardBrand: 'daisy',
  presetKey: null,
  toppingCounts: {}
})

const loading = ref(false)
const message = ref('')

const allToppingsFlat = computed(() => {
  return Object.values(toppingCategories).flat()
})

const baseNuts = computed(() =>
  toppingCategories.nuts.filter(t => t.key !== 'almond-slices' && t.key !== 'pecans')
)

const premiumNuts = computed(() =>
  toppingCategories.nuts.filter(t => t.key === 'almond-slices' || t.key === 'pecans')
)

const baseFruits = computed(() =>
  toppingCategories.fruit.filter(t => !['dates', 'mangos', 'pomegranate'].includes(t.key))
)

const premiumFruits = computed(() =>
  toppingCategories.fruit.filter(t => ['dates', 'mangos', 'pomegranate'].includes(t.key))
)

onMounted(() => {
  // initialize counts to 0
  allToppingsFlat.value.forEach((t) => {
    if (form.value.toppingCounts[t.key] == null) {
      form.value.toppingCounts[t.key] = 0
    }
  })
})

const selectedToppingsDetailed = computed(() => {
  return allToppingsFlat.value
    .map(t => ({
      ...t,
      count: form.value.toppingCounts[t.key] ?? 0
    }))
    .filter(t => t.count > 0)
})

const toppingsUnits = computed(() => {
  return selectedToppingsDetailed.value.reduce((sum, t) => sum + t.count, 0)
})

const estimatedMacros = computed(() => {
  const sizeKey = form.value.size === 'kids' ? 'kids' : form.value.size === 'snack' ? 'snack' : 'meal'
  const cottageKey = form.value.cottageType === 'premium' ? 'premium' : 'standard'
  const base = BASE_MACROS[sizeKey][cottageKey]

  let protein = base.protein
  let addedSugar = base.addedSugar
  let calories = base.calories

  for (const t of selectedToppingsDetailed.value) {
    if (t.category === 'nuts') {
      const isPremiumNut = t.key === 'pecans' || t.key === 'almond-slices'
      const m = isPremiumNut ? TOPPING_MACROS.nutsPremium : TOPPING_MACROS.nutsBase
      protein += m.protein * t.count
      addedSugar += m.addedSugar * t.count
      calories += m.calories * t.count
    } else if (t.category === 'fruit') {
      const isPremiumFruit = t.key === 'dates' || t.key === 'mangos' || t.key === 'pomegranate'
      const m = isPremiumFruit ? TOPPING_MACROS.fruitPremium : TOPPING_MACROS.fruitBase
      protein += m.protein * t.count
      addedSugar += m.addedSugar * t.count
      calories += m.calories * t.count
    } else if (t.category === 'sweetener') {
      const m = TOPPING_MACROS.sweetener
      protein += m.protein * t.count
      addedSugar += m.addedSugar * t.count
      calories += m.calories * t.count
    }
  }

  return {
    protein: Math.round(protein),
    addedSugar: Math.round(addedSugar),
    calories: Math.round(calories)
  }
})

const basePriceCents = computed(() => {
  if (form.value.size === 'kids') {
    return form.value.cottageType === 'premium'
      ? KIDS_PREMIUM_PRICE_CENTS
      : KIDS_STANDARD_PRICE_CENTS
  }
  if (form.value.size === 'snack') {
    return form.value.cottageType === 'premium'
      ? SNACK_PREMIUM_PRICE_CENTS
      : SNACK_STANDARD_PRICE_CENTS
  }

  // Meal 6 oz: $6 standard, $7 Good Culture
  return form.value.cottageType === 'premium'
    ? MEAL_PREMIUM_PRICE_CENTS
    : MEAL_STANDARD_PRICE_CENTS
})

const toppingsSubtotalCents = computed(() => {
  let nutsCents = 0
  let fruitCents = 0
  let sweetenerCount = 0

  for (const t of selectedToppingsDetailed.value) {
    if (t.category === 'nuts') {
      const isPremiumNut = t.key === 'pecans' || t.key === 'almond-slices'
      const pricePerUnit = isPremiumNut ? NUT_PRICE_CENTS + 25 : NUT_PRICE_CENTS
      nutsCents += pricePerUnit * t.count
    } else if (t.category === 'fruit') {
      const isPremiumFruit = t.key === 'dates' || t.key === 'mangos' || t.key === 'pomegranate'
      const pricePerUnit = isPremiumFruit ? FRUIT_PRICE_CENTS + 49 : FRUIT_PRICE_CENTS
      fruitCents += pricePerUnit * t.count
    } else if (t.category === 'sweetener') {
      sweetenerCount += t.count
    }
  }

  const sweetenerPaidCount = Math.max(0, sweetenerCount - 1)
  const sweetenerCents = sweetenerPaidCount * SWEETENER_EXTRA_PRICE_CENTS

  const perBowl = nutsCents + fruitCents + sweetenerCents
  return perBowl * form.value.quantity
})

const totalCents = computed(() => {
  return basePriceCents.value * form.value.quantity + toppingsSubtotalCents.value
})

const totalDollars = computed(() => (totalCents.value / 100).toFixed(2))

const presetLabel = computed(() => {
  if (!form.value.presetKey) return ''
  const match = premadeBowls.find(b => b.key === form.value.presetKey)
  return match ? match.name : 'Custom bowl'
})

const baseDescription = computed(() => {
  let sizeLabel
  if (form.value.size === 'kids') {
    sizeLabel = 'Kids 1 oz'
  } else if (form.value.size === 'snack') {
    sizeLabel = 'Snack 4 oz'
  } else {
    sizeLabel = 'Meal 6 oz'
  }
  let brandLabel
  if (form.value.cottageType === 'premium') {
    brandLabel = 'Good Culture (Premium)'
  } else {
    brandLabel = form.value.standardBrand === 'lactaid' ? 'Lactaid' : 'Daisy'
  }
  return `${sizeLabel}  ${brandLabel}`
})

const cottageChoice = computed({
  get() {
    if (form.value.cottageType === 'premium') return 'good-culture'
    return form.value.standardBrand
  },
  set(value) {
    if (value === 'good-culture') {
      form.value.cottageType = 'premium'
    } else {
      form.value.cottageType = 'standard'
      form.value.standardBrand = value
    }
  }
})

function toppingLabelByKey(key) {
  const all = allToppingsFlat.value
  const found = all.find(t => t.key === key)
  return found ? found.label : key
}

function selectPreset(bowl) {
  form.value.presetKey = bowl.key
  const counts = {}
  allToppingsFlat.value.forEach((t) => {
    counts[t.key] = 0
  })
  bowl.toppings.forEach((key) => {
    counts[key] = (counts[key] ?? 0) + 1
  })
  form.value.toppingCounts = counts
}

function clearPresetToCustom() {
  form.value.presetKey = null
  const counts = {}
  allToppingsFlat.value.forEach((t) => {
    counts[t.key] = 0
  })
  form.value.toppingCounts = counts
}

function changeToppingCount(key, delta) {
  const current = form.value.toppingCounts[key] || 0
  const next = Math.min(MAX_TOPPING_COUNT, Math.max(0, current + delta))
  form.value.toppingCounts[key] = next
}

async function submit() {
  loading.value = true

  if (!form.value.name || !form.value.email || !form.value.phone) {
    message.value = 'Please enter your name, email, and phone.'
    loading.value = false
    return
  }

  const toppingsPayload = selectedToppingsDetailed.value.map(t => ({
    key: t.key,
    label: t.label,
    category: t.category,
    count: t.count
  }))

  const body = {
    customer_name: form.value.name,
    email: form.value.email,
    phone: form.value.phone,
    location_id: activeLocation.value.id,
    location_label: activeLocation.value.label,
    quantity: form.value.quantity,
    size: form.value.size,
    cottage_type: form.value.cottageType,
    standard_brand: form.value.standardBrand,
    base_price_cents: basePriceCents.value,
    toppings: toppingsPayload,
    preset_key: form.value.presetKey,
    total_cents: totalCents.value
  }

  try {
    const res = await $fetch('/api/checkout', {
      method: 'POST',
      body
    })

    if (res && res.url) {
      window.location.href = res.url
      return
    }

    message.value = 'Something went wrong starting checkout.'
  } catch (error) {
    console.error('Checkout error', error)
    message.value = 'Error starting checkout. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
