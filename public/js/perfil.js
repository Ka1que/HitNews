/**
 * Carrega perfil na tela
 * @param {Object} perfil Informaçoes do peril
 */
function carregar_perfil(perfil) {
    //coloca banner do usuario na página
    let imagem_banner_perfil = document.getElementById("banner_usu");
    imagem_banner_perfil.src = perfil.img_banner;

    //coloca imagem do usuário na página
    let imagem_usuario = document.getElementById("img_usu");
    imagem_usuario.src = perfil.img_perfil;

    //coloca nome e sobrenome do usuário na página
    let nome_usuario = document.getElementById("nome_usu");
    nome_usuario.innerHTML = perfil.nome + " " + perfil.sobrenome;


}

/**
 * pega Id do usuário da url
 */
function getUsuId() {
    let url = window.location.href;
    let id = url.substring(url.indexOf("?") + 1);
    return id;
}

/**
 * ativa quando os elementos DOM podem ser usados
 */
document.addEventListener("DOMContentLoaded", function() {
    //console.log(getUsuId());

    /**
     * Pega os dados do usuario e carrega o perfil
     */
    firebase.database().ref("Usuarios").child(getUsuId()).once("value").then((result) => {

        carregar_perfil(result.val()); //ativa a função para colocar o perfil na tela

    }).catch((err) => {
        console.log(err);
    });;


})