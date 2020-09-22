<!-- Splash screen launched before the page is loaded using lottie web -->

<template>
  <transition name="slide">
    <div v-if="isOpened" class="fixed flex items-center justify-center w-full h-screen bg-yellow z-50">
      <lottie :options="defaultOptions" :height="400" :width="400" @animCreated="animationHandler"/>
    </div>
  </transition>
</template>

<script>
    import * as animationData from "@/assets/splash-screen.json";
    import {mapGetters, mapMutations} from "vuex";

    export default {
        data: () => ({
            defaultOptions: {animationData: animationData.default},
        }),
        computed: {
            ...mapGetters({
                isOpened: 'getSplashScreenOpened'
            })
        },
        methods: {
            ...mapMutations({
                setOpened: 'setSplashScreenOpened'
            }),
            animationHandler(anim) {
                anim.loop = false
                anim.addEventListener('complete', () => {
                    this.setOpened(false)
                })
            }
        }
    }
</script>

<style>
.bg-yellow{
    background-color: #F7ECD1;
}
</style>