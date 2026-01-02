<template>
  <UContainer class="py-12 max-w-5xl mx-auto">
    <h1 class="text-4xl font-bold text-amber-800 text-center mb-2">
      Build Your Cottage Bowl ☀️
    </h1>
    <p class="text-lg text-center text-gray-700 mb-8">
      Choose your cottage cheese, size, and toppings. Snack 4 oz or Meal 6 oz.
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
                <UFormField label="Bowl Size">
                  <div class="flex flex-col space-y-2">
                    <label class="inline-flex items-center gap-2 text-sm">
                      <input
                        v-model="form.size"
                        type="radio"
                        value="snack"
                        class="text-amber-600"
                      >
                      <span>Snack 4 oz</span>
                      <span class="text-xs text-gray-500 ml-1">
                        $4 standard / $5 Good Culture
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
                        $6 standard / $7 Good Culture
                      </span>
                    </label>
                  </div>
                </UFormField>
              </div>
              <div>
                <UFormField label="Cottage Cheese">
                  <div class="grid md:grid-cols-2 gap-4">
                    <div>
                      <p class="text-xs font-semibold text-amber-700 mb-1">
                        Standard
                      </p>
                      <label class="inline-flex items-center gap-2 text-sm mb-1">
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
                          class="text-amber-600"
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
                      <p class="text-xs text-gray-500 mt-1">
                        Good Culture is $1 more for any bowl size.
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
                v-for="bowl in premadeBowls"
                :key="bowl.key"
                class="cursor-pointer transition hover:shadow-lg"
                :class="form.presetKey === bowl.key ? 'ring-2 ring-amber-400' : ''"
                @click="selectPreset(bowl)"
              >
                <template #header>
                  <p class="font-semibold text-amber-800">
                    {{ bowl.name }}
                  </p>
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
                    Base + {{ bowl.toppings.length }} toppings
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
              Set how many scoops of each topping you want (0–5). Nuts are +$0.25, fruits are +$0.75, and the first sweetener is free (extra sweeteners +$0.50 each).
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
                  <UInput
                    v-model.number="form.toppingCounts[topping.key]"
                    type="number"
                    :min="0"
                    :max="MAX_TOPPING_COUNT"
                    class="w-20 text-right"
                  />
                </div>
              </div>

              <div>
                <h3 class="font-semibold text-amber-700 mb-2">
                  Nuts & Seeds
                </h3>
                <p class="text-xs text-gray-500 mb-2">
                  +$0.25 per scoop.
                </p>
                <div
                  v-for="topping in toppingCategories.nuts"
                  :key="topping.key"
                  class="flex items-center justify-between mb-2"
                >
                  <span class="text-sm">
                    {{ topping.label }}
                  </span>
                  <UInput
                    v-model.number="form.toppingCounts[topping.key]"
                    type="number"
                    :min="0"
                    :max="MAX_TOPPING_COUNT"
                    class="w-20 text-right"
                  />
                </div>
              </div>

              <div>
                <h3 class="font-semibold text-amber-700 mb-2">
                  Fruits
                </h3>
                <p class="text-xs text-gray-500 mb-2">
                  +$0.75 per scoop.
                </p>
                <div
                  v-for="topping in toppingCategories.fruit"
                  :key="topping.key"
                  class="flex items-center justify-between mb-2"
                >
                  <span class="text-sm">
                    {{ topping.label }}
                  </span>
                  <UInput
                    v-model.number="form.toppingCounts[topping.key]"
                    type="number"
                    :min="0"
                    :max="MAX_TOPPING_COUNT"
                    class="w-20 text-right"
                  />
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
        <UCard>
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

            <div class="border-t pt-3 mt-2 text-sm">
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
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
const SNACK_STANDARD_PRICE_CENTS = 400
const SNACK_PREMIUM_PRICE_CENTS = 500
const MEAL_STANDARD_PRICE_CENTS = 600
const MEAL_PREMIUM_PRICE_CENTS = 700

const NUT_PRICE_CENTS = 25
const FRUIT_PRICE_CENTS = 75
const SWEETENER_EXTRA_PRICE_CENTS = 50
const MAX_TOPPING_COUNT = 5

const route = useRoute()

const pickupLocations = [
  {
    id: 'thunder-junction',
    shortLabel: 'Thunder Junction',
    label: 'Thunder Junction Park',
    schedule: 'Thursday 4–6pm'
  },
  {
    id: 'sand-hollow',
    shortLabel: 'Sand Hollow',
    label: 'Sand Hollow State Park',
    schedule: 'Friday 11am–1pm · Sunday 11am–1pm'
  },
  {
    id: 'vernon-worthen',
    shortLabel: 'Vernon Worthen',
    label: 'Vernon Worthen Park',
    schedule: 'Saturday 10am–12pm'
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
    key: 'classic',
    name: '#1 Agave, Chia, Almonds, Strawberries & Blueberries',
    toppings: ['agave', 'chia', 'almond-slices', 'strawberries', 'blueberries']
  },
  {
    key: 'seasonal',
    name: '#2 Seasonal Bowl',
    toppings: ['agave', 'chia', 'almond-slices', 'mangos', 'pomegranate']
  },
  {
    key: 'banana-dates',
    name: '#3 Banana & Dates Bowl',
    toppings: ['agave', 'chia', 'almond-slices', 'bananas', 'dates']
  }
]

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

const basePriceCents = computed(() => {
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
      nutsCents += NUT_PRICE_CENTS * t.count
    } else if (t.category === 'fruit') {
      fruitCents += FRUIT_PRICE_CENTS * t.count
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
  const sizeLabel = form.value.size === 'snack' ? 'Snack 4 oz' : 'Meal 6 oz'
  let brandLabel
  if (form.value.cottageType === 'premium') {
    brandLabel = 'Good Culture (Premium)'
  } else {
    brandLabel = form.value.standardBrand === 'lactaid' ? 'Lactaid' : 'Daisy'
  }
  return `${sizeLabel} – ${brandLabel}`
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
    const res = await $fetch('/api/orders', {
      method: 'POST',
      body
    })

    if (res && res.success) {
      message.value = 'Order placed! Check your Supabase dashboard 🎉'
    } else {
      message.value = 'Something went wrong placing your order.'
    }
  } catch (error) {
    console.error('Order error', error)
    message.value = 'Error placing order. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
