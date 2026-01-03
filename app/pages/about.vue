<template>
  <UContainer class="py-16 space-y-16">
    <!-- Hero / Intro -->
    <section class="max-w-4xl">
      <h1 class="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
        Our Story at Cottage Bowls
      </h1>
      <p class="text-lg text-gray-700">
        Cottage Bowls was born from my family's view on healthy eating:
        Prioritize high-protein, healthy fats, and lower-carb options. During my wife's third pregnancy, she craved a sweet treat, but wanted to make sure it was healthy for our baby. After creating the first bowl, we fell in love with the meal. From there, we have created various other bowls inspired by the same principles.
      </p>
    </section>

    <!-- Ideals / Values -->
    <section class="grid gap-10 md:grid-cols-3">
      <UCard class="bg-amber-50/70 border-amber-100">
        <h2 class="text-xl font-semibold text-amber-800 mb-2">
          Real Food, Real Fuel
        </h2>
        <p class="text-gray-700 text-sm">
          Food is what makes up every cell in our body; we prioritize using the highest-quality ingredients for optimal living. Protein and high-quality fats should always be the main portions of your diet.
        </p>
      </UCard>
      <UCard class="bg-amber-50/70 border-amber-100">
        <h2 class="text-xl font-semibold text-amber-800 mb-2">
          Family First
        </h2>
        <p class="text-gray-700 text-sm">
          Cottage Bowls is a family-run business. Every bowl is inspired by the
          way we feed our own kids, friends, and neighbors in St. George—sourcing from local farmers and producers is important to us.
        </p>
      </UCard>
      <UCard class="bg-amber-50/70 border-amber-100">
        <h2 class="text-xl font-semibold text-amber-800 mb-2">
          Forward Thinking
        </h2>
        <p class="text-gray-700 text-sm">
          At Cottage Bowls, we are always looking for ways to improve our products and services. The goal is create more ways for us to enable you to live a healthy life.
        </p>
      </UCard>
    </section>

    <!-- Family & Service Story + Healthy Living -->
    <section class="grid gap-10 lg:grid-cols-2 items-start">
      <div class="space-y-6">
        <div class="space-y-4">
          <h2 class="text-2xl font-semibold text-amber-800">
            A Journey Rooted in Service
          </h2>
          <p class="text-gray-700">
            Cottage Bowls is a family-run business led by me, Maricco Allen, a US Army veteran with a passion for service and innovation. Born in California and raised in Washington State, I've always been driven to contribute to something greater than myself. After serving 7 years in IT for the Army—where I met my wife, also a veteran—we transitioned out of the military in December 2022, just as our family grew with two young boys (and we're expecting our third any day now). That first year in California was tough, scraping by while I self-taught software engineering to build apps that could make a real impact. Using my GI Bill, we relocated to Utah Tech in St. George in 2024—a place that's starting to feel like home after two years. Currently pursuing a degree in Mechatronics, I'm blending software and hardware to help rebuild America's manufacturing through robotics and automation. Cottage Bowls is my way of kicking off that transformation: a business born from our family's love for healthy, real fuel that keeps us fit and focused in a world that needs more of it.
          </p>
          <p class="text-gray-700">
            When you support Cottage Bowls, you are supporting a military family,
            local roots in St. George, and a small business built on gratitude and
            grit.
          </p>
        </div>

        <div class="space-y-3">
          <h2 class="text-2xl font-semibold text-amber-800">
            Our Love for Healthy Living
          </h2>
          <p class="text-gray-700">
            Cottage Bowls is our way of making healthy eating the easy choice on busy
            days. Whether you&apos;re grabbing a bowl before work, after the gym, or on
            the way to the park with your kids, we want you to feel proud of what
            you&apos;re eating and excited to come back.
          </p>
        </div>
      </div>

      <div class="flex justify-center">
        <img
          src="/images/family.jpeg"
          alt="The Cottage Bowls family"
          class="w-full max-w-xl max-h-175 rounded-2xl shadow-md border border-amber-100 object-cover"
          style="object-position: center 75%;"
        >
      </div>
    </section>
  </UContainer>
</template>
