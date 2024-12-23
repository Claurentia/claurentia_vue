<template>
  <div id="app">
    <header>
      <NavBar />
    </header>
    <main>
      <HomePage />
      <ProjectsPage />
      <MinigamesPage />
    </main>
    <footer>
      <!-- Add footer component here later -->
    </footer>
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'
import NavBar from './components/NavBar.vue'
import ProjectsPage from './components/ProjectsPage.vue'
import MinigamesPage from './components/MinigamesPage.vue'

export default {
  name: 'App',
  components: {
    HomePage,
    NavBar,
    ProjectsPage,
    MinigamesPage
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

main {
  scroll-snap-type: y mandatory;
  height: 100vh;
  overflow-y: scroll;
}

main > * {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
</style>