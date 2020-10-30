
/**
 * Carrega perfil na tela
 * @param {Object} perfil Informaçoes do peril
 */
function carregar_perfil(perfil)
{
    let imagem_banner_perfil = document.getElementById("banner_usu");
    imagem_banner_perfil.src = perfil.banner;

    let imagem_usuario = document.getElementById("img_usu");
    imagem_usuario.src = perfil.fotoPerfil;

    let nome_usuario = document.getElementById("nome_usu");
    nome_usuario.innerHTML = perfil.nome +" "+ perfil.sobrenome;


}

function getUsuId()
{
    let url = window.location.href;
    let id = url.substring(url.indexOf("?")+1);
    return id;

}

document.addEventListener("DOMContentLoaded", function() {
   console.log(getUsuId());
   firebase.database().ref("Usuarios").child(getUsuId()).once("value").then((result) => {
       
    carregar_perfil(result.val());

   }).catch((err) => {
       
   });;
    

})