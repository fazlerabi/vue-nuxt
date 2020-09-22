<!-- Select control contains sizes of the meal -->

<template>
  <div class="inline-block relative w-32">
    <select
      class="appearance-none bg-gray-800 block border-gray-400 focus:outline-none focus:shadow-outline hover:border-gray-500 leading-tight pr-8 px-4 py-2 text-sm text-white w-auto" v-model="size">
      <option v-for="(option, index) in options" :key="index" :value="option.price">{{ option.title }}</option>
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
      </svg>
    </div>
  </div>
</template>

<script>
    export default {
        props: {
            options: Array
        },
        data: () => ({
            size: null
        }),
        watch: {
            size: function (newValue) {
                this.$emit('sizeChange', newValue)
            }
        },
        beforeMount() {
            this.size = this.options[0].price
        }
    }
</script>