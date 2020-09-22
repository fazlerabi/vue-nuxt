<!-- Header of the site contains banner images & text fetched from the API -->

<template>
  <section class="banner-container">
    <div class="app-container h-full flex overflow-hidden">
      <VueSlickCarousel class="banner-image w-1/2" v-bind="sliderSettings" v-if="slides.length">
        <div v-for="(slide, index) in slides" :key="index">
          <BannerImage :slide="slide"/>
        </div>
      </VueSlickCarousel>
      <div class="self-end mb-8 sm:mb-16 ml-0 sm:ml-16">
        <div class="text-4xl sm:text-5xl mb-6">
          <h1 class="text--yellow font-extrabold heading">
            <span>GOOD TIMES</span>
            <span class="text-white">WITH</span>
            <span>GREAT FRIENDS</span>
          </h1>
        </div>
        <p class="text-white mb-12 w-full sm:w-4/5">Save yourself some stress and time and order for your delicious
          meals at the comfort of your home. Plus, you can order for two.
        </p>
        <button class="button button--red" @click.prevent="banner = !banner">View Menu</button>
      </div>
    </div>
  </section>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        data: () => ({
            sliderSettings: {
                "lazyLoad": "ondemand",
                "fade": true,
                "accessibility": false,
                "arrows": false,
                "infinite": true,
                "speed": 800,
                "slidesToShow": 1,
                "slidesToScroll": 1,
                "autoplay": true,
                "autoplaySpeed": 4000
            },
            isImageLoaded: false
        }),
        computed: {
            ...mapGetters({
                slides: 'slide/getSlides'
            })
        },
        methods: {
            ...mapActions({
                fetchSlide: 'slide/fetchSlides'
            })
        },
        components: {
            BannerImage: () => import('@/layouts/banner/bannerImage'),
            VueSlickCarousel: () => import('vue-slick-carousel')
        },
        async created() {
            await this.fetchSlide()
        }
    }
</script>

<style lang="scss" scoped>
  .banner-container {
    @apply w-full h-screen;
    background: var(--banner-bg);

    .heading span {
      display: block;
    }
  }

  .banner-image {
    display: none !important;
  }

  @screen sm {
    .banner-image {
      display: block !important;
    }
  }
</style>