<script setup>
import { RouterView } from "vue-router";
import PageHeader from "./components/PageHeader.vue";
import { useShopStore } from "./stores/shop";

</script>

<template>
  <div class="container">
    <div id="page">
      <PageHeader />
      <RouterView />
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return { shop: useShopStore() }
  },
  mounted() {
    this.shop.fetchCoinData();
    //setInterval(this.shop.updateCoinPrices, 30000);
  }
};
</script>