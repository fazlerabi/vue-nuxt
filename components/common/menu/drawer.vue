<template>
  <section class="absolute" @click.self="closeNav" id="drawer">
    <div id="mySidenav" class="sidenav">
      <div class="flex justify-between items-center">
        <div class="flex flex-col w-0">
          <p class="font-bold text--yellow text-2xl p-5 pb-0 whitespace-no-wrap">
            Meal
            <span class="text-white">Extra</span>
          </p>
          <p class="text-white p-5 pt-0 whitespace-no-wrap">
            Extra meal offers for
            <br />
            <span class="text--yellow">{{meal_name}}</span>
          </p>
        </div>
        <div class="pr-5">
          <a href="javascript:void(0)" class @click="closeNav">&times;</a>
        </div>
      </div>
      <hr style="border-top: 1px solid #565656" />
      <AnimationLoader v-if="isDataLoaded == 0" />
      <div v-if="isDataLoaded == 1">
        <div v-for="meal in extra" :key="meal._id">
          <div class="flex meals-slider__item mx-auto p-5">
            <div class="meals-slider__item__image">
              <!-- <AnimationLoader v-if="!isImageLoaded" />
            <v-lazy-image
              @load="isImageLoaded = true"
              :src="meal.photo"
              alt="Meal name"
              style="max-height: 180px"
              />-->

              <transition name="fade">
                <div class="meals-slider__item__image__cover" v-if="inTray">
                  <span class="meals-slider__item__image__cover__icon">
                    <i class="fas fa-check"></i>
                  </span>
                </div>
              </transition>
            </div>
            <div class>
              <p class="text-white">{{ meal.meal[0]['name'] }}</p>
              <p class="font-light text-sm pb-3 text-white">₦{{ price }}</p>

              <div class="flex items-center mb-4">
                <SelectSize
                  v-if="meal.prices.length"
                  :options="meal.prices"
                  @sizeChange="onSizeChange"
                />

                <QuantityInput @quantityChange="onQuantityChange" class="text-white" />
              </div>

              <button
                v-if="inTray"
                class="button button--green w-full"
                @click.prevent="removeFromTray"
              >
                <i class="fas fa-trash-alt mr-4"></i>
                Remove
              </button>
              <button v-else class="button button--red w-full" @click.prevent="addToTray">
                <img src="@/assets/images/cart.png" alt width="32px" class="inline-block mr-4" />
                Add to Tray
              </button>
            </div>
          </div>

          <hr style="border-top: 1px solid #565656" />
        </div>
      </div>
      <div v-else-if="isDataLoaded == 2">
        <p class="p-6 text-white">No Extras available</p>
      </div>
    </div>
  </section>
</template>




<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  props: {
    meals: Array,
    meal_id: String
  },
  watch: {
    extra: function(newVal, oldVal) {
      // watch it
      // if (this.extra != 0) {
      //   this.meal_name = this.meals.filter(
      //     v => v._id == this.extra[0].meal_id
      //   )[0].name;
      // }
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
    }
  },
  data: () => ({
    isImageLoaded: false,
    price: 0,
    quantity: 1,
    size_price: 0,
    inTray: false,
  }),
  mounted() {
    console.log(this.meals);
  },
  computed: {
    ...mapGetters({
      extra: "meals/getExtra",
      isDataLoaded: "meals/getDataLoaded",
      meal_name: "meals/getExtraMealName"
    })
  },
  methods: {
    ...mapMutations({
      setIconAnimated: "cart/SET_ICON_ANIMATED",
      incrementTotalItems: "cart/INCREMENT_TOTAL_ITEMS",
      decrementTotalItems: "cart/DECREMENT_TOTAL_ITEMS"
    }),

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
    addToTray() {
      this.inTray = true;
      this.incrementTotalItems();
      this.setIconAnimated(true);
    },
    removeFromTray() {
      this.inTray = false;
      this.decrementTotalItems();
      this.setIconAnimated(true);
    },
    closeNav() {
      document.getElementById("mySidenav").style.width = "0px";
      document.getElementById("drawer").classList.remove("overlay");
      document.getElementsByTagName("body")[0].style.overflow = "auto";
      document.getElementById("mySidenav").style.overflow = "hidden";
    }
  },
  components: {
    AnimationLoader: () => import("@/components/common/animation/loader"),
    QuantityInput: () =>
      import("@/components/common/form/custom/quantityInput--food"),
    SelectSize: () => import("@/components/common/form/select/selectSize--food")
  }
};
</script>


<style lang="scss" scoped>
/* The side navigation menu */
.sidenav {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 99; /* Stay on top */
  top: 0;
  right: 0;
  background-color: #000; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
  box-shadow: 0 10px 10px 0px black;
}

/* The navigation menu links */
.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  font-family: Gotham;
  color: #818181;
  display: block;
  transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover,
.offcanvas a:focus {
  color: #f1f1f1;
}

/* Position and style the close button (top right corner) */
.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
#main {
  transition: margin-left 0.5s;
  padding: 20px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}

.overlay::after {
  position: fixed;
  content: "";
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(60, 60, 60, 0.7);
  z-index: 98;
}

.button {
  padding: 10px 0 !important;
}
</style>