<template>
  <div class="row">
    <div class="col-sm-12 col-md-12 col-lg-12">
      <h1>Listado de Libros</h1>
      <h1 v-if="id">de {{nombreAutor(id)}}</h1>
      <table class="table table-striped table-hover">
        <thead class="thead-dark bg-primary">
          <tr>
            <th>Id</th>
            <th>ISBN</th>
            <th>Nombre</th>
            <th>tema</th>
            <th>autor</th>
            <th>img</th>
            <th>acciones</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="libro in libros" :key="libro.id">
            <td>{{ libro.id }}</td>
            <td>{{ libro.ISBN }}</td>
            <td>{{ libro.nombre }}</td>
            <td>{{ libro.tema }}</td>
            <td>{{nombreAutor(libro.autor) }}</td>
            <td><image-book :libro="libro" /></td>
            <td>
              <button
                class="btn btn-sm"
                title="Editar Libro"
                @click="editar(libro.id)"
              >
                <b-icon-pencil-fill></b-icon-pencil-fill>
              </button>
              <button
                class="btn btn-sm"
                title="Borrar Libro"
                @click="delLibro(libro)"

              >
                <b-icon-trash-fill></b-icon-trash-fill>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ImageBook from '@/components/ImageBook'

export default {
  name: "libros-table",
  components: {
      ImageBook
  },
  props: ['id'],
  mounted() {
      if(this.id){
          this.$store.dispatch('loadLibrosBy', this.id)
      }
      else{
            this.$store.dispatch('loadAllLibros')
      }
  },
  computed: {
    
    libros() {
        return this.$store.state.libros;
    }
  },
  methods: {
        editar(id){
            this.$router.push('/FormLibro/'+id)
        },
       
        delLibro(libro) {
        if (
            confirm('Vas a borrar el libro'+libro.nombre +' con id'+ libro.id)
        ) {
            this.$store.dispatch('delLibro', libro.id)
        }
        },
        nombreAutor(id) {
      return this.$store.getters.getAutorName(Number(id));
    },
  }
}
</script>