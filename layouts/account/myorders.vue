<template>
  <div>
    <div class="header-padding-top primary-color"></div>
    <div class="heading primary-color">
      <h2 class="app-container font-bold text--yellow text-4xl pb-5 pt-5">
        My
        <span class="text-white">Orders</span>
      </h2>
    </div>
    <section class="app-container pb-16">
      <div class="meals-slider w-full overflow-hidden">
        <!-- Three columns -->
        <div class="flex mb-4 flex-wrap">
          <div class="w-full lg:w-1/3 px-3 py-4 h-full" v-for="p in orders" :key="p.id">
            <div class="flex flex-col lg:flex-col md:flex-row rounded overflow-hidden shadow">
              <div class="md:w-1/2 lg:w-full">
                <img class="w-full" src="/img/static/login.svg" alt="Sunset in the mountains" />
              </div>
              <div class="md:w-1/2 lg:w-full relative">
                <div class="px-3 py-4 border-b">
                  <div class="text-sm">{{p.product_name}}</div>
                </div>
                <div class="px-3 pb-20 pt-2">
                  <div class="font-bold text-sm text-green-500 text-center">#{{p.order_id}}</div>
                  <table class="table-auto w-full">
                    <tbody>
                      <tr>
                        <td class="text-sm">
                          <p>{{p.customer_name}}</p>
                        </td>
                        <td class="text-right text-sm">{{p.location}}</td>
                      </tr>
                      <tr>
                        <td class="text-sm">{{p.location}}</td>
                        <td class="text-right text-sm">{{p.meal_type}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="absolute bottom-0 right-0 left-0">
                  <div class="px-3 py-2">
                    <table class="table-auto w-full">
                      <tbody>
                        <tr>
                          <td class="text-sm">
                            <p>{{p.status}}</p>
                          </td>
                          <td class="text-right text-sm text-yellow-600">{{p.time_remaining}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="bg-gray-700 shadow w-full">
                    <div
                      class="bg-progress text-xs leading-none py-1 text-center text-white"
                      :style="'width: ' + p.progress + '%'"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    orders: [
      {
        id: 1,
        product_name: "Sausage and Potato Casserole",
        order_id: 20123341,
        customer_name: "John Doe",
        location: "Lagos, Nigeria",
        status: "In the Oven",
        progress: 10,
        time_remaining: "20:01",
        meal_type: "Cheaf Meal Plate",
        quantity: "1 x 250ml"
      },
      {
        id: 2,
        product_name: "Pineapple, Cheese and Ham Salad",
        order_id: 20123341,
        customer_name: "John Doe",
        location: "Lagos, Nigeria",
        status: "Complete",
        progress: 100,
        time_remaining: "Awaiting Feedback",
        meal_type: "Cheaf Meal Plate"
      },
      {
        id: 3,
        product_name: "Baked Mushrooms and Capsicum",
        order_id: 20123341,
        customer_name: "John Doe",
        location: "Lagos, Nigeria",
        progress: 51,
        status: "In the Oven",
        time_remaining: "18:52",
        meal_type: "Cheaf Meal Plate"
      }
    ]
  }),
  mounted(){


  },
  methods: {},
  components: {}
};
</script>

<style lang="scss">
label.accordion-label:after {
  content: "+";
  position: absolute;
  right: 1em;
  color: red;
  top: 0;
  line-height: 56px;
  font-size: 30px;
}

input:checked + label.accordion-label:after {
  content: "-";
  line-height: 56px;
}

.accordion__content {
  max-height: 0em;
  transition: all 0.1s cubic-bezier(0.865, 0.14, 0.095, 0.87);
}
input[name="panel"]:checked ~ .accordion__content {
  /* Get this as close to what height you expect */
  max-height: 50em;
}

.bg-progress {
  background-color: #f4b41a;
}
</style>