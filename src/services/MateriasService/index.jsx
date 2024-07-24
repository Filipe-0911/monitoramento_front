import axios from 'axios';
import UserService from '../Usuario';

export default class MateriasService {
    constructor() {
        const BASE_URL = import.meta.env.VITE_LOGIN_API;
        this.axios = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.userService = new UserService();
    }

    async buscaMateriaEspecifica() {
        try {
            const { data } = await this.axios.get(`/provas/${idProva}/materias/${idMateria}`, this.userService.getHeaderWithTokenFromLocalStorage());
            return data;
            
        } catch (error) {
            return error;
        }
    }

    async buscaMaterias() {
        try {
            const { data } = await this.axios.get(`/provas/${idProva}/materias`, this.userService.getHeaderWithTokenFromLocalStorage());
            return data;
            
        } catch (error) {
            return error;
        }
    }

    async adicionaMateria(assunto) {
        const { nome, idProva, listaDeAssuntos } = assunto;
        let materia = { nome: nome, listaDeAssuntos: listaDeAssuntos };
        try {
            const response = await this.axios.post(`/provas/${idProva}/materias`, materia, this.userService.getHeaderWithTokenFromLocalStorage());
            return response.data;
            
        } catch (error) {
            return error;
        }
    }

    async deletaMateria(idProva, idMateria) {
        try {
            const response = await this.axios.delete(`/provas/${idProva}/materias/${idMateria}`, this.userService.getHeaderWithTokenFromLocalStorage());
            return response;
        } catch (error) {
            return error;
        }
    }

    async editarMateria(dados) {
        const {idProva, idMateria, novosDadosMateria } = dados;
        try {
            const response = await this.axios.put(`/provas/${idProva}/materias/${idMateria}`, novosDadosMateria, this.userService.getHeaderWithTokenFromLocalStorage());
            return response.data;
            
        } catch (error) {
            return error;
        }
    }

}