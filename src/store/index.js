import Vue from 'vue'
import Vuex from 'vuex'
import apiService from '@/apiService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    autores: [],
    temas: [],
    libros: [],
  },
  getters: {
    getLibro: (state) => (id) => {
      return state.libros.find(libro => libro.id === Number(id)) || {}
    },
    getAutorName: (state) => (id) => {
      const autor = state.autores.find(autor => autor.id === id)
      return autor.nombre
    },
    getTemaName: (state) => (id) => {
      return state.temas.find(tema => tema.id === id).nombre
    }
  },
  mutations: {
    loadTemas(state, temas) {
      state.temas = temas;
    },
    loadAutores(state, autores) {
      state.autores = autores;
    },
    loadLibros(state, libros) {
      state.libros = libros;
    },
    delLibro(state, id) {
      const index = state.libros.findIndex(libro => libro.id === id)
      if (index >= 0) state.libros.splice(index, 1)
    },
    updateLibro(state, libro) {
      const index = state.libros.findIndex(item => item.id === libro.id)
      if (index >= 0) state.libros.splice(index, 1, libro)
    },
    newLibro(state, libro) {
      state.libros.push(libro)
    },
  },
  actions: {
    loadTemas({ commit }) {
      apiService.temas.getAll()
      .then((response) => commit('loadTemas', response.data))
      .catch((err) => alert(err.message || err))
    },
    loadAutores({ commit }) {
      apiService.autores.getAll()
      .then((response) => commit('loadAutores', response.data))
      .catch((err) => alert(err.message || err))
    },
    loadAllLibros({ commit }) {
      apiService.libros.getAll()
      .then((response) => commit('loadLibros', response.data))
      .catch((err) => alert(err.message || err))
    },
    loadLibrosBy({ commit }, autor) {
      apiService.libros.getAllByAutor(autor)
      .then((response) => commit('loadLibros', response.data))
      .catch((err) => alert(err.message || err))
    },
    delLibro(context, id) {
      apiService.libros.delete(id)
      .then(() => {
        context.commit('delLibro', id)
      })
      .catch((err) => alert(err.message || err))
    },
    postLibro(context, libro ) {
      return new Promise((resolv, reject) => {
          apiService.libros.modify(libro)
          .then(response => {
            context.commit('updateLibro', response.data)
            resolv()
          })
          .catch(err => reject(err))
       
      })
    },
    putLibro(context, libro) {
      return new Promise((resolv, reject) => {
          apiService.libros.create(libro)
          .then(response => {
            context.commit('newLibro', response.data)
            resolv()
          })
          .catch(err => reject(err))
      })
    }
  },
  modules: {
  }
})
