<template>
  <div class="min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-amber-50">
    <UContainer class="py-12">
      <!-- Hero -->
      <div class="text-center py-16">
        <img src="/images/cottagebowls.JPG" alt="Cottage Bowls" class="mx-auto w-80 md:w-96 mb-8 drop-shadow-2xl" />
        <h1 class="text-5xl md:text-7xl font-bold text-amber-800 mb-6">Fresh Cottage Bowls ☀️🥣</h1>
        <p class="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12">
          High-protein, fresh ingredients • Daily drop-offs in St. George • Worldwide preorders
        </p>
        <UButton size="xl" color="primary" to="/drops" class="mx-4">St. George Drops & Map</UButton>
        <UButton size="xl" variant="outline" color="primary" class="mx-4">Preorder Worldwide</UButton>
      </div>

      <!-- Food Teaser -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 my-20">
        <img src="/images/bowl1.jpg" class="rounded-2xl shadow-xl" />
        <img src="/images/bowl2.jpg" class="rounded-2xl shadow-xl" />
        <img src="/images/bowl3.jpg" class="rounded-2xl shadow-xl" />
      </div>
    </UContainer>
  </div>
</template>