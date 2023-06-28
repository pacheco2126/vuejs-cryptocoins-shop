import { defineStore } from "pinia";

import axios from 'axios';

export const useShopStore = defineStore("shop", {
  state: () => {
    return {
      coins: [],
      cart: [],
      originalCoins: [],
      coinSearch: ""
    };
  },
  getters: {
    cartQuantity() {
      return this.cart.reduce((prev, curr) => {
        return prev + curr.quantity;
      }, 0);
    },
    cartTotal() {
      return this.cart.reduce((prev, curr) => {
        return prev + curr.price * curr.quantity;
      }, 0);    },
  },
  actions: {
    addToCart(coin) {
      const existingId = this.cart
        .findIndex((cartCoin) => cartCoin.id === coin.id);

      if (existingId !== -1) {
        this.cart[existingId].quantity += 1;
      } else {
        this.cart.push({
          ...coin,
          quantity: 1,
        });
      }
    },
    removeCoin(targetCoin) {
      this.cart = this.cart.filter((coin) => coin.id !== targetCoin.id);
    },

    fetchCoinData() {
      axios.get("http://localhost:3000/api/coins")
        .then((response) => {
          this.coins = response.data;
          this.originalCoins = this.coins;
        })
        .catch((error) => {
          console.error(error);
        });

    },
    updateCoinPrices() {
      this.coins.forEach(coin => {
        let symbol = coin.symbol;
        let options = {
          fsym: symbol,
          tsyms: "EUR"
        };
        let baseUrl = "https://min-api.cryptocompare.com/data/price";
        let apiKey = "e6248d4d7f16591a92a1a337733df060b400691dd99343986a3c4d6e95b90bc1";

        let fullURL = getFullURL(baseUrl, options);
        axios
          .get(fullURL, { headers: { authorization: "Apikey " + apiKey } })
          .then(response => {
            coin.price = response.data.EUR;
          })
          .catch(error => {
            console.error(error);
          });
      });
    },
    searchCoins() {
      if (this.coinSearch === "") {
          this.coins = this.originalCoins;
          return;
      }

      const searchedCoins = this.originalCoins.filter((coin) =>
          coin.name.toLowerCase().includes(this.coinSearch.toLowerCase())
      );

      this.coins = searchedCoins;
  },
  },
});

function getFullURL(url, options) {
  const params = [];
  for (let key in options) {
    params.push(`${key}=${options[key]}`);
  }
  return url + "?" + params.join("&");
}