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
            const response = await this.axios.post(`/provas/${idProva}/materias/${idMateria}/assuntos/${idAssunto}/questoes`, questao, this.userService.getHeaderWithTokenFromLocalStorage());

            return response.data;
            
        } catch (error) {
            
        }
    }
}