<template>
  <div class="row">
    <div class="col-sm-12 col-md-12 col-lg-12">
      <h1>Listado de autores</h1>
      <table class="table table-striped table-hover">
        <thead class="thead-dark bg-primary">
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Nacionalidad</th>
            <th>Foto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="autor in autores" :key="autor.id" :autor="autor">
            <td>{{ autor.id }}</td>
            <td>{{ autor.nombre }}</td>
            <td>{{ autor.apellidos }}</td>
            <td>{{ autor.nacionalidad }}</td>
            <td>
              <img :src="require('@/assets/' + autor.img)" width="50px">
            </td>
            <td>
              <button
                class="btn btn-sm"
                title="Ver autor"
                @click="goToAutor(autor.id)"
              >
                <b-icon-eye-fill></b-icon-eye-fill>
              </button>
              <button
                class="btn btn-sm"
                title="Ver libros"
                @click="goToLibros(autor.id)"
              >
                <b-icon-calendar-fill></b-icon-calendar-fill>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
export default {
  name: 'AutoresTable',
  computed: {
    autores() {
      return this.$store.state.autores;
    },
  },
  methods:{
    goToAutor(id){
      this.$router.push('/verAutor/'+id)
    },
    goToLibros(id){
      this.$router.push('/libros/'+id)
    }
  }
}
</script>
