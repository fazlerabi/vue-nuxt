<template>
  <div>
    <SplashScreen />

    <nuxt />
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isSplashScreenOpened: "getSplashScreenOpened"
    })
  },
  components: {
    SplashScreen: () => import("@/layouts/screens/splash")
  }
};
</script>



<style lang="scss">
.primary-color {
  background-color: var(--banner-bg);
}

.header-padding-top {
  height: 128px;
}

.slick-track {
  display: flex;
}

@media only screen and (max-width: 767px) {
  .foodmenu-section > .meals-slider__item {
    margin: auto;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .foodmenu-section:nth-child(2n + 1) > .meals-slider__item {
    margin-right: auto;
  }

  .foodmenu-section:nth-child(2n + 2) > .meals-slider__item {
    margin-left: auto;
  }
}
@media only screen and (min-width: 1024px) {
  .foodmenu-section:nth-child(3n + 2) > .meals-slider__item {
    margin: auto;
  }

  .foodmenu-section:nth-child(3n + 3) > .meals-slider__item {
    margin-left: auto;
  }
}
</style>