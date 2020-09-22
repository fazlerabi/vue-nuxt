<!-- Custom input to handle quantity for meals -->

<template>
  <div class="ml-auto pl-8">
    <div class="flex items-center justify-end">
      <button class="rounded-full bg-gray-400 text-white text-xs px-2 py-1" @click.prevent="decrementQuantity">
        <i class="fas fa-minus"></i>
      </button>
      <input type="text" :value="quantity" min="1"
             class="w-8 mx-0 sm:mx-3 appearance-none focus:outline-none bg-transparent text-center">
      <button class="rounded-full bg--red text-white text-xs px-2 py-1" @click.prevent="incrementQuantity">
        <i class="fas fa-plus"></i>
      </button>
      <label v-if="false" class="quantity-label text--red">Quantity</label>
    </div>
  </div>
</template>

<script>
    export default {
        data: () => ({
            quantity: 1
        }),
        watch: {
            quantity: function (newValue) {
                this.$emit('quantityChange', newValue)
            }
        },
        methods: {
            incrementQuantity() {
                this.quantity++
            },
            decrementQuantity() {
                if (this.quantity > 1) {
                    this.quantity--
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
  .quantity-label {
    @apply text-xs w-full;
    transform: translateX(33%);
  }
</style>