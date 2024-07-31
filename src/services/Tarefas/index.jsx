import axios from "axios";
import UserService from "../Usuario";
import DataService from "../DataService";

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
        this.dataService = new DataService();
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
        const { data } = await this.axios.put(`/tarefas/concluir/${id}`, null, this.userService.getHeaderWithTokenFromLocalStorage());
        return data;
    }

    deletarTarefa = async (id) => {
        const response = await this.axios.delete(`/tarefas/${id}`, this.userService.getHeaderWithTokenFromLocalStorage());
        return response;
    }

    alterarTarefa = async (tarefa) => {
        const { id, titulo, descricao } = tarefa;
        let tarefaAlterada = { titulo: titulo, descricao: descricao, data: this.dataService.transformaDataEmStringParaEnviarApi(tarefa.data) };
        const { data } = await this.axios.put(`/tarefas/${id}`, tarefaAlterada, this.userService.getHeaderWithTokenFromLocalStorage());
        return data;
    }

    adicionarTarefa = async (tarefa) => {
        const { titulo, descricao } = tarefa;
        let tarefaNova = { titulo: titulo, descricao: descricao, data: this.dataService.transformaDataEmStringParaEnviarApi(tarefa.data) };

        const { data } = await this.axios.post(`/tarefas`, tarefaNova, this.userService.getHeaderWithTokenFromLocalStorage());
        return data;
    }

}