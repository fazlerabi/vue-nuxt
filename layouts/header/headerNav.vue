<template>
  <nav
    v-if="!isOpened"
    v-scroll="scrollHandler"
    class="bg-transparent text-white h-16 flex items-center justify-center uppercase nav nav--floating"
  >
    <router-link to="/" class="nav__item hidden sm:block">Menu</router-link>
    <!-- <a href="#" class="nav__item hidden sm:block">Contact</a> -->
    <router-link to="/contactus" class="nav__item hidden sm:block">Contact</router-link>
    <!-- <a href="#" class="nav__item hidden sm:block">Faq</a> -->
    <router-link to="/faq" class="nav__item hidden sm:block">Faq</router-link>
    <div class="divider-v divider-v--white hidden sm:block"></div>
    <!-- <a href="#" class="nav__item hidden sm:block">Login</a> -->
    <router-link to="/login" class="nav__item hidden sm:block">Login</router-link>
    <a href="#" class="nav__item__cart text-white">
     <HeaderTray/>
    </a>
    <a href="#" class="nav__item__hamburger block sm:hidden" @click.prevent="toggleMenu()">
      <i class="fas fa-bars"></i>
    </a>
  </nav>

  <transition v-else name="slide">
    <nav class="pt-6 fixed inset-0 text--black bg-gray-200 z-10 nav" @click="!isOpened">
      <div class="flex flex-col app-container">
        <div class="flex items-center justify-between mb-10">
          <HeaderLogo />

          <a href="#" @click.prevent="toggleMenu()" class="flex items-center font-medium text-sm">
            CLOSE
            <i class="fas fa-times fa-2x ml-4"></i>
          </a>
        </div>
        <router-link to="/" class="nav__item__mobile" >Home</router-link>
        <router-link to="/" class="nav__item__mobile" >Menu</router-link>
        <router-link to="/contactus" class="nav__item__mobile">Contact</router-link>
        <router-link to="/faq" class="nav__item__mobile">Faq</router-link>
        <router-link to="/login" class="nav__item__mobile">Login</router-link>
      </div>
    </nav>
  </transition>
</template>


<script>
    import {mapGetters, mapMutations} from "vuex"
    import navShadowHelper from '@/helpers/navShadow'

    export default {
        mixins: [navShadowHelper],
        computed: {
            ...mapGetters({
                'isOpened': 'getMenuMobileOpened'
            })
        },
        methods: {
            ...mapMutations({
                setOpened: 'setMenuMobileOpened'
            }),
            toggleMenu() {
                this.setOpened(!this.isOpened)
            },

            // Handling scroll event using our custom directive (v-scroll) to add a shadow/fixed class to Navbar
            scrollHandler() {
                if (window.scrollY > 100) {
                    this.navElement = document.querySelector('.nav')
                    if (!this.isNavHasShadow()) {
                        this.addNavShadow()
                    }
                }
            }
        },
        components: {
            HeaderTray: () => import('./headerTray'),
            HeaderLogo: () => import('./headerLogo')
        }
    }
</script>