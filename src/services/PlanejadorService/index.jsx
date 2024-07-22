import axios from "axios";
import UserService from "../Usuario";

export default class PlanejadorService {
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

    async buscarTodosOsPlanejadores () {
        try {
            const { data } = await this.axios.get('/planejador', this.userService.getHeaderWithTokenFromLocalStorage());
            if (data.page.totalPages > 1) {
                let planejadores = new Array();
                for (let i = 0; i < data.page.totalPages; i++) {
                    const { data } = await this.axios.get(`/planejador?page=${i}`, this.userService.getHeaderWithTokenFromLocalStorage())
                    planejadores = planejadores.concat(data.content);
                }
                
                return planejadores;
            }
            
            return data.content;
        } catch (error) {
            throw new Error('Erro ao buscar os planejadores');
        }
    }

    async adicionarEventos(evento) {
        let { dadosEvento, idAssunto } = evento;
        console.log();
        console.log(dadosEvento);
        console.log();
        try {
            const { data } = await this.axios.post(`/planejador/${idAssunto}`, dadosEvento, this.userService.getHeaderWithTokenFromLocalStorage());
            return data;
        } catch (error) {
            throw new Error('Erro ao adicionar eventos');
        }
    }

    async alterarEventos(evento) {
        let { dadosEvento, idEvento } = evento;
        console.log(dadosEvento);
        try {
            const { data } = await this.axios.put(`/planejador/especifico/${idEvento}`, dadosEvento, this.userService.getHeaderWithTokenFromLocalStorage());
            return data;
        } catch (error) {
            throw new Error('Erro ao alterar eventos');
        }
    }

    async excluirPlanejamento(idEvento) {
        try {
            const response = await this.axios.delete(`/planejador/especifico/${idEvento}`, this.userService.getHeaderWithTokenFromLocalStorage());
            return response;
        } catch (error) {
            throw new Error('Erro ao excluir eventos');
        }
    }
}