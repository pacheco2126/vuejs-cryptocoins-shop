<script setup>
import { useShopStore } from "../stores/shop";
import CoinCard from "../components/CoinCard.vue";

const shop = useShopStore();
</script>

<template>
    <div id="all-coins">
        <div class="card-grid">
            <CoinCard v-for="coin in shop.coins" 
            :key="coin.id" 
            :coin="coin" 
            @add-to-cart="shop.addToCart" />
        </div>
    </div>
</template>

<script>
export default {
    components: {
        CoinCard
    }
  }
</script>

<style scoped>
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
}

#all-coins{
    position: relative;
    margin: 0 auto; /* Centrar el contenedor horizontalmente */
}
</style>