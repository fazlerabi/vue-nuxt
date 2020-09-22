<!-- Menu item used in Top orders. Contains data of meal (check props below) -->

<template>
  <div class="flex flex-col meals-slider__item relative">
    <span class="meals-slider__item__price">₦{{ price }}</span>
    <div class="meals-slider__item__image">
      <AnimationLoader v-if="!isImageLoaded" />
      <v-lazy-image
        @load="isImageLoaded = true"
        :src="meal.photo"
        alt="Meal name"
        class="object-cover"
      />

      <transition name="fade">
        <div class="meals-slider__item__image__cover" v-if="inTray">
          <span class="meals-slider__item__image__cover__icon">
            <i class="fas fa-check"></i>
          </span>
        </div>
      </transition>
    </div>
    <p class="my-3">{{ meal.name }}</p>

    <div class="flex items-center mb-4">
      <SelectSize v-if="meal.prices.length" :options="meal.prices" @sizeChange="onSizeChange" />

      <QuantityInput @quantityChange="onQuantityChange" />
    </div>

    <div v-if="inTray" class="flex justify-between">
      <button
        class="button button--green whitespace-no-wrap flex items-center"
        @click.prevent="removeFromTray"
      >
            <i class="fas fa-trash-alt mr-4"></i>
        Remove
      </button>
      <button class="button bg-black whitespace-no-wrap" @click.prevent="openExtra(meal._id)">Extra</button>
    </div>

    <div class="flex justify-between" v-else>
      <button
        class="button button--red whitespace-no-wrap flex items-center"
        @click.prevent="addToTray(meal._id)"
      >
        <img src="@/assets/images/cart.png" alt width="32px" class="inline-block mr-2" />
        Add to Tray
      </button>
      <button class="button bg-black whitespace-no-wrap" @click.prevent="openExtra(meal._id, meal.name)">Extra</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    meal: {
      type: Object,
      default: () => ({
        prices: [],
        name: null,
        photo: null
      })
    }
  },
  data: () => ({
    isImageLoaded: false,
    price: 0,
    quantity: 1,
    size_price: 0,
    inTray: false
  }),
  methods: {
    ...mapMutations({
      setIconAnimated: "cart/SET_ICON_ANIMATED",
      incrementTotalItems: "cart/INCREMENT_TOTAL_ITEMS",
      decrementTotalItems: "cart/DECREMENT_TOTAL_ITEMS"
    }),
    getExtra(id, name) {
      this.$store.commit('meals/SET_EXTRA', [])

      var payload = {
        meal_id : id,
        name: name
      }
      this.$store.dispatch("meals/extra", payload).then(res => {
        console.log("res");
        console.log(res);
      });
    },
    setPrice() {
      this.price = this.size_price * this.quantity;
    },
    onQuantityChange(value) {
      this.quantity = value;
      this.setPrice();
    },
    onSizeChange(value) {
      this.size_price = value;
      this.setPrice();
    },
    addToTray(id) {
      this.inTray = true;
      this.incrementTotalItems();
      this.setIconAnimated(true);
      // this.openExtra(id);
    },
    openExtra(id, name) {
      this.getExtra(id , name)
      document.getElementById("mySidenav").style.width = "320px";
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
      document.getElementById("drawer").classList.add("overlay");
      document.getElementById("mySidenav").style.overflow = "auto";
    },
    removeFromTray() {
      this.inTray = false;
      this.decrementTotalItems();
      this.setIconAnimated(true);
    }
  },
  components: {
    AnimationLoader: () => import("@/components/common/animation/loader"),
    QuantityInput: () =>
      import("@/components/common/form/custom/quantityInput"),
    SelectSize: () => import("@/components/common/form/select/selectSize")
  }
};
</script>

<style lang="scss" scoped>
.v-lazy-image {
  height: 0 !important;
}

.button {
  padding-left: 30px;
  padding-right: 30px;
}

.v-lazy-image-loaded {
  height: 320px !important;
}

.meals-slider {
  &__item {
    max-width: 300px;

    &__price {
      @apply absolute top-0 bg-black text-white px-3 py-3 z-10;
    }

    &__image {
      @apply relative;

      img {
        width: 300px;
        height: 320px;
      }

      &__cover {
        @apply absolute top-0 flex justify-center items-center;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;

        &__icon {
          @apply rounded-full text-white border border-gray-600;
          background: var(--green);
          padding: 4px 7px 2px 7px;
        }
      }
    }
  }
}
</style>