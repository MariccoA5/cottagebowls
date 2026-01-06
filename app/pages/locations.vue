<template>
  <UContainer class="py-12">
    <h1 class="text-4xl font-bold text-amber-800 text-center mb-8">
      Dixie Springs Park Pickup ☀️
    </h1>
    <p class="text-xl text-center mb-12">
      Pre-order your bowls online and pick them up at Dixie Springs Park in Hurricane.
    </p>

    <!-- Map -->
    <div
      id="map"
      class="h-96 w-full rounded-2xl overflow-hidden shadow-2xl mb-16"
    />

    <!-- Location cards -->
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
          :to="`/order?locationId=${drop.orderLocationId}`"
        >
          Reserve A Bowl & Meet Here
        </UButton>
      </UCard>
    </div>

    <!-- Support CTA -->
    <div class="mt-20 py-12 bg-amber-50 rounded-3xl text-center">
      <h2 class="text-3xl font-bold text-amber-800 mb-6">
        Want to support? Join the Journey ☀️
      </h2>
      <p class="text-xl text-gray-700 px-4 max-w-3xl mx-auto mb-8">
        Love the idea of helping fuel America with healthy snacks, meals, and drinks? You can support us now and become partners in our journey.
      </p>
      <UButton
        size="xl"
        color="primary"
        to="/support"
      >
        Support & Join the Community
      </UButton>
    </div>
  </UContainer>
</template>

<script setup>
import { onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'

const config = useRuntimeConfig()

// MAPBOX PUBLIC TOKEN from runtime config (NUXT_PUBLIC_MAPBOX_TOKEN)
mapboxgl.accessToken = config.public.mapboxToken || ''

const drops = [
  {
    id: 1,
    location: 'Dixie Springs Park',
    address: '3605 W 2900 S, Hurricane, UT 84737',
    schedule: 'Saturday · around 10am for 2 hours',
    lngLat: [-113.3716, 37.1292],
    // Used to pre-select location on /order page
    orderLocationId: 'dixie-springs-park'
  }
]

// Add marker reference to each drop
drops.forEach(drop => drop.marker = null)

let map = null

onMounted(() => {
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v12', // Clean bright style
    center: [-113.3716, 37.1292],
    zoom: 14
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
</script>
