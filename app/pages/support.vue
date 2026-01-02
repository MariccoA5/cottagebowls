<template>
  <UContainer class="py-16 space-y-16">
    <!-- Intro -->
    <section class="max-w-3xl">
      <h1 class="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
        Support Cottage Bowls
      </h1>
      <p class="text-lg text-gray-700">
        Cottage Bowls is a small, family-run business with big dreams: making
        healthy, high-protein bowls easy to grab all across St. George (and
        beyond). Your support helps us grow from a local favorite into a
        community-powered movement.
      </p>
    </section>

    <!-- Contact information -->
    <section class="grid gap-8 lg:grid-cols-2 items-start">
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold text-amber-800">
          Get in Touch
        </h2>
        <p class="text-gray-700">
          Have questions about orders, partnerships, or events? Reach out any
          time—we&apos;d love to hear from you.
        </p>

        <div class="space-y-3 text-sm text-gray-800">
          <div class="flex items-start gap-3">
            <span class="font-semibold w-20">Email</span>
            <a
              href="mailto:hello@cottagebowls.com"
              class="text-sky-700 hover:underline break-all"
            >
              hello@cottagebowls.com
            </a>
          </div>
          <div class="flex items-start gap-3">
            <span class="font-semibold w-20">Phone</span>
            <a
              href="tel:+14355550123"
              class="text-sky-700 hover:underline"
            >
              (435) 555-0123
            </a>
          </div>
          <div class="flex items-start gap-3">
            <span class="font-semibold w-20">Instagram</span>
            <a
              href="https://instagram.com/cottagebowls"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sky-700 hover:underline break-all"
            >
              @cottagebowls
            </a>
          </div>
          <div class="flex items-start gap-3">
            <span class="font-semibold w-20">Location</span>
            <div class="text-gray-700 flex-1">
              <p>St. George, Utah</p>
              <p>Local pickup at designated drop spots (see the Locations page).</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Support / Donate -->
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold text-amber-800">
          How You Can Support Us
        </h2>
        <p class="text-gray-700">
          Every order, share, and donation moves us closer to expanding our
          kitchen, adding more pickup locations, and eventually offering wider
          delivery.
        </p>

        <UCard class="bg-amber-50/70 border-amber-100">
          <h3 class="text-lg font-semibold text-amber-800 mb-2">
            Donate to Fuel Our Growth
          </h3>
          <p class="text-gray-700 text-sm mb-4">
            We&apos;re building simple ways for you to directly support Cottage Bowls—
            think of it like helping your favorite local spot get to the next
            level. Donations go toward equipment, ingredients, and scaling our
            operations.
          </p>
          <div class="flex flex-wrap gap-3">
            <UButton
              color="primary"
              size="lg"
              variant="solid"
            >
              Donate (coming soon)
            </UButton>
            <UButton
              color="primary"
              variant="ghost"
              to="/locations"
            >
              Order a bowl instead
            </UButton>
          </div>
        </UCard>

        <div class="space-y-2 text-sm text-gray-700">
          <h3 class="text-base font-semibold text-amber-800">
            Future Rewards for Supporters
          </h3>
          <p>
            As we grow, we plan to introduce reward tiers for those who support
            us early—think free toppings, exclusive flavors, limited-edition
            merch, and early access to new locations.
          </p>
          <p>
            Join our community now, and you&apos;ll be the first to hear when these
            tiers go live.
          </p>
        </div>
      </div>
    </section>
  </UContainer>
</template>
