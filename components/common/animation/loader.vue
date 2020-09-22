<!-- Loader animation (lottie) used when lazyloading images -->

<template>
  <lottie :options="defaultOptions" :height="320" :width="300"/>
</template>

<script>
    import * as animationData from "@/assets/animations/loader.json"

    export default {
        data: () => ({
            defaultOptions: {animationData: animationData.default},
        })
    }
</script>