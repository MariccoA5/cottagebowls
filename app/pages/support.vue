<template>
  <UContainer class="py-16 space-y-16">
    <!-- Intro -->
    <section class="max-w-3xl">
      <h1 class="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
        Support Cottage Bowls
      </h1>
      <p class="text-lg text-gray-700">
        Cottage Bowls is a small, family-run business with big dreams: making
        healthy, high-protein bowls easy to grab all across St. George (and
        beyond). Your support helps us grow from a local favorite into a
        community-powered movement.
      </p>
    </section>

    <!-- Contact information -->
    <section class="grid gap-8 lg:grid-cols-2 items-start">
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold text-amber-800">
          Get in Touch
        </h2>
        <p class="text-gray-700">
          Have questions about orders, partnerships, or events? Reach out any
          time—we&apos;d love to hear from you.
        </p>

        <div class="space-y-3 text-sm text-gray-800">
          <div class="flex items-start gap-3">
            <span class="font-semibold w-20">Email</span>
            <a
              href="mailto:hello@cottagebowls.com"
              class="text-sky-700 hover:underline break-all"
            >
              hello@cottagebowls.com
            </a>
          </div>
          <div class="flex items-start gap-3">
            <span class="font-semibold w-20">Phone</span>
            <a
              href="tel:+14355550123"
              class="text-sky-700 hover:underline"
            >
              (435) 555-0123
            </a>
          </div>
          <div class="flex items-start gap-3">
            <span class="font-semibold w-20">Instagram</span>
            <a
              href="https://instagram.com/cottagebowls"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sky-700 hover:underline break-all"
            >
              @cottagebowls
            </a>
          </div>
          <div class="flex items-start gap-3">
            <span class="font-semibold w-20">Location</span>
            <div class="text-gray-700 flex-1">
              <p>St. George, Utah</p>
              <p>Local pickup at designated drop spots (see the Locations page).</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Support / Donate -->
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold text-amber-800">
          How You Can Support Us
        </h2>
        <p class="text-gray-700">
          Every order, share, and donation moves us closer to expanding our
          kitchen, adding more pickup locations, and eventually offering wider
          delivery.
        </p>

        <UCard class="bg-amber-50/70 border-amber-100">
          <h3 class="text-lg font-semibold text-amber-800 mb-2">
            Donate to Fuel Our Growth
          </h3>
          <p class="text-gray-700 text-sm mb-4">
            Think of it like helping your favorite local spot get to the next level.
            Donations go toward equipment, ingredients, and scaling our operations.
          </p>

          <UForm @submit="submitDonation">
            <div class="space-y-3">
              <div class="grid md:grid-cols-2 gap-3">
                <UFormField label="Name (optional)">
                  <UInput
                    v-model="donateForm.name"
                    placeholder="Jane Doe"
                  />
                </UFormField>
                <UFormField
                  label="Email"
                  required
                >
                  <UInput
                    v-model="donateForm.email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </UFormField>
              </div>

              <div class="grid md:grid-cols-2 gap-3">
                <UFormField label="Phone (optional)">
                  <UInput
                    v-model="donateForm.phone"
                    placeholder="(555) 555-5555"
                  />
                </UFormField>
                <UFormField
                  label="Amount (USD)"
                  required
                >
                  <UInput
                    v-model.number="donateForm.amount"
                    type="number"
                    :min="1"
                    :step="1"
                    placeholder="25"
                  />
                </UFormField>
              </div>

              <UFormField label="Note (optional)">
                <UTextarea
                  v-model="donateForm.note"
                  placeholder="Leave a note or tell us how you found Cottage Bowls."
                  :rows="3"
                />
              </UFormField>

              <div class="flex flex-wrap gap-3 items-center">
                <UButton
                  type="submit"
                  color="primary"
                  size="lg"
                  variant="solid"
                  :loading="donating"
                >
                  Donate${{ donateForm.amount || 25 }}
                </UButton>
                <UButton
                  color="primary"
                  variant="ghost"
                  to="/locations"
                >
                  Order a bowl instead
                </UButton>
              </div>

              <p
                v-if="donateMessage"
                class="text-sm text-center text-gray-700"
              >
                {{ donateMessage }}
              </p>
            </div>
          </UForm>
        </UCard>

        <div class="space-y-2 text-sm text-gray-700">
          <h3 class="text-base font-semibold text-amber-800">
            Future Rewards for Supporters
          </h3>
          <p>
            As we grow, we plan to introduce reward tiers for those who support
            us early—think free toppings, exclusive flavors, limited-edition
            merch, and early access to new locations.
          </p>
          <p>
            Join our community now, and you&apos;ll be the first to hear when these
            tiers go live.
          </p>
        </div>
      </div>
    </section>
  </UContainer>
</template>

<script setup>
const donating = ref(false)
const donateMessage = ref('')

const donateForm = ref({
  name: '',
  email: '',
  phone: '',
  amount: 25,
  note: ''
})

async function submitDonation() {
  donating.value = true
  donateMessage.value = ''

  const amountNumber = Number(donateForm.value.amount)

  if (!donateForm.value.email || !amountNumber || amountNumber <= 0) {
    donateMessage.value = 'Please enter a valid email and donation amount.'
    donating.value = false
    return
  }

  const amountCents = Math.round(amountNumber * 100)

  try {
    const res = await $fetch('/api/donate-checkout', {
      method: 'POST',
      body: {
        name: donateForm.value.name,
        email: donateForm.value.email,
        phone: donateForm.value.phone,
        note: donateForm.value.note,
        amount_cents: amountCents
      }
    })

    if (res && res.url) {
      window.location.href = res.url
      return
    }

    donateMessage.value = 'Something went wrong starting your donation.'
  } catch (error) {
    console.error('Donate checkout error', error)
    donateMessage.value = 'Error starting donation. Please try again.'
  } finally {
    donating.value = false
  }
}
</script>
