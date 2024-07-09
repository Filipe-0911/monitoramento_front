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
            await this.pegaDadosUsuario();
            return true;
        }

        return;
    }

    async pegaDadosUsuario() {
        const { data } = await this.axios.get('/usuario', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
            }
        });

        if (data) {
            localStorage.setItem('nome', JSON.stringify(data.nome));
            localStorage.setItem('login', JSON.stringify(data.login));
            localStorage.setItem('id', JSON.stringify(data.id));
        }
    }
}