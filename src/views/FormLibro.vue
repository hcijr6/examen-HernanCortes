<template>
  <div class="container form-oferta">
    <h1>{{ id ? 'Editar libro' : 'Añadir libro' }}
    </h1>
    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
      <form
        novalidate
        @submit.prevent="handleSubmit(save)">

        <input
            placeholder="Id"
            v-model="libro.id"
            type="text"
            class="form-control"
            disabled />
        
         <validation-provider
          class="form-group"
          v-slot="{ errors }"
          name="ISBN">
          <input
            placeholder="ISBN"
            v-model="libro.ISBN"
            type="text"
            class="form-control"
            required />
          <span class="error">{{ errors[0] }}</span>
        </validation-provider>


        <validation-provider
          class="form-group"
          v-slot="{ errors }"
          name="nombre">
          <input
            placeholder="nombre"
            v-model="libro.nombre"
            type="text"
            class="form-control"
            autofocus
            minLength="3"
            maxLength="80"
            required />
          <span class="error">{{ errors[0] }}</span>
        </validation-provider>

        <validation-provider
          class="form-group"
          v-slot="{ errors }"
          name="tema">
          <select
            placeholder="tema"
            v-model="libro.tema"
            class="form-control"
            required
          >
            <option :value="0">--- Escoge tema ---</option>
            <option 
                v-for="tema in temas" 
                :key="tema.id"
                :value="tema.id"
            >{{ tema.nombre }}</option>
          </select>
          <span class="error">{{ errors[0] }}</span>
        </validation-provider>

        <validation-provider
          class="form-group"
          v-slot="{ errors }"
          name="autor">
          <select
            placeholder="autor"
            v-model="libro.autor"
            class="form-control"
            required
          >
            <option :value="0">--- Escoge autor ---</option>
            <option 
                v-for="autor in autores" 
                :key="autor.id"
                :value="autor.id"
            >{{ autor.nombre }}</option>
          </select>
          <span class="error">{{ errors[0] }}</span>
        </validation-provider>

        <validation-provider
          class="form-group"
          v-slot="{ errors }"
          name="img">
          <input
            placeholder="imagen"
            v-model="libro.img"
            type="text"
            class="form-control"
            autofocus
            required />
          <span class="error">{{ errors[0] }}</span>
        </validation-provider>

        <button
          type="submit"
          class="btn btn-default btn-primary">    Guardar  </button>
        <button type="button" @click="cancel" class="btn btn-danger">Cancelar</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { extend, localize } from "vee-validate";
import es from "vee-validate/dist/locale/es.json";

localize("es", es);

import {
  required,
  min,
  max,
} from "vee-validate/dist/rules";

extend("required", required);
extend("min", min);
extend("max", max);

export default {
  name: "form-libro",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  props: ["id"],
    computed: {
    autores() {
      return this.$store.state.autores;
    },
    temas() {
      return this.$store.state.temas;
    },
  },
  mounted() {
    if (this.id) {
      this.libro = this.$store.getters.getLibro(this.id);
    } else {
      this.libro = {};
    }
  },
  data() {
    return {
      libro:[],
    };
  },
  methods: {
    save() {
      if(this.id){
          this.$store.dispatch('putLibro',  this.libro)
        .then(() => this.$router.push("/verAutor/" + this.libro.autor))
        .catch((err) => alert(err.message || err));
      }
      else{
        this.$store.dispatch('postLibro',  this.libro)
        .then(() => this.libro= {})
        .catch((err) => alert(err.message || err));
      }
    },
    cancel() {
      this.$router.push('/')
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
