const date = new Date();

function mensagem(mensagem) {
    document.getElementById("mensagem").innerHTML = "!!! " + mensagem;
}

function limparMensagem() {
    document.getElementById("mensagem").innerHTML = "";
}
//validacao é uma variavel pra verificar se está tudo okay na minha validação 
//(p.s. existe 2 validações a minha e a do firebase Autentication)
let validacao = true;
//
function validacaoCadastro() {
    validacao = true;
    var nome = document.getElementById("Input_nome").value;
    var email = document.getElementById("Input_login").value;
    var dia = document.getElementById("Input_dia").value;
    var mes = document.getElementById("Input_mes").value;
    var ano = document.getElementById("Input_ano").value;
    var senha = document.getElementById("Input_senha").value;
    var senha2 = document.getElementById("Input_senha_repeat").value;
    var sobrenome = document.getElementById("Input_sobrenome").value;

    console.log(`${nome} ${email} ${dia} ${mes} ${ano} ${senha} ${senha2} ${sobrenome}`)

    limparMensagem();
    if (email == "") {
        mensagem("Email não pode estar vazio");
        validacao = false;
        return;
    }
    if (email.indexOf(" ") >= 0) {
        mensagem("Nao use espaços no email ");
        validacao = false;
        return;
    }
    if (email.indexOf("@") <= 0) {
        mensagem("email invalido");
        validacao = false;
        return;
    }

    if (nome == "") {
        mensagem("Nome não pode estar vazio");
        validacao = false;
        return;
    }
    if (nome.indexOf(" ") >= 0) {
        mensagem("Nao use espaços no nome ");
        validacao = false;
        return;
    }
    if (sobrenome == "") {
        mensagem("Nome não pode estar vazio");
        validacao = false;
        return;
    }
    if (email.indexOf(" ") >= 0) {
        mensagem("Nao use espaços no sobrenome");
        validacao = false;
        return;
    }
    if (dia < 0 || dia > 31 || mes < 0 || mes > 31 || ano < 1900) {
        mensagem("Por favor insira uma data válida");
        validacao = false;
        return;
    }
    if (date.getFullYear() - ano <= 13) {
        console.log("sim1");
        if (mes >= date.getMonth()) {
            console.log("sim2");
            if (dia > date.getDate()) {
                console.log("sim");
                mensagem("Apenas maiores de idade");
                validacao = false;
                return;
            }
        }
    }
    if (dia == "") {

        mensagem("Por favor preencha a data");
        validacao = false;
        return;
    }
    if (senha == "") {
        mensagem("Senha não pode estar vazio");
        validacao = false;
        return;
    }
    if (senha.lenght <= 6) {
        mensagem("Senha muito pequena pelo menos 6 caracteres");
        validacao = false;
        return;
    }
    if (senha2 == "") {
        mensagem("Senha não pode estar vazio");
        validacao = false;
        return;
    }

    if (senha2 != senha) {
        mensagem("As duas senhas precisam ser iguais");
        validacao = false;
        return;
    }

    if (validacao == true) {
        cadastrar();
        alert("a");
    }
}
var ref = firebase.database().ref("Usuarios");

document.addEventListener("DOMContentLoaded", function() {
    console.log(date);
});

function cadastrar() {
    var email = document.getElementById("Input_login").value;
    var senha = document.getElementById("Input_senha").value;

    firebase.auth().createUserWithEmailAndPassword(email, senha).then(snapshot => {
        console.log("usuario", snapshot);

        var infos = {
            nome: document.getElementById("Input_nome").value,
            sobrenome: document.getElementById("Input_sobrenome").value,
            img_banner: "./bk_default.jpg",
            img_perfil: "./pf_default.jpg",
            data_nascimento: {
                dia: document.getElementById("Input_dia").value,
                mes: document.getElementById("Input_mes").value,
                ano: document.getElementById("Input_ano").value,
            }
        };

        ref.child(`${snapshot.user.uid}`).update(infos).then(() => {
            console.log("allright");
            sessionStorage.setItem("uid", "");

            window.location.href = "./perfil.html?" + String(snapshot.user.uid);
        });

    }).catch(error => {
        console.log("credenciais invalidas: " + error);
        let msg = String(error);
        mensagem("credenciais inválidas " + msg.substring(msg.indexOf(":") + 1));
    });
};

function logar() {
    var email = document.getElementById("Input_login").value;;
    var senha = document.getElementById("Input_senha").value;

    firebase.auth().signInWithEmailAndPassword(email, senha).then(snapshot => {
        console.log("logado com usuario: ", snapshot.user.uid);
        localStorage.setItem("uid", (snapshot.user.uid + ""));
        window.location.href = "./perfil.html?" + String(snapshot.user.uid);
    }).catch(err => {
        console.log("deu um erro: ", err)
    });
}