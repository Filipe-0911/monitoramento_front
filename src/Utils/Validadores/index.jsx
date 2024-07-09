const ValidadorEmail = (email) => {
    return email?.toString().includes("@") && email?.toString().includes(".");
}

const ValidadorSenhaCadastro = (senha1, senha2) => {
    return ValidadorSenha(senha1) && senha1?.toString() === senha2?.toString();
}
const ValidadorSenha = (senha) => {
    return senha?.toString().length > 6;
}

export { ValidadorEmail, ValidadorSenha, ValidadorSenhaCadastro };
