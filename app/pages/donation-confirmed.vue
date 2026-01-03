<template>
  <UContainer class="py-12 max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold text-amber-800 text-center mb-4">
      Thank You for Supporting Cottage Bowls 🎉
    </h1>

    <p class="text-center text-gray-700 mb-8">
      Your donation helps us grow our kitchen, add more pickup locations, and serve more
      high-protein bowls in St. George.
    </p>

    <div
      v-if="pending"
      class="text-center text-gray-600"
    >
      Loading your donation details...
    </div>

    <div
      v-else-if="error"
      class="text-center text-red-600"
    >
      <p class="mb-4">
        We couldn't find your donation details. If you just completed your donation,
        try refreshing this page in a moment.
      </p>
      <UButton
        to="/support"
        color="primary"
        variant="soft"
      >
        Back to Support page
      </UButton>
    </div>

    <div
      v-else-if="donation"
      class="space-y-6"
    >
      <UCard>
        <h2 class="text-xl font-semibold text-amber-800 mb-3">
          Supporter Details
        </h2>
        <p class="text-gray-800">
          <span class="font-semibold">Name:</span>
          {{ donation.donor_name || 'Friend of Cottage Bowls' }}
        </p>
        <p class="text-gray-800">
          <span class="font-semibold">Email:</span>
          {{ donation.email }}
        </p>
        <p
          v-if="donation.phone"
          class="text-gray-800"
        >
          <span class="font-semibold">Phone:</span>
          {{ donation.phone }}
        </p>
      </UCard>

      <UCard>
        <h2 class="text-xl font-semibold text-amber-800 mb-3">
          Donation Summary
        </h2>
        <p class="text-gray-800">
          <span class="font-semibold">Amount:</span>
          ${{ (donation.amount_cents / 100).toFixed(2) }}
        </p>
        <p
          v-if="donation.note"
          class="text-gray-800 mt-2"
        >
          <span class="font-semibold">Your note:</span>
          {{ donation.note }}
        </p>
        <p class="text-sm text-gray-600 mt-3">
          A payment receipt has also been emailed to you via Stripe.
        </p>
      </UCard>

      <UCard>
        <h2 class="text-xl font-semibold text-amber-800 mb-3">
          What's Next
        </h2>
        <p class="text-gray-700 mb-2">
          As we grow, we plan to introduce reward tiers for early supporters like you—
          think special perks, exclusive flavors, and early access to new locations.
        </p>
        <p class="text-gray-700 mb-4">
          We'll reach out using the email you provided when those are ready.
        </p>
        <div class="flex flex-wrap gap-3">
          <UButton
            to="/order"
            color="primary"
          >
            Order a bowl
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
const donation = ref(null)

onMounted(async () => {
  if (!sessionId.value) {
    error.value = new Error('Missing session_id')
    return
  }

  pending.value = true

  try {
    const res = await $fetch('/api/donation-by-session', {
      params: {
        session_id: sessionId.value
      }
    })

    if (res && res.success && res.donation) {
      donation.value = res.donation
    } else {
      error.value = new Error('Donation not found')
    }
  } catch (err) {
    console.error('Error loading donation', err)
    error.value = err
  } finally {
    pending.value = false
  }
})
</script>
