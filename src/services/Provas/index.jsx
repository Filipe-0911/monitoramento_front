import axios from 'axios';
import UserService from '../Usuario';

export default class ProvasService {
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

    async buscaProvas() {
        const response = await this.axios.get('/provas', this.userService.getHeaderWithTokenFromLocalStorage());
        return await this.buscaTodasAsProvas(response.data);
    }

    async buscaTodasAsProvas(pagination) {
        if (pagination.page.totalPages > 1) {
            let provas = new Array();
            for (let i = 0; i < pagination.pages.totalPages; i++) {
                const response = await this.axios.get(`/provas?page=${i}`, this.userService.getHeaderWithTokenFromLocalStorage());

                provas = [...provas, ...response.data.content];
                return provas;
            }
        }

        return pagination.content;
    }

    async buscaProvaPorId(id) {
        try {
            const response = await this.axios.get(`/provas/${id}`, this.userService.getHeaderWithTokenFromLocalStorage());
            return response.data;

        } catch (error) {
            return error
        }
    }

    async adicionaProva(prova) {
        const response = await this.axios.post('/provas', prova, this.userService.getHeaderWithTokenFromLocalStorage());
        return response;
    }

    async alteraProva(prova) {
        const { id, titulo, dataDaProva, corDaProva } = prova;
        const response = await this.axios.put(`/provas/${id}`, { titulo: titulo, dataDaProva: dataDaProva, corDaProva: corDaProva }, this.userService.getHeaderWithTokenFromLocalStorage());
        return response.data
    }

    async deletaProva(id) {
        const response = await this.axios.delete(`/provas/${id}`, this.userService.getHeaderWithTokenFromLocalStorage());
        return response;
    }

    async buscaMediaQuestoes(idProva) {
        const { data } = await this.axios.get(`media-questoes/${idProva}`, this.userService.getHeaderWithTokenFromLocalStorage());

        if (data.page.totalPages > 1) {
            let dadosQuestoes = new Array();
            for (let i = 0; i < data.page.totalPages; i++) {
                const { data } = await this.axios.get(`media-questoes/${idProva}?page=${i}`, this.userService.getHeaderWithTokenFromLocalStorage())
                dadosQuestoes = [...dadosQuestoes, ...data.content];
            }
            return dadosQuestoes;
        }

        return data.content;

    }

}