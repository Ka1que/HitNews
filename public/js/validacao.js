const date = new Date();

function mensagem(mensagem) {
    document.getElementById("mensagem").innerHTML = "!!! " + mensagem;
}

function validacaoCadastro() {
    var nome = document.getElementById("Input_nome").value;
    var email = document.getElementById("Input_login").value;
    var dia = document.getElementById("Input_dia").value;
    var mes = document.getElementById("Input_mes").value;
    var ano = document.getElementById("Input_ano").value;
    var senha = document.getElementById("Input_senha").value;
    var senha2 = document.getElementById("Input_senha_repeat").value;
    var sobrenome = document.getElementById("Input_sobrenome").value;

    console.log(`${nome} ${email} ${dia} ${mes} ${ano} ${senha} ${senha2} ${sobrenome}`)

    if (email == "") {
        mensagem("nome não pode estar vazio");
        return;
    }
    if (email.indexOf(" ") >= 0) {
        mensagem("nao use espaços no email ", nome.indexOf(" "));
        console.warn("espaco")
        return
    }

    if (nome == "") {
        mensagem("nome não pode estar vazio");
        return;
    }
    if (nome.indexOf(" ") >= 0) {
        mensagem("nao use espaços no nome ", nome.indexOf(" "));
        return;
    }
    if (sobrenome == "") {
        mensagem("nome não pode estar vazio");
        return;
    }
    if (email.indexOf(" ") >= 0) {
        mensagem("nao use espaços no sobrenome");
        return;
    }
    if (dia < 0 || dia > 31 || mes < 0 || mes > 31 || ano < 1870) {
        mensagem("por favor insira uma data válida");
        return;
    }
    if (date.getFullYear() - ano <= 18) {
        console.log("sim1");
        if (mes >= date.getMonth()) {
            console.log("sim2");
            if (dia > date.getDate()) {
                console.log("sim");
                mensagem("apenas maiores de idade");
                return;
            }
        }
    }
    if (dia == "") {

        mensagem("Por favor preencha a data");
        return
    }
    if (senha == "") {
        mensagem("senha não pode estar vazio");
        return;
    }
    if (senha2 == "") {
        mensagem("senha não pode estar vazio");
        return;
    }

    if (senha2 != senha) {
        mensagem("as duas senhas precisam ser iguais");
        return;
    }

    console.log("cadastro Okay")

}

document.addEventListener("DOMContentLoaded", function() {
    console.log(date);
});