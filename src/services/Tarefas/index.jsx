import axios from "axios";
import UserService from "../Usuario";

export default class TarefaService {
    constructor() {
        const BASE_URL = import.meta.env.VITE_LOGIN_API;
        this.axios = axios.create({
            baseURL: BASE_URL,
            headers: {
                "Content-Type": "application/json",
            },
        })
        this.userService = new UserService();
    }

    buscaTarefas = async () => {
        const { data } = await this.axios.get("/tarefas", this.userService.getHeaderWithTokenFromLocalStorage());

        return await this.buscarTarefasDeTodasAsPagina(data)
    }

    buscarTarefasDeTodasAsPagina = async (dataReceived) => {
        const { page } = dataReceived;
        const tarefas = [];

        if (page.totalPages > 1) {
            for (let i = 0; i < page.totalPages; i++) {
                const response = await this.axios.get(`/tarefas?page=${i}`, this.userService.getHeaderWithTokenFromLocalStorage());
    
                tarefas.push(...response.data.content);
            }
            return tarefas;
        }

        const { data } = await this.axios.get(`/tarefas`, this.userService.getHeaderWithTokenFromLocalStorage());
        return data.content;
    }

    concluirTarefa = async (id) => {
        try {
            // http://localhost:8080/tarefas/10
            const { data } = await this.axios.put(`/tarefas/concluir/${id}`, null, this.userService.getHeaderWithTokenFromLocalStorage());
            return data;
        } catch (error) {
            return error.response;
        }
    }

    deletarTarefa = async (id) => {
        try {
            const { data } = await this.axios.delete(`/tarefas/${id}`, this.userService.getHeaderWithTokenFromLocalStorage());
            return data;
        } catch (error) {
            return error.response;
        }
    }

    alterarTarefa = async (tarefa) => {
        const { id, titulo, descricao } = tarefa;
        let tarefaAlterada = { titulo: titulo, descricao: descricao, data: this.transformarDataEmString(tarefa.data) };

        try {
            const { data } = await this.axios.put(`/tarefas/${id}`, tarefaAlterada, this.userService.getHeaderWithTokenFromLocalStorage());
            return data;
        } catch (error) {
            return error.response;
        }
    }

    transformarDataEmString(data) {
        return new Date(data).toLocaleString().replace(',', '').substring(0,16);
    }

}