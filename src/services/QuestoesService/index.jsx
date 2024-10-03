import axios from "axios";
import UserService from '../Usuario';

export default class QuestoesService {
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

    async adicionaEstatistica(dadosQuestao) {
        const { idProva, idMateria, idAssunto, questao } = dadosQuestao;
        try {
            const response = await this.axios.post(`/provas/${idProva}/materias/${idMateria}/assuntos/${idAssunto}/estatisticas`, questao, this.userService.getHeaderWithTokenFromLocalStorage());

            return response.data;
            
        } catch (error) {
            
        }
    }

    async buscaQuestoes(idProva, idMateria, paginaDeBusca = 0) {
        const response = await this.axios.get(`/provas/${idProva}/materias/${idMateria}/questoes?page=${paginaDeBusca}`, this.userService.getHeaderWithTokenFromLocalStorage());
        return response;
    }

    async buscaQuestoesParaEditar(idProva, idMateria, paginaDeBusca = 0) {
        const response = await this.axios.get(`/provas/${idProva}/materias/${idMateria}/questoes/editar?page=${paginaDeBusca}`, this.userService.getHeaderWithTokenFromLocalStorage());
        return response;
    }

    async verificaSeRepostaEstaCorreta(idProva, idMateria, idQuestao, resposta) {
        const { id } = resposta;
        const response = await this.axios.post(`/provas/${idProva}/materias/${idMateria}/questoes/${idQuestao}`, {
            idAlternativa: id
        } , this.userService.getHeaderWithTokenFromLocalStorage());
        
        return response.data;

    }

    async adicionaQuestao (idProva, idMateria, dadosQuestao) {
        const response = await this.axios.post(`/provas/${idProva}/materias/${idMateria}/questoes`, dadosQuestao, this.userService.getHeaderWithTokenFromLocalStorage());
        return response;

    }

    async deletaQuestao (idProva, idMateria, idQuestao) {
        const response = await this.axios.delete(`/provas/${idProva}/materias/${idMateria}/questoes/${idQuestao}`, this.userService.getHeaderWithTokenFromLocalStorage());
        return response;
    }

    async editarQuestao(idProva, idMateria, idQuestao, questao) {
        const response = await this.axios.put(`/provas/${idProva}/materias/${idMateria}/questoes/${idQuestao}`, questao, this.userService.getHeaderWithTokenFromLocalStorage());
        return response;
    }
}