<template>
  <div>
    <drawer :meals="meals" />
    <div class="header-padding-top primary-color"></div>
    <div class="heading primary-color">
      <h2 class="app-container font-bold text--yellow text-4xl pb-5 pt-5">
        Food
        <span class="text-white">Menu</span>
      </h2>
    </div>
    <section class="app-container pb-16">
      <div class="flex justify-between w-full py-4">
        <button
          @click="custom_order = !custom_order"
          type="button"
          v-bind:class="{'button--red text-white': custom_order , 'text-red-700' : !custom_order}"
          class="bg-transparent font-semibold py-2 px-4 border border-red-500 outline-none"
        >Custom Order</button>
        <div class="flex my-2">
          <div class="relative">
            <input type="search" class="bg-purple-white shadow-md p-3" placeholder="Search" />
            <div class="absolute mr-4 mt-4 pin-r pin-t right-0 text-purple-lighter top-0">
              <svg
                version="1.1"
                class="h-4 text-dark"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 52.966 52.966"
                style="enable-background:new 0 0 52.966 52.966;"
                xml:space="preserve"
              >
                <path
                  d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21
        c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279
        C52.074,52.304,52.086,51.671,51.704,51.273z M21.983,40c-10.477,0-19-8.523-19-19s8.523-19,19-19s19,8.523,19,19
        S32.459,40,21.983,40z"
                />
              </svg>
            </div>
          </div>

          <div class="inline-block relative w-32">
            <select
              class="appearance-none bg-gray-200 block focus:outline-none focus:shadow-outline h-full hover:border-gray-500 leading-tight pr-8 px-4 py-2 shadow-md w-auto"
              v-model="selected_category"
            >
              <option class="text-black" disabled value="0">Category</option>
              <option
                v-for="(option, index) in category"
                :key="index"
                :value="option.price"
              >{{ option.title }}</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
       <transition name="slide-fade">
      <div v-if="custom_order">
        <h3 class="font-bold text-2xl pb-5 mt-4">Custom Meal Order</h3>
        <textarea placeholder="Describe the custom meal you want prepared.." class="h-40 shadow-md w-full resize-none p-5 text-sm font-light outline-none"></textarea>
        <div class="flex mt-6 mb-12">
           <button class="button button--red whitespace-no-wrap">Add to tray</button>
            <button class="button border whitespace-no-wrap border-red-500 ml-4" style="color:black!important">Remove</button>
        </div>
      </div>
        </transition>
      <div class="meals-slider w-full overflow-hidden">
        <!-- Three columns -->
        <div class="flex mb-4 flex-wrap">
          <div
            class="w-full lg:w-1/3 md:w-1/2 py-4 h-full foodmenu-section"
            v-for="(meal, index) in meals"
            :key="index"
          >
            <MenuItem :meal="meal" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    category: [],
    selected_category: 0,
    custom_order: false,
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
  mounted() {
    this.$store.dispatch("meals/fetchAllCategory").then(res => {
      console.log(res);

      this.category = res.data.data;
    });
  },
  computed: {
    ...mapGetters({
      meals: "meals/getMeals"
    })
  },
  methods: {
    ...mapActions({
      fetchTopMeals: "meals/fetchAllMeals"
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
    MenuItem: () => import("@/components/common/menu/foodmenu"),
    Drawer: () => import("@/components/common/menu/drawer")
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

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-100px);
  opacity: 0;
}
</style>