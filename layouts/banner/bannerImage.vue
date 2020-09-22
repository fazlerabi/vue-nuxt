<!-- Separated component of the banner, to handle banner images with lazyloading -->

<template>
  <div>
    <AnimationLoader v-if="!isImageLoaded" class="banner-loader"/>
    <v-lazy-image @load="isImageLoaded = true" :src="slide.location" :alt="slide.title"
                  class="h-screen"/>
  </div>
</template>

<script>
    export default {
        props: {
            slide: {
                type: Object,
                default: () => ({
                    title: null,
                    location: null
                })
            }
        },
        data: () => ({
            isImageLoaded: false
        }),
        components: {
            AnimationLoader: () => import('@/components/common/animation/loader')
        }
    }
</script>

<style lang="scss" scoped>
  .banner-loader {
    @apply z-10;
    height: 100vh !important;
  }
  .v-lazy-image {
    height: 0 !important;
  }

  .v-lazy-image-loaded {
    height: 100vh !important;
  }

  img{
    object-fit: cover
  }
</style>