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

//#region NOTICIA (Crianção de uma método para colocar as noticias na página)

var container_conteudo = document.getElementsByClassName("Container_conteudo")[0];

/**
 * Coloca uma noticia dentro do container
 * @param {Object} infoNot Objeto da noticia em formato de Json
 * @param {Object} idNoticia chave da noticia
 * @param {Object} infoAutor Objeto que carrega informações do autor
 */
function carregarNoticias(infoNot, infoAutor,idNoticia) {
    let container_noticia = document.createElement("div"); //cria div que vai conter a noticia
    container_noticia.classList.add("Container_noticia"); //diz que a classe da div é Container_noticia para o css

    let linkNot = document.createElement("a"); //cria tag a para depois adicionar o link da página da noticia
    linkNot.href = "./noticia.html?" + idNoticia; //adiciona o link da página da notica para a tag "a" criada

    let titulo_noticia = document.createElement("h1"); //cria a tag do titulo da notícia
    titulo_noticia.classList.add("Noticia_titulo"); //diz que a classe do h1 é Noticia_titulo
    titulo_noticia.innerHTML = infoNot.titulo; //coloca o titulo da noticia dentro do h1
    linkNot.appendChild(titulo_noticia); //Deixa o h1 da noticia como filho da tag "a"

    let imagem_noticia = document.createElement("img"); //cria a tag de imagem para a noticia
    imagem_noticia.src = infoNot.imagem; //coloca a imagem da noticia na tag
    imagem_noticia.classList.add("Noticia_img"); //coloca a imagem da noticia dentro da tag
    linkNot.appendChild(imagem_noticia); //deixa a img como filha da tag "a"

    let rodape_noticia = document.createElement("div") //cria div que vai ser o rodapé da noticia
    rodape_noticia.classList.add("Container_rodape"); //diz que a classe da div é Container_rodape

    let linkAutor = document.createElement("a");
    linkAutor.classList.add("Container_autor");
    linkAutor.href = "perfil.html?" + infoNot.autor_uid;

    let imagem_autor = document.createElement("img");
    imagem_autor.classList.add("Autor_img");
    imagem_autor.src = infoAutor.img_perfil;
    linkAutor.appendChild(imagem_autor);

    let nome_autor = document.createElement("h3");
    nome_autor.classList.add("Autor_nome");
    nome_autor.innerHTML = infoAutor.nome;
    linkAutor.appendChild(nome_autor);


    let container_views = document.createElement("div");
    container_views.classList.add("Container_view");

    /**
     * criando o elemento svg das views, é o mesmo processo de antes, a única diferença é que os atributos são passadps por um SetAttribute
     */
    let svg_view = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg_view.classList.add("Svg_view");
    svg_view.setAttribute("width", "44");
    svg_view.setAttribute("height", "26");
    svg_view.setAttribute("viewBox", "0 0 44 26");
    svg_view.setAttribute("fill", "none");

    //#region PATHS (criando paths para o svg_view)

    //Kaique, por que você me fez escrever todos esses números? -Enrique
    // vc que vacilou e não resummiu em 1 arquivo e importou como uma biblioteca de svg 
    let views_path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    views_path1.setAttribute("d", "M11.4763 17.7648C11.4763 17.7648 16.0398 26.7575 26.4662 23.1436C26.9805 22.9653 27.4869 22.7509 27.9437 22.4549C29.1808 21.6533 31.8166 19.5127 34.0199 14.804M9.78052 2.60551L12.0748 8.17182");
    views_path1.setAttribute("stroke", "black");
    views_path1.setAttribute("stroke-width", "4");
    svg_view.appendChild(views_path1);

    let views_path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    views_path2.setAttribute("d", "M21.7506 0V5.56632");
    views_path2.setAttribute("stroke", "black");
    views_path2.setAttribute("stroke-width", "4");
    svg_view.appendChild(views_path2);

    let views_path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    views_path3.setAttribute("d", "M32.9227 3.19767L31.4264 7.69809");
    views_path3.setAttribute("stroke", "black");
    views_path3.setAttribute("stroke-width", "4");
    svg_view.appendChild(views_path3);

    let views_path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    views_path4.setAttribute("d", "M1.99997 21.0808C22.8478 -2.13187 42 21.0808 42 21.0808");
    views_path4.setAttribute("stroke", "black");
    views_path4.setAttribute("stroke-width", "4");
    svg_view.appendChild(views_path4);


    //#endregion PATHS
    container_views.appendChild(svg_view);

    /**
     * colocando numero de views no container
     */
    let contador_views = document.createElement("h3");
    contador_views.classList.add("Num_view");
    contador_views.innerHTML = infoNot.views;
    container_views.appendChild(contador_views);

    let container_likes = document.createElement("div"); //container para os likes
    container_likes.classList.add("Container_like");

    /**
     * criando o elemento svg dos likes, é o mesmo processo de antes, a única diferença é que os atributos são passadps por um SetAttribute
     */
    let svg_like = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg_like.classList.add("Svg_like");
    svg_like.setAttribute("width", "29");
    svg_like.setAttribute("height", "30");
    svg_like.setAttribute("viewBox", "0 0 29 30");
    svg_like.setAttribute("fill", "none");

    let path_like = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path_like.setAttribute("d", "M5.26171 12.4511C2.68928 10.315 2.9884 7.62957 2.9884 7.62957C4.24475 2.07572 8.73148 2.07572 8.73148 2.07572C11.7227 1.34334 15.2523 6.16482 15.2523 6.16482C15.2523 6.16482 17.2265 1.52644 21.7133 2.07572C26.2 2.625 26.9778 5.9207 26.9778 7.62957C26.9778 9.33845 26.9179 10.315 25.4223 12.4511C23.9267 14.5871 15.2523 26 15.2523 26L8.73148 17.5166");
    path_like.setAttribute("stroke", "black");
    path_like.setAttribute("stroke-width", "4");
    svg_like.appendChild(path_like);

    container_likes.appendChild(svg_like);

    /**
     * colocando numero de curtidas no container
     */
    let contador_likes = document.createElement("h3");
    contador_likes.classList.add("Num_like");
    contador_likes.innerHTML = infoNot.curtidas;
    container_likes.appendChild(contador_likes);

    container_noticia.appendChild(linkNot); //coloca a tag "a" como filho da noticia
    rodape_noticia.appendChild(linkAutor);
    rodape_noticia.appendChild(container_views);
    rodape_noticia.appendChild(container_likes);
    container_noticia.appendChild(rodape_noticia);
    container_conteudo.appendChild(container_noticia); //coloca a noticia dentro do container de noticias


}
//#endregion NOTICIA

/**
 * ativa quando os elementos DOM podem ser usados
 */
document.addEventListener("DOMContentLoaded", function() {
    //console.log(getUsuId());
    /**
     * Pega os dados do usuario e carrega o perfil
     */
    firebase.database().ref("Usuarios").child(getUsuId()).once("value").then((result) => {

        carregar_perfil(result.val());
         //ativa a função para colocar o perfil na tela
        /*var noticia = {
            "autor" : {
              "uid" : "1",
              "imagem" : "https://viciados.net/wp-content/uploads/2020/02/Naruto-Cl%C3%A1ssico-e-Naruto-Shippuden-fillers.jpg",
              "nome" : "Naruto"
            },
            "conteudo" : "olha só, uma notícia de teste, quem diria que a gente iria testar uma noticia pra quando as noticias de verdade forem adicionadas",
            "curtidas" : 0,
            "fonte" : "sei lá, minha cabeça?",
            "imagem" : "https://portal.ifrn.edu.br/campus/mossoro/biblioteca/imagens/templates/image",
            "titulo" : "teste",
            "views" : 0,
            "data": "30/10/2020"
          };*/
          firebase.database().ref("Usuarios").child(result.key).child("noticias").once("value").then(snapshot =>{
            snapshot.forEach( valor =>{
                carregarNoticias(valor,result,valor.key);
            });
            

          });
        
        
    }).catch((err) => {
        console.log("erro: ", err);
    });


})
