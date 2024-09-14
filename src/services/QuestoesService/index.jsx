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

    async adicionaQuestao(dadosQuestao) {
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
    async verificaSeRepostaEstaCorreta(idProva, idMateria, idQuestao, resposta) {
        const response = await this.axios.post(`/provas/${idProva}/materias/${idMateria}/questoes/${idQuestao}`, {
            respostaEscolhida: resposta
        } , this.userService.getHeaderWithTokenFromLocalStorage());
        
        return response.data;

    }
}