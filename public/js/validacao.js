const date = new Date();

function mensagem(mensagem) {
    document.getElementById("mensagem").innerHTML = "!!! " + mensagem;
}

function limparMensagem() {
    document.getElementById("mensagem").innerHTML = "";
}
//validacao é uma variavel pra verificar se está tudo okay na minha validação 
//(p.s. existe 2 validações a minha(Kaique) e a do firebase Autentication)
let validacao = true;

function validacaoCadastro() { //valida o cadastro do usuario NOTA: também tem a validação 
    /**
     * faz variáveis com os valores dos campos
     */
    validacao = true;
    var nome = document.getElementById("Input_nome").value;
    var email = document.getElementById("Input_login").value;
    var dia = document.getElementById("Input_dia").value;
    var mes = document.getElementById("Input_mes").value;
    var ano = document.getElementById("Input_ano").value;
    var senha = document.getElementById("Input_senha").value;
    var senha2 = document.getElementById("Input_senha_repeat").value;
    var sobrenome = document.getElementById("Input_sobrenome").value;

    limparMensagem();//limpa a mensagem que vai ser mostrada para o usuário caso tenha algo escrito
    /**
     * Verifica se o Email não está vazio
     */
    if (email == "") {
        mensagem("Email não pode estar vazio");
        validacao = false;
        return;
    }
    /**
     * Verifica se não há "epaços" no campo de email
     */
    if (email.indexOf(" ") >= 0) {
        mensagem("Nao use espaços no email ");
        validacao = false;
        return;
    }
    /**
     * Verifica se foi digitado o arroba no email
     */
    if (email.indexOf("@") <= 0) {
        mensagem("email invalido");
        validacao = false;
        return;
    }
    /**
     * Verifica se o nome está vazio
     */
    if (nome == "") {
        mensagem("Nome não pode estar vazio");
        validacao = false;
        return;
    }
    /**
     * Verifica se o nome não tem espaços no nome(não sobrenome)
     */
    if (nome.indexOf(" ") >= 0) {
        mensagem("Nao use espaços no nome ");
        validacao = false;
        return;
    }
    /**
     * Verifica se o campo de sobrenome não está vazio
     */
    if (sobrenome == "") {
        mensagem("Nome não pode estar vazio");
        validacao = false;
        return;
    }
    /**
     * Verifica se não há espaços no sobrenome
    if (sobrenome.indexOf(" ") >= 0) {
        mensagem("Não use espaços no sobrenome");
        validacao = false;
        return;
    }
    */

    /**
     * Verifica se a data foi inserida corretamente
     */
    if (dia < 0 || dia > 31 || mes < 0 || mes > 31 || ano < 1900) {
        mensagem("Por favor insira uma data válida");
        validacao = false;
        return;
    }
    /**
     * verifica se a pessoa tem mais de 13 anos
     */
    if (date.getFullYear() - ano <= 13) {
        //console.log("sim1");
        if (mes >= date.getMonth()) {
            //console.log("sim2");
            if (dia > date.getDate()) {
                //console.log("sim");
                mensagem("Apenas maiores de idade");
                validacao = false;
                return;
            }
        }
    }
    /**
     * verifica se o dia foi preenchido
     */
    if (dia == "") {

        mensagem("Por favor preencha a data");
        validacao = false;
        return;
    }
    /**
     * Verifica se a senha foi preenchida
     */
    if (senha == "") {
        mensagem("Senha não pode estar vazio");
        validacao = false;
        return;
    }
    /**
     * Verifica se a senha tenha mais de 6 caracteres
     */
    if (senha.lenght <= 6) {
        mensagem("Senha muito pequena pelo menos 6 caracteres");
        validacao = false;
        return;
    }
    /**
     * Verifica se a senha foi digitada de novo
     */
    if (senha2 == "") {
        mensagem("Senha não pode estar vazio");
        validacao = false;
        return;
    }
    /**
    * Verifica se a senha digitada de novo é igual a senha digitada anteriormente 
    */
    if (senha2 != senha) {
        mensagem("As duas senhas precisam ser iguais");
        validacao = false;
        return;
    }

    if (validacao == true) {
        cadastrar();
    }
}
var ref = firebase.database().ref("Usuarios");//Referencia ao nó de usuários no firebase
/*
document.addEventListener("DOMContentLoaded", function() {
    console.log(date);
});
*/

/**
 * Função usada para cadastrar o usuário, levando os dados para o banco
 */
function cadastrar() {
    var email = document.getElementById("Input_login").value;//Email digitado
    var senha = document.getElementById("Input_senha").value;//Senha digitada

    /**
     * Inicia o authentication par enviar os dados de email e senha
     */
    firebase.auth().createUserWithEmailAndPassword(email, senha).then(snapshot => {
        console.log("usuario", snapshot);

        var infos = {//objeto de informações que vai ser enviada para o banco
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
        //coloca as informações no nó de usuários do banco
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

/**
 * Função para logar o usuário pegando informações passadas nos campos de login
 */
function logar() {
    var email = document.getElementById("Input_login").value;//Email digitado
    var senha = document.getElementById("Input_senha").value;//Senha digitada

    //Passa o email e senha para o autenthication para logar
    firebase.auth().signInWithEmailAndPassword(email, senha).then(snapshot => {
        console.log("logado com usuario: ", snapshot.user.uid);
        localStorage.setItem("uid", (snapshot.user.uid + ""));
        window.history.back();
        window.location.href = "./perfil.html#?" + String(snapshot.user.uid);//Carrega o perfil do usuário
    }).catch(err => {
        console.log("deu um erro: ", err);
        document.getElementById("mensagem").innerHTML = "Erro no login, Verifique Email/Senha"
    });
}