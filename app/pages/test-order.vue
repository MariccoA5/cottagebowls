<template>
  <UContainer class="py-12 max-w-2xl mx-auto">
    <h1 class="text-4xl font-bold text-amber-800 text-center mb-8">
      Test Order Form
    </h1>
    <UForm @submit="submit">
      <UFormField
        label="Name"
        required
      >
        <UInput
          v-model="form.name"
          placeholder="Maricco A."
        />
      </UFormField>
      <UFormField
        label="Email"
        required
      >
        <UInput
          v-model="form.email"
          type="email"
          placeholder="admin@cottagebowls.com"
        />
      </UFormField>
      <UFormField label="Phone">
        <UInput
          v-model="form.phone"
          placeholder="(143)420-6969"
        />
      </UFormField>
      <UFormField label="Location">
        <UInput
          v-model="form.location"
          placeholder="e.g. Cafe FeelLove Friday"
        />
      </UFormField>
      <UFormField label="Toppings (+$2 each)">
        <UCheckbox
          v-for="topping in toppings"
          :key="topping"
          v-model="form.toppings"
          :label="topping"
          :value="topping"
          class="mb-2"
        />
      </UFormField>
      <UFormField label="Quantity">
        <UInput
          v-model.number="form.quantity"
          type="number"
          :min="1"
        />
      </UFormField>
      <UButton
        type="submit"
        size="xl"
        color="primary"
        block
        :loading="loading"
      >
        Submit Test Order
      </UButton>
    </UForm>
    <p
      v-if="message"
      class="mt-8 text-center text-xl"
    >
      {{ message }}
    </p>
  </UContainer>
</template>

<script setup>
const toppings = [
  'Fresh Berries 🍓',
  'Granola Crunch 🥜',
  'Honey Drizzle 🍯',
  'Chia Seeds 🌱',
  'Almond Butter 🧈',
  'Coconut Flakes 🥥',
  'Banana Slices 🍌',
  'Dark Chocolate Chips 🍫'
]
const form = ref({
  name: '',
  email: '',
  phone: '',
  location: '',
  toppings: [], // array of selected strings
  quantity: 1
})

const loading = ref(false)
const message = ref('')

async function submit() {
  loading.value = true
  const body = {
    ...form.value,
    toppings: form.value.toppings,
    total: 15 * form.value.quantity + form.value.toppings.length * 2 * form.value.quantity
  }

  const res = await $fetch('/api/orders', {
    method: 'POST',
    body
  })

  loading.value = false
  message.value = res.success ? 'Order saved! Check Supabase dashboard 🎉' : 'Error: ' + res.error
}
</script>
