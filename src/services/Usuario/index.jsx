import axios from "axios";

export default class UserService {
    constructor() {
        const BASE_URL = import.meta.env.VITE_LOGIN_API;
        this.axios = axios.create({
            baseURL: BASE_URL,
            headers: {
                "Content-Type": "application/json",
            },
        })
    }

    async login(dados) {
        const { data } = await this.axios.post('/login', dados);

        if (data) {
            localStorage.setItem('Authorization', data.tokenJWT);
            let dadosUsuario = await this.pegaDadosUsuario();
            return dadosUsuario;
        }

        return;
    }

    async pegaDadosUsuario() {
        const { data } = await this.axios.get('/usuario', this.getHeaderWithTokenFromLocalStorage());

        if (data) {
            localStorage.setItem('nome', JSON.stringify(data.nome));
            localStorage.setItem('login', JSON.stringify(data.login));
            localStorage.setItem('id', JSON.stringify(data.id));
            localStorage.setItem('horarioLogin', JSON.stringify(new Date()));
            
            const {nome, login, id} = data;
            
            let dadosUsuario = {nome, login, id}

            return {...dadosUsuario, horarioLogin: new Date() };
        }
    }

    async usuarioAutenticado() {
        const { status } = await this.axios.get("/verify-token", this.getHeaderWithTokenFromLocalStorage());
        return status === 200;
    }

    verificaHaQuantoTempoFoiFeitoOLogin() {
        const horarioLogin = new Date(JSON.parse(localStorage.getItem('horarioLogin')));
        const tempoDecorrido = (new Date() - horarioLogin) / 1000;
        return tempoDecorrido <= (3600 * 3); // 1h = 3600s | OBS: MODIFICAR CASO SEJA AUMENTADO O TEMPO DE VALIDADE TO JWT
    }

    logout() {
        localStorage.removeItem('Authorization');
        localStorage.removeItem('nome');
        localStorage.removeItem('login');
        localStorage.removeItem('id');
        localStorage.removeItem('horarioLogin');
    }

    async cadastrar (dados) {
        try {
            const response = await this.axios.post('/usuario/addUser', dados);
            return response;
        } catch (error) {
            return error.response;
        }
    }

    getHeaderWithTokenFromLocalStorage() {
        return {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
            }
        }

    }
}