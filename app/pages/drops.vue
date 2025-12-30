<template>
  <UContainer class="py-12">
    <h1 class="text-4xl font-bold text-amber-800 text-center mb-8">St. George Drop-Offs ☀️</h1>
    <p class="text-xl text-center mb-12">Meet me at these spots • Fresh bowls ready • $15 each (pay on pickup)</p>

    <!-- Map -->
    <div class="h-96 w-full rounded-2xl overflow-hidden shadow-2xl mb-16 relative">
      <ClientOnly>
        <LMap :zoom="13" :center="[37.0965, -113.5684]" :options="{ zoomControl: true }">
          <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"/>
          <LMarker :lat-lng="[37.1085, -113.5835]"><LPopup>Cafe FeelLove – Fridays 8-10AM</LPopup></LMarker>
          <LMarker :lat-lng="[37.130, -113.508]"><LPopup>Pioneer Park – Wednesdays 5-7PM</LPopup></LMarker>
          <LMarker :lat-lng="[37.078, -113.577]"><LPopup>Thunder Junction Park – Saturdays 9-11AM</LPopup></LMarker>
          <LMarker :lat-lng="[37.100, -113.565]"><LPopup>Town Square Park – Sundays 10AM-Noon</LPopup></LMarker>
          <LMarker :lat-lng="[37.115, -113.550]"><LPopup>FeelLove Coffee Riverside – Tuesdays 7-9AM</LPopup></LMarker>
        </LMap>
      </ClientOnly>
    </div>

    <!-- List + Preorder -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <UCard v-for="drop in drops" :key="drop.id">
        <template #header>
          <h3 class="text-2xl font-bold text-amber-700">{{ drop.location }}</h3>
          <p class="text-lg">{{ drop.schedule }}</p>
        </template>
        <p class="mb-4">{{ drop.address }}</p>
        <UButton color="primary" block @click="preorder(drop)">Preorder & Meet Here ($15)</UButton>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup>
import { onMounted } from 'vue'

const mapContainer = ref(null)
const map = ref(null)

onMounted(() => {
  nextTick(() => {
    if (map.value?.mapObject) {
      map.value.mapObject.invalidateSize()
    }
  })
})
const drops = [
  { id: 1, location: 'Cafe FeelLove', address: '2 W St George Blvd', schedule: 'Every Friday 8-10AM' },
  { id: 2, location: 'Pioneer Park', address: '375 Red Hills Pkwy', schedule: 'Wednesdays 5-7PM' },
  { id: 3, location: 'Thunder Junction All Abilities Park', address: '1851 S Dixie Dr', schedule: 'Saturdays 9-11AM' },
  { id: 4, location: 'Town Square Park', address: '50 S Main St', schedule: 'Sundays 10AM-Noon' },
  { id: 5, location: 'FeelLove Coffee (Riverside)', address: '558 E Riverside Dr', schedule: 'Tuesdays 7-9AM' },
]

function preorder(drop) {
  alert(`Preorder locked in for ${drop.location} on ${drop.schedule}! I'll have your fresh bowl ready. Pay $15 when we meet. ☀️`)
  // Later: connect to form/email/Stripe
}
</script>