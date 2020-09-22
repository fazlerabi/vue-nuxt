<template>
  <section class="app-container pb-16" v-view="handleFirstSectionViewPort">
    <div
      class="flex items-center justify-center flex-wrap md:flex-no-wrap mb-8"
      style="min-height: 300px;"
    >
      <slide-x-left-transition :duration="1500">
        <div class="mr-0 sm:mr-8 mb-12 sm:mb-0" v-if="this.inFirstSectionViewPort">
          <AnimationLoader v-if="!isFirstImageLoaded || !isSecondImageLoaded" />
          <v-lazy-image
            @load="isFirstImageLoaded = true"
            :src="require('@/assets/images/section/restaurant.png')"
            class="w-11/12 mx-auto"
            alt="Restaurant"
          />
          <v-lazy-image
            @load="isSecondImageLoaded = true"
            :src="require('@/assets/images/section/meal.png')"
            alt="Meal"
            class="w-9/12 -mt-32 mx-auto"
          />
        </div>
      </slide-x-left-transition>

      <slide-x-right-transition :duration="1500">
        <div
          class="w-auto sm:w-1/2"
          v-view.once="handleTextInViewPort"
          v-show="this.inFirstSectionViewPort"
        >
          <vue-typed-js
            :loop="true"
            :showCursor="false"
            :strings="['Healthy, Delicious <span class=\'text--yellow\'>Meal</span>', 'Deliciously Made']"
            v-if="inTextViewPort"
          >
            <h2 class="typing text--black text-3xl pb-4 font-bold"></h2>
          </vue-typed-js>

          <p class="leading-loose">
            Nothing comes out of our kitchen apart from well-nourished,
            delicious and assorted
            foods that are pleasant to your health. Chopmore offers all sorts of delicacies, including western and
            African
            cuisines, well prepared to your taste and satisfaction. We prepare your meals in a very hygiene environment,
            using the best ingredients with modern cooking utensils.
          </p>
        </div>
      </slide-x-right-transition>
    </div>

    <div v-view="handleSecondSectionViewPort" style="min-height: 300px;">
      <zoom-center-transition :duration="800">
        <h2
          class="text-center font-bold text--yellow text-4xl py-12"
          v-show="inSecondSectionViewPort"
        >
          <span class="text--black">Top</span> Orders
        </h2>
      </zoom-center-transition>
      <fade-transition :duration="1500" :delay="200">
        <div class="meals-slider w-full overflow-hidden" v-show="inSecondSectionViewPort">
          <a
            href="#"
            class="text--black opacity-100 sm:opacity-50 absolute left-0 sm:relative z-10"
            @click.prevent="showPrevSlide"
          >
            <i class="fas fa-chevron-left fa-2x mr-8"></i>
          </a>
          <div class="flex justify-center w-full overflow-hidden">
            <VueSlickCarousel
              class="w-full"
              v-bind="sliderSettings"
              ref="carousel"
              v-if="meals.length"
            >
              <div v-for="(meal, index) in meals" :key="index">
                <MenuItem :meal="meal" />
              </div>
            </VueSlickCarousel>
          </div>
          <a
            href="#"
            class="text--black opacity-100 sm:opacity-50 absolute right-0 sm:relative z-10"
            @click.prevent="showNextSlide"
          >
            <i class="fas fa-chevron-right fa-2x ml-8"></i>
          </a>
        </div>
      </fade-transition>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    sliderSettings: {
      lazyLoad: "ondemand",
      arrows: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    },
    isFirstImageLoaded: false,
    isSecondImageLoaded: false,
    inFirstSectionViewPort: false,
    inSecondSectionViewPort: false,
    inTextViewPort: false
  }),
  computed: {
    ...mapGetters({
      meals: "meals/getTopMeals"
    })
  },
  methods: {
    ...mapActions({
      fetchTopMeals: "meals/fetchTopMeals"
    }),
    showPrevSlide() {
      this.$refs.carousel.prev();
    },
    showNextSlide() {
      this.$refs.carousel.next();
    },
    handleFirstSectionViewPort(e) {
      if (
        e.type === "progress" &&
        e.percentTop < 0.9 &&
        !this.inFirstSectionViewPort
      ) {
        this.inFirstSectionViewPort = true;
      }
    },
    handleSecondSectionViewPort(e) {
      if (
        e.type === "progress" &&
        e.percentTop < 0.9 &&
        !this.inSecondSectionViewPort
      ) {
        this.inSecondSectionViewPort = true;
      }
    },
    handleTextInViewPort() {
      this.inTextViewPort = true;
    }
  },
  async created() {
    await this.fetchTopMeals();
  },
  components: {
    AnimationLoader: () => import("@/components/common/animation/loader"),
    VueSlickCarousel: () => import("vue-slick-carousel"),
    MenuItem: () => import("@/components/common/menu/menuItem")
  }
};
</script>

<style lang="scss" scoped>
.v-lazy-image {
  height: 0 !important;
}

.v-lazy-image-loaded {
  height: auto !important;
}

.typing {
  min-height: 4rem;
}

.slideXLeftIn {
  animation-name: customSlideXLeftIn;
}

.slideXRightIn {
  animation-name: customSlideXRightIn;
}

@keyframes customSlideXLeftIn {
  0% {
    opacity: 0;
    transform: translateX(-80px);
  }
  100% {
    opacity: 1;
  }
}

@keyframes customSlideXRightIn {
  0% {
    opacity: 0;
    transform: translateX(80px);
  }
  100% {
    opacity: 1;
  }
}

.meals-slider {
  @apply relative flex items-center;
}
</style>