<template>
  <div>
    <div class="header-padding-top primary-color"></div>
    <div class="heading primary-color">
      <h2 class="app-container font-bold text--yellow text-4xl pb-5 pt-5">
        TRACKING ORDER
      </h2>
    </div>
    <section class="app-container pt-12 pb-24 order-container">
      <div class="md:flex w-full">
        <div class="w-7/12">
          <AnimationLoader v-if="status === 'pending'" />
          <div v-if="status === 'fail'" class="w-full">
            <h2 class="font-bold text-3xl">
              Order does not Exist
            </h2>
          </div>
          <div class="w-full" v-else-if="status === 'success' && (tracks.length === 0 || tracks[0].updates.length === 0)">
            <h2 class="font-bold text-3xl">
              Has no tracking data
            </h2>
          </div>
          <div v-else-if="status === 'success'" class="w-full">
            <h2 class="font-bold text-3xl">
              Order #{{ tracks[0].track }}
            </h2>
            <div class="w-full mt-16">
              <div class="w-full mt-6" v-for="track in tracks" :key="track._id">
                <div class="w-full" v-for="(update, index) in track.updates" :key="update._id">
                  <div class="order-update pl-12" :class="{
                    vertical: index !== track.updates.length - 1,
                    'non-vertical': index === track.updates.length - 1
                  }">
                    <v-lazy-image
                      @load="isTickImageLoaded = true"
                      :src="require('@/assets/images/section/tick.png')"
                      alt="Tick"
                      class="order-tick"
                    />
                    <h2 class="text-2xl font-bold">
                      {{ update.title }}, {{ new Date(update.created).toString().slice(0, 16) }}
                    </h2>
                    <h4 class="order-detail">
                      {{ update.detail }}
                    </h4>
                    <h5 class="order-duration mt-3">
                      Duration: {{ update.duration }}min
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div class="w-5/12">
          <div class="w-full flex">
            <input
              class="flex-grow focus:outline-none text-lg text-grey-darker shadow-md pl-4"
              type="text"
              placeholder="Order ID"
              v-model="orderId"
            />
            <button
              class="bg-blue-500 button h-12 hover:bg-blue-600 text-white w-100 focus:outline-none "
              style="background-color: #F61907"
              type="button"
              @click="handleClickTrack"
            >Track</button>
          </div>
          <p v-if="error" class="mt-4 text-md text--red">{{ error }}</p>
          <div
            class="w-full mt-12"
            v-if="status === 'success' && tracks.length > 0 && tracks[0].updates.length > 0"
          >
            <AnimationLoader v-if="!isImageLoaded" />
            <v-lazy-image
              @load="isImageLoaded = true"
              :src="require('@/assets/images/section/food.png')"
              alt="Food"
              class="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
  data() {
    return {
      isImageLoaded: false,
      isTickImageLoaded: true,
      orderId: '',
      error: null,
    }
  },
  computed: {
    ...mapGetters({
      tracks: 'track/getTracks',
      status: 'track/getStatus'
    })
  },
  methods: {
    ...mapActions({
      fetchOrderById: 'track/fetchOrderById'
    }),
    handleClickTrack() {
      if (!this.orderId) {
        this.error = 'Order ID is required';
        return;
      }
      this.error = null;
      this.isTickImageLoaded = false;
      this.fetchOrderById(this.orderId);
    }
  },
  components: {
    AnimationLoader: () => import("@/components/common/animation/loader")
  }
};
</script>

<style lang="scss">
.order-container {
  min-height: 400px;
}

.order-update {
  position: relative;
  height: 160px;
}
.order-tick {
  position: absolute;
  left: -16px;
  width: 28px;
  height: 28px;
  background: snow;
}
.order-detail {
  font-size: 14px;
  color: #151515;
}
.order-duration {
  font-size: 13px;
  color: #F4B41A;
}
.vertical {
  border-left: 4px solid #F61907;
}
.non-vertical {
  border-left: 4px solid transparent;
}
</style> 