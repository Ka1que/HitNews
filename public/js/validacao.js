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
        mensagem("Email não pode estar vazio");
        return;
    }
    if (email.indexOf(" ") >= 0) {
        mensagem("Nao use espaços no email ", nome.indexOf(" "));
        console.warn("espaco")
        return
    }

    if (nome == "") {
        mensagem("Nome não pode estar vazio");
        return;
    }
    if (nome.indexOf(" ") >= 0) {
        mensagem("Nao use espaços no nome ", nome.indexOf(" "));
        return;
    }
    if (sobrenome == "") {
        mensagem("Nome não pode estar vazio");
        return;
    }
    if (email.indexOf(" ") >= 0) {
        mensagem("Nao use espaços no sobrenome");
        return;
    }
    if (dia < 0 || dia > 31 || mes < 0 || mes > 31 || ano < 1900) {
        mensagem("Por favor insira uma data válida");
        return;
    }
    if (date.getFullYear() - ano <= 13) {
        console.log("sim1");
        if (mes >= date.getMonth()) {
            console.log("sim2");
            if (dia > date.getDate()) {
                console.log("sim");
                mensagem("Apenas maiores de idade");
                return;
            }
        }
    }
    if (dia == "") {

        mensagem("Por favor preencha a data");
        return
    }
    if (senha == "") {
        mensagem("Senha não pode estar vazio");
        return;
    }
    if (senha2 == "") {
        mensagem("Senha não pode estar vazio");
        return;
    }

    if (senha2 != senha) {
        mensagem("As duas senhas precisam ser iguais");
        return;
    }

    cadastrar();

}
var ref = firebase.database().ref("Usuarios");

document.addEventListener("DOMContentLoaded", function() {
    console.log(date);
});

function cadastrar() {
    var email = document.getElementById("Input_login").value;;
    var senha = document.getElementById("Input_senha").value;

    firebase.auth().createUserWithEmailAndPassword(email, senha).then(user => {
        console.log("usuario", user);

        var infos = {
            Nome: document.getElementById("Input_nome").value,
            sobrenome: document.getElementById("Input_sobrenome").value,
            data_nascimento: {
                dia: document.getElementById("Input_dia").value,
                mes: document.getElementById("Input_mes").value,
                ano: document.getElementById("Input_ano").value,
            }
        };

        ref.child(`${user.user.uid}`).update(infos).then(() => { console.log("allright") });

    }).catch(error => {
        console.log("credenciais invalidas: " + error);
        mensagem("credenciais inválidas");
    });
};