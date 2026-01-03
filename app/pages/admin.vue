<template>
  <UContainer class="py-12 max-w-6xl mx-auto space-y-8">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-amber-800">
          Admin Dashboard
        </h1>
        <p class="text-gray-700 text-sm">
          Internal view of recent paid orders and donations. Not intended for public users.
        </p>
      </div>
    </div>

    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div class="max-w-md">
        <UFormField label="Admin key">
          <UInput
            v-model="adminKey"
            type="password"
            placeholder="Enter admin key (set in ADMIN_DASHBOARD_KEY)"
            class="w-64"
            @blur="onAdminKeyBlur"
          />
        </UFormField>
        <p class="text-xs text-gray-500 mt-1">
          Key is stored only in this browser and sent as a header to admin APIs.
        </p>
      </div>
    </div>

    <div class="grid gap-8 lg:grid-cols-4 items-start">
      <!-- Orders -->
      <UCard class="lg:col-span-3">
        <template #header>
          <div class="flex items-center justify-between gap-2">
            <div>
              <h2 class="text-lg font-semibold text-amber-800">
                Paid Orders
              </h2>
              <p class="text-xs text-gray-600">
                View paid orders for today, this week, or this month.
              </p>
            </div>
            <div class="flex items-center gap-2">
              <USelect
                v-model="ordersScope"
                :options="orderScopeOptions"
                size="xs"
                class="w-32"
              />
              <UButton
                size="xs"
                color="gray"
                variant="ghost"
                :loading="loadingOrders"
                @click="loadOrders(ordersScope)"
              >
                Refresh
              </UButton>
            </div>
          </div>
        </template>

        <div v-if="loadingOrders" class="text-sm text-gray-600">
          Loading orders...
        </div>
        <div v-else-if="ordersError" class="text-sm text-red-600">
          Failed to load orders.
        </div>
        <div v-else>
          <p class="text-xs text-gray-600 mb-2">
            Showing {{ orders.length }} paid order{{ orders.length === 1 ? '' : 's' }}
            for
            <span class="font-medium">
              {{ ordersScopeLabel }}
            </span>.
          </p>
          <div class="space-y-3 max-h-[28rem] overflow-auto pr-1">
            <UCard
              v-for="o in orders"
              :key="o.id"
              class="border-amber-100 bg-amber-50/40"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="space-y-1 text-sm text-gray-800">
                  <p class="font-semibold">
                    {{ o.customer_name }}
                    <span class="text-xs text-gray-500 ml-1">
                      (Quantity: x{{ o.quantity }})
                    </span>
                  </p>
                  <p class="text-xs text-gray-600">
                    {{ o.email }}
                    <span v-if="o.phone">
                      · {{ o.phone }}
                    </span>
                  </p>
                  <p class="text-xs text-gray-700">
                    {{ o.location_label }}
                  </p>
                  <p class="text-xs text-gray-600">
                    Size: {{ o.size === 'snack' ? 'Snack 4 oz' : 'Meal 6 oz' }} ·
                    Cottage: {{ o.cottage_type === 'premium' ? 'Good Culture' : (o.standard_brand === 'lactaid' ? 'Lactaid' : 'Daisy') }}
                  </p>
                  <p class="text-xs text-gray-600">
                    Toppings:
                    <span class="text-gray-700">
                      {{ summarizeToppings(o) }}
                    </span>
                  </p>
                  <p class="text-xs text-gray-600">
                    Total: ${{ (o.total_cents / 100).toFixed(2) }}
                  </p>
                  <p class="text-xs text-gray-500">
                    Created: {{ formatDateTime(o.created_at) }}
                  </p>
                </div>
              </div>
            </UCard>
            <p
              v-if="orders.length === 0"
              class="text-xs text-gray-500"
            >
              No paid orders in this time range.
            </p>
          </div>
        </div>
      </UCard>

      <!-- Donations -->
      <UCard class="lg:col-span-1">
        <template #header>
          <div class="flex items-center justify-between gap-2">
            <div>
              <h2 class="text-lg font-semibold text-amber-800">
                Recent Donations
              </h2>
              <p class="text-xs text-gray-600">
                Compact view of paid donations.
              </p>
            </div>
            <div class="flex items-center gap-2">
              <USelect
                v-model="donationsScope"
                :options="donationScopeOptions"
                size="xs"
                class="w-32"
              />
              <UButton
                size="xs"
                color="gray"
                variant="ghost"
                :loading="loadingDonations"
                @click="loadDonations(donationsScope)"
              >
                Refresh
              </UButton>
            </div>
          </div>
        </template>

        <div v-if="loadingDonations" class="text-sm text-gray-600">
          Loading donations...
        </div>
        <div v-else-if="donationsError" class="text-sm text-red-600">
          Failed to load donations.
        </div>
        <div v-else>
          <p class="text-xs text-gray-600 mb-2">
            Showing {{ donations.length }} paid donation{{ donations.length === 1 ? '' : 's' }}
            for
            <span class="font-medium">
              {{ donationsScopeLabel }}
            </span>.
          </p>
          <div class="space-y-3 max-h-[28rem] overflow-auto pr-1">
            <UCard
              v-for="d in donations"
              :key="d.id"
              class="border-amber-100 bg-amber-50/40"
            >
              <div class="space-y-1 text-sm text-gray-800">
                <p class="font-semibold">
                  {{ d.donor_name || 'Friend of Cottage Bowls' }}
                </p>
                <p class="text-xs text-gray-600">
                  {{ d.email }}
                  <span v-if="d.phone">
                    · {{ d.phone }}
                  </span>
                </p>
                <p class="text-xs text-gray-600">
                  Amount: ${{ (d.amount_cents / 100).toFixed(2) }}
                </p>
                <p class="text-xs text-gray-500">
                  Created: {{ formatDateTime(d.created_at) }}
                </p>
              </div>
            </UCard>
            <p
              v-if="donations.length === 0"
              class="text-xs text-gray-500"
            >
              No paid donations in this time range.
            </p>
          </div>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const loadingOrders = ref(false)
const ordersError = ref(false)
const orders = ref([])
const ordersScope = ref('today')

const loadingDonations = ref(false)
const donationsError = ref(false)
const donations = ref([])
const donationsScope = ref('recent')

const orderScopeOptions = ['today', 'week', 'month']

const donationScopeOptions = ['recent', 'today']

const adminKey = ref('')

const ordersScopeLabel = computed(() => {
  if (ordersScope.value === 'week') return 'this week'
  if (ordersScope.value === 'month') return 'this month'
  return 'today'
})

const donationsScopeLabel = computed(() => {
  if (donationsScope.value === 'today') return 'today'
  return 'recent'
})

function formatDateTime(value) {
  if (!value) return ''
  try {
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return String(value)
    return d.toLocaleString()
  } catch {
    return String(value)
  }
}

async function loadOrders(scope = 'today') {
  loadingOrders.value = true
  ordersError.value = false
  ordersScope.value = scope

  try {
    const res = await $fetch('/api/admin-orders', {
      params: { scope },
      headers: adminKeyHeader()
    })
    if (res && res.success && Array.isArray(res.orders)) {
      orders.value = res.orders
    } else {
      ordersError.value = true
    }
  } catch (error) {
    console.error('Admin orders fetch error', error)
    ordersError.value = true
  } finally {
    loadingOrders.value = false
  }
}

async function loadDonations(scope = 'recent') {
  loadingDonations.value = true
  donationsError.value = false
  donationsScope.value = scope

  try {
    const res = await $fetch('/api/admin-donations', {
      params: { scope },
      headers: adminKeyHeader()
    })
    if (res && res.success && Array.isArray(res.donations)) {
      donations.value = res.donations
    } else {
      donationsError.value = true
    }
  } catch (error) {
    console.error('Admin donations fetch error', error)
    donationsError.value = true
  } finally {
    loadingDonations.value = false
  }
}

function summarizeToppings(order) {
  const t = order && order.toppings
  if (!t || !Array.isArray(t)) return 'No toppings selected'

  const parts = t
    .filter(item => item && (item.count ?? 0) > 0)
    .map(item => `${item.label || item.key} x${item.count ?? 1}`)

  return parts.length > 0 ? parts.join(', ') : 'No toppings selected'
}

function adminKeyHeader() {
  if (!adminKey.value) return {}
  return { 'x-admin-key': adminKey.value }
}

function onAdminKeyBlur() {
  if (import.meta.client) {
    if (adminKey.value) {
      localStorage.setItem('adminKey', adminKey.value)
    } else {
      localStorage.removeItem('adminKey')
    }
  }
}

watch(ordersScope, (scope) => {
  loadOrders(scope)
})

watch(donationsScope, (scope) => {
  loadDonations(scope)
})

onMounted(() => {
  if (import.meta.client) {
    const stored = localStorage.getItem('adminKey')
    if (stored) {
      adminKey.value = stored
    }
  }
  loadOrders('today')
  loadDonations('recent')
})
</script>
