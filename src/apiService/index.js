import axios from 'axios';
const baseURL = 'http://localhost:3000';

const autores = {
    getAll: () => axios.get(`${baseURL}/autores`),
};

const temas = {
    getAll: () => axios.get(`${baseURL}/temas`),
};

const libros = {
    getAll: () => axios.get(`${baseURL}/libros`),
    getAllByAutor: (idAutor) => axios.get(`${baseURL}/libros?autor=${idAutor}`),
    delete: (id) => axios.delete(`${baseURL}/libros/${id}`),
    create: (item) => axios.post(`${baseURL}/libros`, item),
    modify: (item) => axios.put(`${baseURL}/libros/${item.id}`, item),
};

export default {
    temas,
    autores,
    libros,
};