<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="form-container">
      <div class="form-group">
        <label for="name">Item name</label>
        <input type="text" id="name" v-model="item.name" />
      </div>
      <div class="form-group">
        <label for="price">Item price (USD)</label>
        <input type="number" id="price" v-model="item.price" />
      </div>
      <div class="form-group">
        <button id="copy-button" @click="copyItem">Copy</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      title: 'Web App Title',
      item: {
        name: '',
        price: 0
      }
    }
  },
  methods: {
    copyItem() {
      alert('Item copied!');
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
