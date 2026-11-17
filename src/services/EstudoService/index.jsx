import axios from "axios";
import UserService from "../Usuario";

export default class EstudoService {
    constructor() {
        const BASE_URL = import.meta.env.VITE_LOGIN_API;
        this.axios = axios.create({
            baseURL: BASE_URL,
            headers: {
                "Content-Type": "application/json",
            },
        });

        this.userService = new UserService();
    }

    async buscaEstudos(idProva, idMateria, idAssunto) {
        const { data } = await this.axios.get(
            `/provas/${idProva}/materias/${idMateria}/assuntos/${idAssunto}/estudos`,
            this.userService.getHeaderWithTokenFromLocalStorage()
        );
        return data;
    }

    async adicionaEstudo({ idProva, idMateria, idAssunto, estudo }) {
        const payload = {
            dataEstudo: estudo.dataEstudo,
            horas: Number(estudo.horas),
            minutos: Number(estudo.minutos),
        };
        const { data } = await this.axios.post(
            `/provas/${idProva}/materias/${idMateria}/assuntos/${idAssunto}/estudos`,
            payload,
            this.userService.getHeaderWithTokenFromLocalStorage()
        );
        return data;
    }

    async editaEstudo({ idProva, idMateria, idAssunto, idEstudo, estudo }) {
        const payload = {
            dataEstudo: estudo.dataEstudo,
            horas: Number(estudo.horas),
            minutos: Number(estudo.minutos),
        };
        const { data } = await this.axios.put(
            `/provas/${idProva}/materias/${idMateria}/assuntos/${idAssunto}/estudos/${idEstudo}`,
            payload,
            this.userService.getHeaderWithTokenFromLocalStorage()
        );
        return data;
    }

    async deletaEstudo({ idProva, idMateria, idAssunto, idEstudo }) {
        const response = await this.axios.delete(
            `/provas/${idProva}/materias/${idMateria}/assuntos/${idAssunto}/estudos/${idEstudo}`,
            this.userService.getHeaderWithTokenFromLocalStorage()
        );
        return response;
    }
}
