<template>
  <section class="flex flex-col justify-center w-full mb-16" style="min-height: 300px;" v-view="handleViewPort">
    <zoom-center-transition :duration="800">
      <h2 class="text-center font-bold text--yellow text-4xl py-12" v-show="inViewPort">
        <span class="text--black">Inst</span>agram
      </h2>
    </zoom-center-transition>

    <div class="banner-wrapper relative">
      <div class="instagram-feed-background">
        <div class="background-container">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <zoom-center-transition :duration="800">
        <div class="instagram-feed mb-12" v-show="inViewPort">
          <!--<vue-instagram token="accessTokenHere" :count="5" :tags="['hashtag1', 'hashtag2']" mediaType="image">
            <template v-slot:loading="props">
              <h1 v-if="props.loading" class="fancy-loading">Loading, please wait...</h1>
            </template>
            <template v-slot:feeds="props">
              <li class="fancy-list"> {{ props.feed.link }}</li>
            </template>
            <template v-slot:error="props">
              <div class="fancy-alert"> {{ props.error.error_message }}</div>
            </template>
          </vue-instagram>-->
          <div v-for="(item, index) in items" :key="index" class="instagram-feed__items z-10">
            <div class="instagram-feed__item__image" @mousemove="imageHovered = item[0].id"
                 @mouseleave="imageHovered = 0">
              <AnimationLoader class="instagram-loader" v-if="!item[0].loaded"/>
              <v-lazy-image @load="item[0].loaded = true" :src="require(`@/assets/images/instagram/${item[0].id}.png`)"
                            alt=""/>
              <transition name="fade">
                <div class="instagram-feed__item__image__cover" style="height: 60%" v-if="imageHovered === item[0].id">
                  <a href="#">
                    <i class="fas fa-eye fa-2x"></i>
                  </a>
                </div>
              </transition>
            </div>
            <div class="instagram-feed__item__image" style="margin-top: -45%;" @mousemove="imageHovered = item[1].id"
                 @mouseleave="imageHovered = 0">
              <AnimationLoader class="instagram-loader" v-if="!item[1].loaded"/>
              <v-lazy-image @load="item[1].loaded = true" :src="require(`@/assets/images/instagram/${item[1].id}.png`)" alt=""/>
              <transition name="fade">
                <div class="instagram-feed__item__image__cover" v-if="imageHovered === item[1].id">
                  <a href="#">
                    <i class="fas fa-eye fa-2x"></i>
                  </a>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </zoom-center-transition>
    </div>

    <button class="button button--red mx-auto">Follow</button>
  </section>
</template>

<script>
    // import VueInstagram from 'vue-instagram'

    export default {
        data: () => ({
            inViewPort: false,
            imageHovered: 0,
            items: [
                [{
                    id: 1,
                    loaded: false,
                }, {
                    id: 2,
                    loaded: false
                }],
                [{
                    id: 3,
                    loaded: false,
                }, {
                    id: 4,
                    loaded: false
                }],
                [{
                    id: 5,
                    loaded: false,
                }, {
                    id: 6,
                    loaded: false
                }],
                [{
                    id: 7,
                    loaded: false,
                }, {
                    id: 8,
                    loaded: false
                }]
            ]
        }),
        methods: {
            handleViewPort(e) {
                if (e.type === "progress" && e.percentTop < 0.90 && !this.inViewPort) {
                    this.inViewPort = true
                }
            }
        },
        components: {
            AnimationLoader: () => import('@/components/common/animation/loader')
            // VueInstagram
        }
    }
</script>

<style lang="scss" scoped>
  .v-lazy-image {
    height: 0 !important;
  }

  .v-lazy-image-loaded {
    height: 100% !important;
  }

  .instagram-loader {
    width: auto !important;
    height: auto !important;
  }

  .instagram-feed-background {
    @apply absolute inset-0;
    margin: 0;
  }

  .instagram-feed {
    padding: 5% 0;
  }

  @screen sm {
    .instagram-feed {
      padding: 5%;
    }
  }

  .instagram-feed {
    @apply grid grid-cols-2 gap-0 row-gap-0 col-gap-0;

    &__item__image {
      @apply relative ;

      img {
        width: 100%;
        height: 100%;
      }

      &__cover {
        @apply absolute top-0 flex justify-center items-center;
        background: rgba(255, 0, 0, 0.3);
        width: 100%;
        height: 100%;

        a {
          @apply text-white;
        }
      }
    }

    &__items:nth-child(2),
    &__items:nth-child(4) {
      @apply pt-16;
    }

    &__items:nth-child(3),
    &__items:nth-child(4) {
      margin-top: -40%;
    }

    @screen lg {
      &__items:nth-child(3),
      &__items:nth-child(4) {
        margin-top: 0;
      }
    }
  }

  @screen sm {
    .instagram-feed {
      @apply grid-cols-4;
    }
  }
  .background-container {
    @apply relative w-full h-full;

    div:nth-child(1) {
      background: var(--yellow);
      width: 27%;
      height: 35%;
      margin-top: 2%;
    }

    div:nth-child(2) {
      background: var(--red);
      width: 20%;
      height: 45%;
      margin-left: 4%;
    }

    div:nth-child(3) {
      @apply absolute top-0 right-0;
      background: var(--red);
      width: 20%;
      height: 45%;
      margin-right: 4%;
    }

    div:nth-child(4) {
      @apply absolute right-0;
      top: 45%;
      background: var(--yellow);
      width: 27%;
      height: 40%;
    }
  }
</style>
