<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Libros</router-link> |
      <router-link to="/Autores">Autores</router-link> |
      <router-link to="/FormLibro">FormLibro</router-link> |
      <router-link to="/about">Acerca de</router-link>
    </div>
    <router-view/>
    <footer>Hernán Cortés</footer>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('loadTemas');
    this.$store.dispatch('loadAutores');
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
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
