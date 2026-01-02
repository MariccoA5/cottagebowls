<template>
  <UContainer class="py-12">
    <h1 class="text-4xl font-bold text-amber-800 text-center mb-8">
      St. George Locations & Times ☀️
    </h1>
    <p class="text-xl text-center mb-12">
      Meet me at these spots • Fresh bowls ready • Grab and go (pay online)
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
          Reserve A Bowl & Meet Here
        </UButton>
      </UCard>
    </div>

    <!-- Global Preorder Section -->
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
        @click="globalPreorder"
      >
        Support & Join the Community
      </UButton>
    </div>
  </UContainer>
</template>

<script setup>
import { onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'

// MAPBOX PUBLIC TOKEN
mapboxgl.accessToken = 'pk.eyJ1IjoiY290dGFnZWJvd2xzIiwiYSI6ImNtanJ2dzdwZTJ6N3Qza3B5eGZ1NDJjajQifQ.bRMqdcX4WnWqKxj5Urf44A'

const drops = [
  {
    id: 1,
    location: 'Thunder Junction Park',
    address: '1851 S Dixie Dr, St. George, UT 84770',
    schedule: 'Thursday 4-6pm',
    lngLat: [-113.60031, 37.077827] // Times: Thursday 4-6pm
  },
  {
    id: 2,
    location: 'Sand Hollow State Park',
    address: '3351 Sand Hollow Rd, Hurricane, UT 84737',
    schedule: 'Friday, 11am-1pm | Sunday, 11am-1pm',
    lngLat: [-113.390004, 37.117812] // Times: Friday, 11am-1pm | Sunday, 11am-1pm
  },
  {
    id: 3,
    location: 'Vernon Worthen Park',
    address: '300 S 400 E, St. George, UT 84770',
    schedule: 'Saturday, 10am-12pm',
    lngLat: [-113.5758844, 37.1040429] // Times: Saturday Market, 10am-12pm
  }
  // {
  //   id: 4,
  //   location: 'Utah Tech Holland Building',
  //   address: 'Jeffrey R. Holland Centennial Commons, 225 S University Ave, 225 S 700 E, St. George, UT 84770',
  //   schedule: 'Fill Out Application',
  //   lngLat: [-113.568397, 37.104329] // Times:
  // }
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
