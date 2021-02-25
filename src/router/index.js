import Vue from 'vue'
import VueRouter from 'vue-router'
import FormLibro from '../views/FormLibro.vue'
import Libros from '../views/Libros.vue'
import Autores from '../views/Autores.vue'
import verAutor from '../views/verAutor.vue'





Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Libros,
    props: true,
  },
  {
    path: '/libros/:id',
    name: 'Libros',
    component: Libros,
    props: true,
  },
  {
    path: '/Autores',
    name: 'Autores',
    component: Autores,
  },
  {
    path: '/FormLibro',
    name: 'FormLibro',
    component: FormLibro,
  },
  {
    path: '/FormLibro/:id',
    name: 'FormLibro',
    component: FormLibro,
    props: true,
  },
  {
    path: '/verAutor/:id',
    name: 'verAutor',
    component: verAutor,  
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
