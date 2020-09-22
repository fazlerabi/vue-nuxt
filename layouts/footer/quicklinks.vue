<template>
  <section class="bg-pink-100 pb-40">
    <div class="app-container">
      <h2 class="font-bold text--black text-3xl pb-10 pt-24">Quick Links</h2>
      <div class="meals-slider w-full overflow-hidden">
        <!-- Three columns -->
        <div class="flex mb-4 flex-wrap">
          <div class="w-full md:w-1/2 md:w-1/4 mb-5">
          <router-link to="/myorders" class="bg-white h-full mx-4">
            <div class="bg-white h-full mx-4">
              <div class="rounded overflow-hidden p-10">
                <img class="w-full" src="/img/icons/orders.svg" alt="Sunset in the mountains" />
              </div>
              <div class="px-3 py-4 border-t">
                <div class="text-md text-center">My Orders</div>
              </div>
            </div>
            </router-link>
          </div>
          <div class="w-full md:w-1/2 md:w-1/4 mb-5">
            <router-link to="/profile" class="bg-white h-full mx-4">
              <div class="bg-white h-full mx-4">
                <div class="rounded overflow-hidden p-10">
                  <img class="w-full" src="/img/icons/profile.svg" alt="Sunset in the mountains" />
                </div>
                <div class="px-3 py-4 border-t">
                  <div class="text-md text-center">My Profile</div>
                </div>
              </div>
            </router-link>
          </div>
          <div class="w-full md:w-1/2 md:w-1/4 mb-5">
          <router-link to="/" class="bg-white h-full mx-4">
            <div class="bg-white h-full mx-4">
              <div class="rounded overflow-hidden p-10">
                <img class="w-full" src="/img/icons/track.svg" alt="Sunset in the mountains" />
              </div>
              <div class="px-3 py-4 border-t">
                <div class="text-md text-center">Track Order</div>
              </div>
            </div>
            </router-link>
          </div>
          <div class="w-full md:w-1/2 md:w-1/4 mb-5">
          <router-link to="/" class="bg-white h-full mx-4">
            <div class="bg-white h-full mx-4">
              <div class="rounded overflow-hidden p-10">
                <img class="w-full" src="/img/icons/food_menu.svg" alt="Sunset in the mountains" />
              </div>
              <div class="px-3 py-4 border-t">
                <div class="text-md text-center">Food Menu</div>
              </div>
            </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>