const ValidadorEmail = (email) => {
    return email?.toString().includes("@") && email?.toString().includes(".");
}
const ValidadorSenha = (senha) => {
    return senha?.toString().length > 6;
}

export { ValidadorEmail, ValidadorSenha };
