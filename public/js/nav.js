/**
 *  Declaração de variaveis globais 
 */

var uid = null;
var infos_usu;
var isPaginaPerfilIgualLogado = false;
var uidLogaddo;

//metodos get e set para informações dos usuarios
function getInfosUsu() {
    return infos_usu;
}

function setInfosUsu(usu) {
    infos_usu = usu;
}

/**
 * ABRIR MENU LATERAL
 */
function openNav() {
    document.getElementById("menu_sidenav_container").style.display = "none";
    document.getElementById("mySidenav").style.width = "30%";
}

function closeNav() {
    document.getElementById("menu_sidenav_container").style.display = "block";
    document.getElementById("mySidenav").style.width = "0";
}
//função de igual o voltar do navegador
function goBack() {
    window.history.back()
}

(function() {
    // configurações de acesso ao fire base
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
        apiKey: "AIzaSyBB7MMwkJFt9Rclu-gu26K7C-Rgnu3IWn4",
        authDomain: "hitnews-be38c.firebaseapp.com",
        databaseURL: "https://hitnews-be38c.firebaseio.com",
        projectId: "hitnews-be38c",
        storageBucket: "hitnews-be38c.appspot.com",
        messagingSenderId: "779470699260",
        appId: "1:779470699260:web:675f129b5fc57d91ee3579",
        measurementId: "G-CXR3JTJ2P2"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
});

//verifica se tem um usuario logado
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById("container_usuario_link").style.display = "flex";
        document.getElementById("opcoes_usu").style.display = "block";
        setInfosUsu(user);
        habilitarLinks(user.uid);
        console.warn(" hellowow " + user.uid);
        uidLogaddo = user.uid;
    } else {
        document.getElementById("Login_link").style.display = "flex";
        console.log("anithing is here");

    }
});
//função para abrir o menu lateral para usuarios que já estiverem logados
document.getElementById("container_usuario_link").addEventListener("click", () => {
    openNav();
});
//desconectar 
function deslogar() {
    firebase.auth().signOut().then(() => {
        console.log("deslogado");
    });
    window.location.href = "./index.html?";
}
// habilita algumas opções no menu lateral para usuarios logados
function habilitarLinks(uid) {
    document.getElementById("link_perfil").addEventListener("click", () => {
        window.location.href = "./perfil.html?" + String(uid)
    });

    document.getElementById("link_escreverNoticia").addEventListener("click", () => {
        window.location.href = "./escreverNoticia.html?"
    });
}

// function temaEscuro() {
//     var tema = localStorage.getItem("tema");

//     if (tema) {
//         document.getElementsByTagName("body")[0].style.backgroundColor = "#000";
//         localStorage.removeItem("tema");
//     } else {
//         document.getElementsByTagName("body")[0].style.backgroundColor = "#fff";
//         localStorage.removeItem("tema");
//         localStorage.setItem("tema", "0");
//     }
// }
document.getElementsByTagName("body")[0].addEventListener("onload", () => {
    var tema = localStorage.getItem("tema");
    if (!tema) {
        document.getElementsByTagName("body")[0].style.backgroundColor = "#fff";
        localStorage.removeItem("tema");
        localStorage.setItem("tema", "0");
    }
});


//Sistema de pesquisa de notícias
function pesquisar(pesquisa) {

    var pesquisar = pesquisa.replaceAll(" ", "+");

    window.location.href = "./pesquisa.html?resultado=" + pesquisar;
    /*
    console.log("Pesquisa: ", pesquisa);
    */
}