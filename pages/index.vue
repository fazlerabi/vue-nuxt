<template>
  <div>
    <AppHeader/>

    <div :class="{'fixed': isMobileMenuOpened}">
      <AppBanner/>

      <Observer @intersect="intersected" class="nav-observer"/>
      <SectionAvailablity/>

      <SectionTopOrders/>

      <SectionTestimonials/>

      <SectionInstagramFeed/>

      <AppFooter/>
    </div>
  </div>
</template>

<script>
    import {mapGetters} from "vuex"
    import navShadowHelper from '@/helpers/navShadow'

    export default {
        mixins: [navShadowHelper],
        computed: {
            ...mapGetters({
                'isMobileMenuOpened': 'getMenuMobileOpened'
            })
        },
        methods: {
            // Detect intersection of the element observer while scrolling and add/remove shadow & fixed class to Navbar
            intersected() {
                this.navElement = document.querySelector('.nav')
                if (this.isNavHasShadow()) {
                    this.removeNavShadow()
                    return
                }
                this.addNavShadow()
            }
        },
        components: {
            Observer: () => import('@/components/helpers/observer'),
            SectionInstagramFeed: () => import('@/layouts/sections/instagramFeed'),
            SectionTestimonials: () => import('@/layouts/sections/testimonials'),
            SectionTopOrders: () => import('@/layouts/sections/topOrders'),
            SectionAvailablity: () => import('@/layouts/sections/availability'),
            AppBanner: () => import('@/layouts/banner/banner'),
            AppHeader: () => import('@/layouts/header/header'),
            AppFooter: () => import('@/layouts/footer/footer'),
        }
    }
</script>

<style lang="scss">
  .nav-observer {
    position: absolute;
    top: 10%;
  }
</style>
