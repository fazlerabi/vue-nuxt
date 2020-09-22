<template>
  <section class="testimonials relative" v-view="handleViewPort">
    <div class="w-full h-full bg-black">
      <img src="@/assets/images/section/testimonials.png" alt="Testimonials" class="w-full h-full">
    </div>
    <div class="app-container testimonials__content">
      <a href="#" class="opacity-50" @click.prevent="showPrevSlide">
        <i class="fas fa-chevron-left fa-2x"></i>
      </a>
      <slide-x-left-transition :duration="1500">
        <VueSlickCarousel class="app-container" v-bind="sliderSettings" ref="carousel" v-show="inViewPort"
                          v-if="testimonials.length">
          <div v-for="(testimonial, index) in testimonials" :key="index"
               class="flex flex-col justify-evenly items-center h-full">
            <h3 class="text-4xl mb-12">{{ testimonial.title }}</h3>
            <p class="leading-loose mb-12">{{ testimonial.note }}</p>
            <p>{{ testimonial.name }}</p>
          </div>
        </VueSlickCarousel>
      </slide-x-left-transition>
      <a href="#" class="opacity-50" @click.prevent="showNextSlide">
        <i class="fas fa-chevron-right fa-2x"></i>
      </a>
    </div>
  </section>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        data: () => ({
            sliderSettings: {
                "arrows": false,
                "focusOnSelect": true,
                "infinite": true,
                "speed": 500,
                "slidesToShow": 1,
                "slidesToScroll": 1,
                "autoplay": true
            },
            inViewPort: false
        }),
        computed: {
            ...mapGetters({
                testimonials: 'testimonials/getTestimonails'
            })
        },
        methods: {
            ...mapActions({
                fetchTestimonials: 'testimonials/fetchTestimonials'
            }),
            showPrevSlide() {
                this.$refs.carousel.prev()
            },
            showNextSlide() {
                this.$refs.carousel.next()
            },
            handleViewPort(e) {
                if (e.type === "progress" && e.percentTop < 0.90 && !this.inViewPort) {
                    this.inViewPort = true
                }
            }
        },
        async created() {
            await this.fetchTestimonials()
        },
        components: {
            VueSlickCarousel: () => import('vue-slick-carousel')
        }
    }
</script>

<style lang="scss" scoped>
  .testimonials {
    height: 450px;

    &__content {
      @apply absolute inset-0 flex items-center text-center text-white h-full overflow-hidden;
    }
  }
</style>
