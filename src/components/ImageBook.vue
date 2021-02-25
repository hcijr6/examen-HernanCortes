<template>
    <b-card :header="nomTema" header-tag="header">
        <img :src="require('../assets/'+ libro.img)" height="100px" :alt="libro.nombre">
    </b-card>
</template>

<script>

export default {
  name: "libro-img",
  props: ['libro'],
  computed: {
    nomTema() {
      return this.$store.getters.getTemaName(Number(this.libro.tema));
    },
  },
};
</script>