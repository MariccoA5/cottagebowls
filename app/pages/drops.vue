<template>
  <UContainer class="py-12">
    <h1 class="text-4xl font-bold text-amber-800 text-center mb-8">St. George Drop-Offs ☀️</h1>
    <p class="text-xl text-center mb-12">Meet me at these spots • Fresh bowls ready • $15 each (pay on pickup)</p>

    <!-- Map -->
<div id="map" class="h-96 w-full rounded-2xl overflow-hidden shadow-2xl mb-16"></div>

<script setup>
import { onMounted, ref } from 'vue'
import mapboxgl from 'mapbox-gl'

// Paste your token here (safe for public embeds on free tier)
mapboxgl.accessToken = 'pk.eyJ1IjoiY290dGFnZWJvd2xzIiwiYSI6ImNtanJ2dzdwZTJ6N3Qza3B5eGZ1NDJjajQifQ.bRMqdcX4WnWqKxj5Urf44A'  // Replace with pk.yourtoken...

const map = ref(null)

onMounted(() => {
  map.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',  // Clean bright style (or try 'streets-v12' or custom sunny)
    center: [-113.5684, 37.0965],
    zoom: 12
  })

  // Add markers from your drops data
  drops.forEach((drop, index) => {
    const marker = new mapboxgl.Marker({ color: '#FBBF24' })  // Sunny amber!
      .setLngLat([-113.5684 + (Math.random() - 0.5)*0.1, 37.0965 + (Math.random() - 0.5)*0.1])  // Replace with real coords
      .setPopup(new mapboxgl.Popup().setHTML(`<strong>${drop.location}</strong><br>${drop.schedule}<br>${drop.address}`))
      .addTo(map.value)

    // Store reference for dynamic linking
    drop.marker = marker
  })

  // Add navigation controls
  map.value.addControl(new mapboxgl.NavigationControl())
})

// Function to fly to marker when card clicked
function focusDrop(drop) {
  if (drop.marker) {
    map.value.flyTo({ center: drop.marker.getLngLat(), zoom: 15 })
    drop.marker.togglePopup()
  }
}
</script>

<!-- Update your cards to call focusDrop on click -->
<UCard v-for="drop in drops" :key="drop.id" @click="focusDrop(drop)" class="cursor-pointer hover:shadow-xl transition">
  <!-- Your existing card content + preorder button -->
</UCard>

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