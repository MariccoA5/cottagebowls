<template>
  <UContainer class="py-12">
    <h1 class="text-4xl font-bold text-amber-800 text-center mb-12">St. George Drop-Offs ☀️</h1>
    <p class="text-xl text-center mb-8">Meet me here on these dates/times • Fresh bowls with your toppings • $15 each</p>

    <!-- Interactive Map (Leaflet – easy & free) -->
    <div class="h-96 rounded-xl overflow-hidden shadow-2xl mb-12">
      <ClientOnly>
        <LMap :zoom="12" :center="[37.0965, -113.5684]">
          <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <!-- Example Pins – add more -->
          <LMarker :lat-lng="[37.1043, -113.5841]"><LPopup>Cafe FeelLove – Fridays 8-10AM</LPopup></LMarker>
          <LMarker :lat-lng="[37.135, -113.510]"><LPopup>Pioneer Park – Wednesdays 5-7PM</LPopup></LMarker>
          <LMarker :lat-lng="[37.078, -113.577]"><LPopup>Thunder Junction Park – Saturdays 9-11AM</LPopup></LMarker>
        </LMap>
      </ClientOnly>
    </div>

    <!-- List View + Purchase Buttons -->
    <div class="grid md:grid-cols-2 gap-8">
      <UCard v-for="drop in drops" :key="drop.id">
        <template #header>
          <h2 class="text-2xl font-bold">{{ drop.location }}</h2>
          <p class="text-gray-600">{{ drop.date }} • {{ drop.time }}</p>
        </template>
        <p>{{ drop.address }}</p>
        <UButton color="primary" class="mt-4" @click="preorder(drop.id)">Preorder & Meet Here ($15)</UButton>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup>
const drops = [
  { id: 1, location: 'Cafe FeelLove', address: '2 W St George Blvd', date: 'Every Friday', time: '8-10AM' },
  { id: 2, location: 'Pioneer Park', address: '375 Red Hills Pkwy', date: 'Wednesdays', time: '5-7PM' },
  { id: 3, location: 'Thunder Junction Park', address: '1851 S Dixie Dr', date: 'Saturdays', time: '9-11AM' },
  // Add more real spots here!
]

// Simple preorder alert (later connect to Stripe/BTC)
function preorder(id) {
  alert(`Preorder confirmed for drop #${id}! Pay on meetup or preorder online soon.`)
}
</script>