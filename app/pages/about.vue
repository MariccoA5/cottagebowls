<template>
  <UContainer class="py-16 space-y-16">
    <!-- Hero / Intro -->
    <section class="max-w-4xl">
      <h1 class="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
        Our Story at Cottage Bowls
      </h1>
      <p class="text-lg text-gray-700">
        Cottage Bowls was born from a simple idea: healthy food should feel like home.
        We create high-protein cottage cheese bowls that are bright, filling, and
        made with the same care we put into family meals around our own table.
      </p>
    </section>

    <!-- Ideals / Values -->
    <section class="grid gap-10 md:grid-cols-3">
      <UCard class="bg-amber-50/70 border-amber-100">
        <h2 class="text-xl font-semibold text-amber-800 mb-2">
          Real Food, Real Fuel
        </h2>
        <p class="text-gray-700 text-sm">
          We believe food should work for you. High-protein, slow-digesting cottage
          cheese, fresh toppings, and wholesome ingredients that keep you full and
          energized—without the crash.
        </p>
      </UCard>
      <UCard class="bg-amber-50/70 border-amber-100">
        <h2 class="text-xl font-semibold text-amber-800 mb-2">
          Family at the Center
        </h2>
        <p class="text-gray-700 text-sm">
          Cottage Bowls is a family-run business. Every bowl is inspired by the
          way we feed our own kids, friends, and neighbors in St. George—gathered
          around good food, sunshine, and conversation.
        </p>
      </UCard>
      <UCard class="bg-amber-50/70 border-amber-100">
        <h2 class="text-xl font-semibold text-amber-800 mb-2">
          Consistency & Care
        </h2>
        <p class="text-gray-700 text-sm">
          From early prep hours to the last pickup of the day, we show up with the
          same standard: clean, quality ingredients and bowls made with pride.
        </p>
      </UCard>
    </section>

    <!-- Family & Service Story + Healthy Living -->
    <section class="grid gap-10 lg:grid-cols-2 items-start">
      <div class="space-y-6">
        <div class="space-y-4">
          <h2 class="text-2xl font-semibold text-amber-800">
            A Family Story Rooted in Service
          </h2>
          <p class="text-gray-700">
            Our journey started long before the first Cottage Bowl was served. Our
            family has deep roots in service through the U.S. Army—years of early
            mornings, discipline, and a commitment to something bigger than
            ourselves.
          </p>
          <p class="text-gray-700">
            That experience shaped how we show up in business and in our community:
            be dependable, take care of your people, and always leave things better
            than you found them. Cottage Bowls is one more way we continue that
            mission—by serving food that helps people feel and live better.
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
            We don&apos;t believe in perfection—we believe in better. Better choices,
            better fuel, and better habits that fit real life. For us, that looks like
            building bowls around protein, fresh fruits, crunchy toppings, and
            balance.
          </p>
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
