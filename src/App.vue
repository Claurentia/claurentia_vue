<template>
  <div id="app">
    <header>
      <NavBar />
    </header>
    <main>
      <HomePage />
    </main>
    <footer>
      <!-- Add footer component here later -->
    </footer>
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    HomePage,
    NavBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  overscroll-behavior: none;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}
</style>