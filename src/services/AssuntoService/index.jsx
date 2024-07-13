import axios from 'axios';
import UserService from '../Usuario';

export default class AssuntoService {
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

    async buscaAssuntos() {
        try {
            const response = await this.axios.get(`/provas/${idProva}/materias/${idMateria}/assuntos`, this.userService.getHeaderWithTokenFromLocalStorage());
            return response;
            
        } catch (error) {
            return error;
        }
    }

    async adicionaAssunto(assunto) {
        try {
            const response = await this.axios.post(`/provas/${idProva}/materias/${idMateria}/assuntos`, assunto, this.userService.getHeaderWithTokenFromLocalStorage());
            return response.data;
            
        } catch (error) {
            return error;
        }
    }

}