<template>
  <UContainer class="py-12">
    <h1 class="text-4xl font-bold text-amber-800 text-center mb-8">
      St. George Drop-Offs ☀️
    </h1>
    <p class="text-xl text-center mb-12">
      Meet me at these spots • Fresh bowls ready • $15 each (pay on pickup)
    </p>

    <!-- Professional Dynamic Map -->
    <div
      id="map"
      class="h-96 w-full rounded-2xl overflow-hidden shadow-2xl mb-16"
    />

    <!-- List/Grid with Click-to-Focus -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <UCard
        v-for="drop in drops"
        :key="drop.id"
        class="cursor-pointer transition hover:shadow-xl hover:scale-105"
        @click="focusDrop(drop)"
      >
        <template #header>
          <h3 class="text-2xl font-bold text-amber-700">
            {{ drop.location }}
          </h3>
          <p class="text-lg">
            {{ drop.schedule }}
          </p>
        </template>
        <p class="mb-4">
          {{ drop.address }}
        </p>
        <UButton
          color="primary"
          block
          @click.stop="preorder(drop)"
        >
          Preorder & Meet Here ($15)
        </UButton>
      </UCard>
    </div>

    <!-- Global Preorder Section -->
    <div class="mt-20 py-12 bg-amber-50 rounded-3xl text-center">
      <h2 class="text-3xl font-bold text-amber-800 mb-6">
        Outside St. George? Preorder & Invest ☀️
      </h2>
      <p class="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
        First come, first served when we expand/ship • Your preorder fuels growth (no refunds — you're in on the dream!)
      </p>
      <UButton
        size="xl"
        color="primary"
        @click="globalPreorder"
      >
        Preorder Bowls ($20+ shipped)
      </UButton>
    </div>
  </UContainer>
</template>

<script setup>
import { onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'

// REPLACE THIS WITH YOUR MAPBOX PUBLIC TOKEN
mapboxgl.accessToken = 'pk.eyJ1IjoiY290dGFnZWJvd2xzIiwiYSI6ImNtanJ2dzdwZTJ6N3Qza3B5eGZ1NDJjajQifQ.bRMqdcX4WnWqKxj5Urf44A'

const drops = [
  {
    id: 1,
    location: 'Sand Hollow Entrance',
    address: '3351 Sand Hollow Rd',
    schedule: 'Fill Out Application',
    lngLat: [-113.38984, 37.11816] // 37.11816, -113.38984 Sand Hollow
  },
  {
    id: 2,
    location: 'Pioneer Park',
    address: '1560 Grapevine Crossing Rd Suite 2',
    schedule: 'Fill Out Application',
    lngLat: [-113.4844, 37.14483] // 37.14483, -113.4844 Approximate from red hills area
  },
  {
    id: 3,
    location: 'Intersection',
    address: '1851 S Dixie Dr',
    schedule: 'Fill Out Application',
    lngLat: [-113.37285, 37.16678] // 37.16678, -113.37285 Intersection
  },
  {
    id: 4,
    location: 'Ace Parking Lot',
    address: '607 S Mall Dr',
    schedule: 'Fill Out Application',
    lngLat: [-113.53281, 37.09848] // 37.09848, -113.53281 Ace
  },
  {
    id: 5,
    location: 'Utah Tech SET',
    address: '798 E 100 S',
    schedule: 'Fill Out Application',
    lngLat: [-113.56682, 37.10441] // 37.10441, -113.56682 Utah Tech SET
  }
]

// Add marker reference to each drop
drops.forEach(drop => drop.marker = null)

let map = null

onMounted(() => {
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v12', // Clean bright style
    center: [-113.5684, 37.0965],
    zoom: 10
  })

  // Add navigation controls (zoom +/-)
  map.addControl(new mapboxgl.NavigationControl(), 'top-right')

  // Create markers
  drops.forEach((drop) => {
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<strong class="text-amber-700">${drop.location}</strong><br>${drop.schedule}<br>${drop.address}`
    )

    const marker = new mapboxgl.Marker({ color: '#FBBF24' }) // Sunny amber
      .setLngLat(drop.lngLat)
      .setPopup(popup)
      .addTo(map)

    drop.marker = marker
  })
})

// Click card → fly to marker + open popup
function focusDrop(drop) {
  if (drop.marker && map) {
    map.flyTo({
      center: drop.lngLat,
      zoom: 16,
      essential: true
    })
    drop.marker.togglePopup()
  }
}

function preorder(drop) {
  alert(`Preorder locked in for ${drop.location} on ${drop.schedule}! I'll have your fresh bowl ready. Pay $15 when we meet. ☀️`)
}

function globalPreorder() {
  alert('Thank you for believing in Cottage Bowls! Email cottagebowls@gmail.com with your preorder amount and shipping address. Early investors get priority bowls + future Cottage Coin perks. No refunds — all in on fresh goodness! 🥣☀️')
}
</script>
