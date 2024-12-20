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

    async buscaAssuntoEspecifico(idProva, idMateria, idAssunto) {
        try {
            const { data } = await this.axios.get(`/provas/${idProva}/materias/${idMateria}/assuntos/${idAssunto}`, this.userService.getHeaderWithTokenFromLocalStorage());
            return data;

        } catch (error) {
            return error;
        }
    }

    async adicionaAssunto(assunto) {
        try {
            const { idProva, nome, quantidadePdf, idMateria } = assunto;
            let assuntoNovo = {
                nome: nome,
                quantidadePdf: parseInt(quantidadePdf)
            };

            const { data } = await this.axios.post(`/provas/${idProva}/materias/${idMateria}/assuntos`, JSON.stringify(assuntoNovo), this.userService.getHeaderWithTokenFromLocalStorage());
            return data;

        } catch (error) {
            return error;
        }
    }
    async deletarAssunto(assunto) {
        try {
            const { idProva, idMateria, idAssunto } = assunto;
            const response = await this.axios.delete(`/provas/${idProva}/materias/${idMateria}/assuntos/${idAssunto}`, this.userService.getHeaderWithTokenFromLocalStorage());
            return response;

        } catch (error) {
            return error;
        }
    }
    async editarAssunto(dadosAlteracaoAssunto) {
        try {
            const { idProva, idMateria, idAssunto, assunto } = dadosAlteracaoAssunto;
            const { data } = await this.axios.put(`/provas/${idProva}/materias/${idMateria}/assuntos/${idAssunto}`, JSON.stringify(assunto), this.userService.getHeaderWithTokenFromLocalStorage());
            return data;

        } catch (error) {
            return error;
        }
    }

    async adicionarComentarios(dadosParaAdicionarComentarios) {
        const { idProva, idMateria, idAssunto, comentarios } = dadosParaAdicionarComentarios
        console.log(comentarios)
        try {
            const response = await this.axios.post(`/provas/${idProva}/materias/${idMateria}/assuntos/${idAssunto}/comentarios`, JSON.stringify({
                comentarios: comentarios
            }), this.userService.getHeaderWithTokenFromLocalStorage());
            return response.data;

        } catch (error) {
            return error;
        }
    }

    async buscaAssuntoPorNome(nomeAssunto) {
        try {
            const response = await this.axios.get(`assuntos/${nomeAssunto}`, this.userService.getHeaderWithTokenFromLocalStorage());
            return response.data;

        } catch (error) {
            return error;
        }
    }

    async buscarTodosOsAssuntosDoUsuario() {

        try {
            const { data } = await this.axios.get('/assuntos', this.userService.getHeaderWithTokenFromLocalStorage());
            
            if(data.page.totalPages > 1) {
                let assuntos = new Array();
                for(let i = 0; i < data.page.totalPages; i++) {
                    const { data } = await this.axios.get(`/assuntos?page=${i}`, this.userService.getHeaderWithTokenFromLocalStorage());                    
                    assuntos = [...assuntos, data.content];
                }
                return assuntos.flat(Infinity);
            }
            return data.content;

        } catch (error) {
            return error;
        }
    }

    async buscarAssuntoPorIdMateria (idMateria) {
        try {
            const { data } = await this.axios.get(`/assuntos/idMateria=${idMateria}`, this.userService.getHeaderWithTokenFromLocalStorage());
            if (data.page.totalPages > 1) {
                let assuntos = new Array();
                for (let i = 0; i < data.page.totalPages; i++) {
                    const { data } = await this.axios.get(`/assuntos/idMateria=${idMateria}?page=${i}`, this.userService.getHeaderWithTokenFromLocalStorage());
                    assuntos = [...assuntos,...data.content];
                }
                return { content: assuntos.flat(Infinity), page: data.page };
            }
            return data;

        } catch (error) {
            return error;
        }
    }



}