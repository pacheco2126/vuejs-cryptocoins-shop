<script setup>
import { RouterLink } from "vue-router";
import { useShopStore } from "../stores/shop";

const shop = useShopStore();
</script>

<template>
  <div class="p-3 d-flex justify-content-between align-items-center bg-white fixed-top">
    
    <RouterLink class="text-decoration-none text-black" to="/">Inicio</RouterLink>

    <div class="input-group ps-3">
      <div id="navbar-search-autocomplete" class="form-outline">
        <input type="text" name="search" v-model="shop.coinSearch" class="form-control" placeholder="Buscar criptomoneda" v-on:keyup="shop.searchCoins()" />
      </div>
    </div>

    <RouterLink class="d-flex gap-1 text-decoration-none text-black ps-3" to="/cart">
      <i class="bi bi-cart3"></i>
      <span class="text-black">{{ shop.cartQuantity }}</span>
    </RouterLink>

  </div>
</template>