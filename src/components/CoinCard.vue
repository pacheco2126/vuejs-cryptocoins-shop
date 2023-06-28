<template>
  <div class="card">
    <div class="card-content">
      <div class="coin-info">
        <div class="coin-image-container">
          <img :src="coin.image" alt="Coin image" class="coin-image">
        </div>
        <div class="coin-details">
          <h6 class="coin-name">{{ coin.name }} 
            <span style="color: #7769ff; font-size: 15px;">({{ coin.symbol }})</span></h6>
        </div>
      </div>
      <div class="coin-description">
        <p class="desc">{{ coin.description }}</p>
      </div>
      <div class="price-container">
          <div class="coin-price">
            <strong>Precio</strong><br>
            <p class="price">€{{ coin.price }}</p>
          </div>
          <div class="add-to-cart">
            <button class="bi-cart3 buttons" @click="addToCart(coin)">
              Añadir al carrito
            </button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoinCard",
  props: {
    coin: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addToCart(coin) {
      this.$emit("add-to-cart", coin);
    },
  },
};
</script>
  
<style scoped>
.card {
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
}

.coin-image {
  width: 60px;
  height: 60px;
  border-radius: 5px;
}

.card-content {
  display: grid;
  grid-template-rows: auto auto auto;
  align-items: start;
  border: 1px solid #ccc;
  padding: 1rem;
}

.coin-info {
  display: flex;
  align-items: center;
}

.coin-image-container {
  margin-right: 10px;
}

.coin-details {
  display: flex;
  align-items: center;
}

.coin-name {
  font-size: 20px;
  font-weight: bold;
}

.coin-description {
  font-size: 16px;
  line-height: 1.5;
  overflow: auto;
  text-overflow: ellipsis;
}

.coin-price {
  margin-right: 10px;
  float: left;
}

.add-to-cart {
  margin-left: auto;
  float: right;
}

.buttons {
  background: linear-gradient(to right, #7769ff, #5a8afe);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 7px 14px;
  transition: background-color 0.3s ease;
}

.buttons:hover {
  background: linear-gradient(to right, #7061f6, #497df5);
}

.desc {
  text-align: justify;
  text-justify: inter-word;
}

.price-container{
  padding-top: 20px;
  border-top: 1px solid #ccc;
}

.price{
  font-size: 1.1em;
  font-family: "Montserrat";
}
</style> 