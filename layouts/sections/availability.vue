<template>
  <section class="h-auto mb-16">
    <h2 class="text-center font-bold text--yellow text-4xl py-12" v-view="handleViewPort">
      <span class="text--black">What’s</span> available with us
    </h2>
    <slide-y-down-transition :duration="1000">
      <div class="flex flex-wrap md:flex-no-wrap text-center text-white" v-show="this.inViewPort">
        <div class="bg--red section-meal">
          <div class="section-meal__image">
            <lottie :options="firstBlockOptions" :height="100" :width="100"/>
          </div>
          <h3>Deliciously Prepared Meal</h3>
          <p>Please browse through our menu and order for your fresh ready-made delicious meals. We are available
            24/7,
            and our delivery service is just two clicks away. All our foods are well-nourished, healthy and
            deliciously
            prepared to give you maximum satisfaction.

          </p>
          <img src="@/assets/images/section/first-meal.png" alt="" class="section-meal__bg-image">
        </div>
        <div class="bg--yellow section-meal">
          <div class="section-meal__image">
            <lottie :options="secondBlockOptions" :height="100" :width="100"/>
          </div>
          <h3>Custom Order Just for you</h3>
          <p>Got a unique taste you've been quenching for? Smile up. We prepare custom made delicious meals precisely
            to
            your taste and request. Just tell us what you crave, our professional chefs will do the cooking.

          </p>
          <img src="@/assets/images/section/second-meal.png" alt="" class="section-meal__bg-image">
        </div>
        <div class="bg--green section-meal">
          <div class="section-meal__image">
            <lottie :options="thirdBlockOptions" :height="100" :width="100"/>
          </div>
          <h3>Meal for Family and Event</h3>
          <p>Chopmore is just an extension of your family kitchen. You can order for a full family meal, be it dinner,
            breakfast or launch. We are also open for exclusive events booking, birthday party, banquets, wedding,
            corporate or just some good family fun. Mention it!</p>
          <img src="@/assets/images/section/third-meal.png" alt="" class="section-meal__bg-image">
        </div>
      </div>
    </slide-y-down-transition>
  </section>
</template>

<script>
    import * as firstBlockAnimationData from "@/assets/animations/a1.json"
    import * as secondBlockAnimationData from "@/assets/animations/a2.json"
    import * as thirdBlockAnimationData from "@/assets/animations/a5.json"

    export default {
        data: () => ({
            firstBlockOptions: {animationData: firstBlockAnimationData.default},
            secondBlockOptions: {animationData: secondBlockAnimationData.default},
            thirdBlockOptions: {animationData: thirdBlockAnimationData.default},
            inViewPort: false
        }),
        methods: {
            handleViewPort(e) {
                if (e.type === "progress" && e.percentTop < 0.70 && !this.inViewPort) {
                    this.inViewPort = true
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
  .section-meal {
    @apply relative pt-10 pb-24 px-10 w-full;
    transition: margin .2s ease-in;

    @screen lg {
      &:hover {
        @apply -my-2;
      }
    }

    &__image {
      @apply h-20 flex items-center;

      img {
        @apply w-16 mx-auto;
        transition: transform .2s linear;
      }
    }

    &__bg-image {
      @apply absolute bottom-0 right-0 w-24;
      opacity: .05;
    }

    h3 {
      @apply font-semibold pb-6 text-lg;
    }

    p {
      @apply leading-relaxed;
    }
  }
</style>
