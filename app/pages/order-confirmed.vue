<template>
  <UContainer class="py-12 max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold text-amber-800 text-center mb-4">
      Order Confirmed 🎉
    </h1>

    <p class="text-center text-gray-700 mb-8">
      Thank you for your order. We've received your payment and saved your pickup details below.
    </p>

    <div
      v-if="pending"
      class="text-center text-gray-600"
    >
      Loading your order...
    </div>

    <div
      v-else-if="error"
      class="text-center text-red-600"
    >
      <p class="mb-4">
        We couldn't find your order details. If you just paid, try refreshing this page in a moment.
      </p>
      <UButton
        to="/order"
        color="primary"
        variant="soft"
      >
        Back to order page
      </UButton>
    </div>

    <div
      v-else-if="order"
      class="space-y-6"
    >
      <UCard>
        <h2 class="text-xl font-semibold text-amber-800 mb-3">
          Pickup Details
        </h2>
        <p class="text-gray-800">
          <span class="font-semibold">Name:</span>
          {{ order.customer_name }}
        </p>
        <p class="text-gray-800">
          <span class="font-semibold">Email:</span>
          {{ order.email }}
        </p>
        <p class="text-gray-800 mb-3">
          <span class="font-semibold">Phone:</span>
          {{ order.phone }}
        </p>
        <p class="text-gray-800">
          <span class="font-semibold">Location:</span>
          {{ order.location_label }}
        </p>
        <p class="text-sm text-gray-600">
          Pickup schedule: see the Locations page for the latest schedule.
        </p>
      </UCard>

      <UCard>
        <h2 class="text-xl font-semibold text-amber-800 mb-3">
          Bowl Summary
        </h2>
        <p class="text-gray-800">
          <span class="font-semibold">Quantity:</span>
          {{ order.quantity }}
        </p>
        <p class="text-gray-800">
          <span class="font-semibold">Size:</span>
          {{ order.size === 'snack' ? 'Snack 4 oz' : 'Meal 6 oz' }}
        </p>
        <p class="text-gray-800 mb-3">
          <span class="font-semibold mr-1">Cottage cheese:</span>
          <span v-if="order.cottage_type === 'premium'">
            Good Culture (Premium)
          </span>
          <span v-else>
            {{ order.standard_brand === 'lactaid' ? 'Lactaid' : 'Daisy' }}
          </span>
        </p>

        <p class="font-semibold mb-2">
          Toppings
        </p>
        <ul class="text-sm text-gray-800 list-disc list-inside mb-3">
          <li
            v-for="t in normalizedToppings"
            :key="t.key"
          >
            {{ t.label }} × {{ t.count }}
          </li>
          <li
            v-if="normalizedToppings.length === 0"
            class="text-gray-500"
          >
            No toppings selected
          </li>
        </ul>

        <p class="text-gray-800">
          <span class="font-semibold">Preset:</span>
          <span v-if="order.preset_key">
            {{ order.preset_key }}
          </span>
          <span v-else>
            Custom bowl
          </span>
        </p>
      </UCard>

      <UCard>
        <h2 class="text-xl font-semibold text-amber-800 mb-3">
          Total Paid
        </h2>
        <p class="text-2xl font-bold text-amber-700">
          ${{ (order.total_cents / 100).toFixed(2) }}
        </p>
        <p class="text-sm text-gray-600 mt-2">
          Show this screen or your email receipt when you arrive for pickup.
        </p>
        <div class="mt-4 flex flex-wrap gap-3">
          <UButton
            to="/order"
            color="primary"
          >
            Start another order
          </UButton>
          <UButton
            to="/"
            variant="ghost"
          >
            Back to home
          </UButton>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup>
const route = useRoute()

const sessionId = computed(() => {
  const raw = route.query.session_id || route.query.sessionId
  return Array.isArray(raw) ? raw[0] : raw
})

const pending = ref(false)
const error = ref(null)
const order = ref(null)

const normalizedToppings = computed(() => {
  const toppingsValue = order.value?.toppings
  if (!toppingsValue) {
    return []
  }

  const arr = Array.isArray(toppingsValue) ? toppingsValue : []

  return arr
    .map(t => ({
      key: t.key,
      label: t.label,
      category: t.category,
      count: t.count
    }))
    .filter(t => t.count > 0)
})

onMounted(async () => {
  if (!sessionId.value) {
    error.value = new Error('Missing session_id')
    return
  }

  pending.value = true

  try {
    const res = await $fetch('/api/order-by-session', {
      params: {
        session_id: sessionId.value
      }
    })

    if (res && res.success && res.order) {
      order.value = res.order
    } else {
      error.value = new Error('Order not found')
    }
  } catch (err) {
    console.error('Error loading confirmed order', err)
    error.value = err
  } finally {
    pending.value = false
  }
})
</script>
