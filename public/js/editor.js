let ref = firebase.database().ref();
var imgNoticiaId = firebase.database().ref().push().key;

//faz upload da img que o usuario escolheu e fornece uma url para usar a imagem
function getUrlImagemNoticia() {
    let url_img;
    var img_noticia = document.getElementById("Input_imagem").files[0];
    if (imgNoticiaId) {
        firebase.storage().ref("img_noticias/" + imgNoticiaId).put(img_noticia).then(function(snapshot) {
            console.log('Uploaded ', snapshot);
            firebase.storage().ref("img_noticias/" + imgNoticiaId).getDownloadURL().then(url => {
                console.log("link pra download: ", url);
                url_img = url;
            })
        });
        return url_img + "";
    } else {
        return "";
    }
}
// js do editor de texto
var CDEditor = function(textarea, modo) {
    this.textarea = textarea;

    var textareaSource = null;
    var container = null;
    var toolbar = [];
    var iframe = null;

    //define algumas opções que os usuarios podem usar como as fontes possiveis
    var fonts = ['Arial', 'Calibri', 'Comic Sans MS', 'Impact', 'Trebuchet MS', 'Times New Roman'];
    var sizes = [1, 2, 3, 4, 5, 6, 7];
    var self = this;

    //construtor do editor
    var init = function() {
        textareaSource = document.querySelector(self.textarea);
        textareaSource.style.display = 'none'; // retira o textarea pois vai ser subistituido por outro laout mais é conservado o conteudo do text area
        container = textareaSource.parentElement;
        initToolbar(container, toolbar);
        initIframe(container, textareaSource);
    };

    this.save = function() { // função que pega todo o conteudo q foi editado e chama a função salvarNoticia passando como parametro o conteudo editado 
        textareaSource.value = CDEditorIframe.document.body.innerHTML;
        var conteudo = CDEditorIframe.document.body.innerHTML;
        if (modo == "editar") {
            updateNoticia(conteudo);
        } else {
            salvarNoticia(conteudo);
        }
    };

    var Component = function(commandName, element, event) { //define os comandos da toolbar
        this.commandName = commandName;
        this.element = document.createElement('li');
        this.element.appendChild(element);
        this.recoverValue = function() {
            return null;
        };

        var selfComponent = this;
        this.element.addEventListener(event, function() {
            CDEditorIframe.document.execCommand(commandName, false, selfComponent.recoverValue());
        });

    };

    var ComponentButton = function(commandName, icon) { //carrega o botão na toolbar
        var button = document.createElement('button');
        var buttonIcon = document.createElement('i');
        buttonIcon.classList.add('fa', 'fa-' + icon);
        button.appendChild(buttonIcon);
        Component.call(this, commandName, button, 'click');
    };

    var ComponentSelect = function(commandName, values) { //mesma coisa que o componentButton e Component só q para os que tem caixa de opções
        var select = document.createElement('select');
        values.forEach(function(value) {
            var option = document.createElement('option');
            option.value = value;
            option.appendChild(document.createTextNode(value));
            select.appendChild(option);
        });

        Component.call(this, commandName, select, 'change');

        var selfComponentSelect = this;
        this.recoverValue = function() {
            return selfComponentSelect.element.firstChild.value;
        };
    };

    var Space = function() { // cria uma barra para dividir as funções da toolbar da edição da noticia ex: opções|home|exemplo|sair 
        this.element = document.createElement('li');
        this.element.classList.add('space');
        this.element.innerHTML = '&nbsp;';
    };

    var selectedNode = function() {
        return CDEditorIframe.getSelection().anchorNode.parentNode;
    };

    var initToolbar = function(container, toolbar) {
        // Marca texto
        var highlighter = new ComponentButton('backColor', 'highlighter');
        highlighter.recoverValue = function() {
            return selectedNode().style.backgroundColor === 'yellow' ? 'white' : 'yellow';
        };

        /* NOTA: foi removido pois usuarios poderiam adicionar cores muito ruins para noticias ent resolvemos deixar a opção do marca texto no caso de algo importante */
        //Cor da Fonte
        //var fontColor = new ComponentSelect('forecolor', colors);
        /*Array.from(fontColor.element.firstChild.options).forEach(function(option) {
            option.style.color = option.value;
        });
        fontColor.element.firstChild.style.color = Array.from(fontColor.element.firstChild.options)[0].value;
        fontColor.recoverValue = function() {
            fontColor.element.firstChild.style.color = fontColor.element.firstChild.value;
            return fontColor.element.firstChild.value;
        };*/

        // botão do link
        var link = new ComponentButton('createLink', 'link');
        link.recoverValue = function() {
            return prompt('Entre com o endereço do link:');
        };
        // define os componentes da toolbar
        toolbar.push(
            new ComponentSelect('fontname', fonts),
            new ComponentSelect('fontsize', sizes),
            new Space(),
            new ComponentButton('bold', 'bold'),
            new ComponentButton('italic', 'italic'),
            new ComponentButton('underline', 'underline'),
            new ComponentButton('strikethrough', 'strikethrough'),
            new Space(),
            //fontColor,
            //new Space(),
            highlighter,
            new Space(),
            new ComponentButton('justifyleft', 'align-left'),
            new ComponentButton('justifycenter', 'align-center'),
            new ComponentButton('justifyright', 'align-right'),
            new ComponentButton('justifyfull', 'align-justify'),
            new Space(),
            link,
            new ComponentButton('unlink', 'unlink'),
            new Space(),
            new ComponentButton('insertOrderedList', 'list-ol'),
            new ComponentButton('insertUnorderedList', 'list-ul')
        );

        renderToolbar(container, toolbar);
    };
    //  poe a toolbar na tela 
    var renderToolbar = function(container, toolbar) {
        var list = document.createElement('ul');
        list.classList.add('cd-toolbar');

        toolbar.forEach(function(component) {
            list.appendChild(component.element);
        });

        container.appendChild(list);
    };

    var initIframe = function(container, textareaSource) { // coloca o editor na tela como um Iframe
        var iframe = document.createElement('iframe');
        iframe.setAttribute('src', 'about:blank');
        iframe.setAttribute('contenteditable', 'true');
        iframe.setAttribute('id', 'CDEditorIframe');
        iframe.setAttribute('name', 'CDEditorIframe');
        iframe.classList.add('cd-editor');

        container.appendChild(iframe);

        CDEditorIframe.document.body.innerHTML = textareaSource.value;
        CDEditorIframe.document.designMode = 'on';
        CDEditorIframe.document.body.style.margin = 0;
        CDEditorIframe.document.body.style.wordWrap = 'break-word';
    };

    init();
};

var infosAutor;
var usuOnline;

firebase.auth().onAuthStateChanged(function(user) {
    usuOnline = user.uid;
});
//função que manda a noticia para o BD
function salvarNoticia(conteudo_noticia) {
    // verifica algumas condições para noticia poder ir ao BD
    if (document.getElementById("Input_fonte").value != "" &&
        document.getElementById("Input_titulo").value != "" &&
        conteudo_noticia != "") {

        let url_img;
        var img_noticia = document.getElementById("Input_imagem").files[0];
        if (hasImg == true) { // verifica se a noticia tem uma imagem 
            firebase.storage().ref("img_noticias/" + imgNoticiaId).put(img_noticia).then(function(snapshot) { // manda a imagem que o usuario escolheu para o storage

                firebase.storage().ref("img_noticias/" + imgNoticiaId).getDownloadURL().then(url => { //pega a url de acesso 
                    url_img = url;
                    var noticia = { // define o objeto que vai ser enviado para o BD
                        "autor_uid": usuOnline,
                        "conteudo": conteudo_noticia,
                        "curtidas": 0,
                        "fonte": document.getElementById("Input_fonte").value,
                        "imagem": url,
                        "titulo": document.getElementById("Input_titulo").value,
                        "views": 0
                    }
                    firebase.database().ref("noticias").push(noticia).then(snapshot => { // manda a noticia para o BD
                        function getid() { return snapshot.key + "" };
                        var noticiaid = {
                            "status": true
                        }

                        firebase.database().ref("Usuarios/").child(usuOnline + "/noticias/" + snapshot.key).set(noticiaid).then((user) => { //dá para o autor o ID da noticia que ele escreveu (para facilitar na hora de mostrar as noticias dele)
                            window.location.href = "./noticia.html?" + String(getid());
                        });
                    });
                })
            });

        } else { // se o usuario não tiver uma imagem ele vai execuar este bloco de código(igual ao bloco anterior só que sem ter q mandar a img para o firebase storage)

            var noticia = {
                "autor_uid": usuOnline,
                "conteudo": conteudo_noticia,
                "curtidas": 0,
                "fonte": document.getElementById("Input_fonte").value,
                "imagem": "",
                "titulo": document.getElementById("Input_titulo").value,
                "views": 0
            }

            firebase.database().ref("noticias").push(noticia).then(snapshot => {
                function getid() { return snapshot.key + "" };
                var noticiaid = {
                    "status": true
                }

                firebase.database().ref("Usuarios/").child(usuOnline + "/noticias/" + snapshot.key).set(noticiaid).then((user) => {
                    alert("okay : " + getid());
                    window.location.href = "./noticia.html?" + String(getid());
                });
            });

        }

    } else { // aviso caso deixe algo desregulado na fonte ou no titulo da noticia
        alert("noticia precisa de uma fonte e de um titulo e tem que ter um conteudo na noticia")
    }
}

var hasImg = false;
// adiciona um listenner para quando o usuario subir uma imagem ele poder ver antes de ir para o storage
$(function() {
    $('#Input_imagem').change(function() {
        const file = $(this)[0].files[0];
        const fileReader = new FileReader();

        fileReader.onloadend = function() {
            $("#preview_img").attr("src", fileReader.result)
        }
        hasImg = true;
        fileReader.readAsDataURL(file);
    });
});
var editor
document.addEventListener("DOMContentLoaded", async function() {

    let url = window.location.href;
    let idDaNoticia = url.substring(url.indexOf("?") + 1);

    if (idDaNoticia.trim() != window.location.href || idDaNoticia.trim() != "") {
        await firebase.database().ref("noticias").child(idDaNoticia).once("value").then(snapshot => {
            document.getElementById("Input_titulo").value = "" + snapshot.val().titulo;
            document.getElementById("preview_img").src = "" + snapshot.val().imagem;
            document.getElementById("Input_fonte").value = "" + snapshot.val().fonte;
            document.getElementsByTagName("textarea")[0].innerHTML = snapshot.val().conteudo;
        });
    }

    editor = new CDEditor('#editor', "editar");
})


/*
function showImage(input) {
    if (input.files) { //verifica se o arquivo não está nulo
        var reader = new FileReader(); //instancia um objeto FileReader que permite aplicações web ler o conteúdo dos arquivos (ou buffers de dados puros)

        reader.onload = function(e) { //Este evento é chamado cada vez que a operação de leitura é completada com sucesso.
            document.getElementById('Input_imagem').src = e.target.result; //aqui seto a imagem no src da div a cima
        }

        reader.readAsDataURL(input.files[0]); //Inicia a leitura do conteúdo que caira após o peração completar na função a cima
    }
    // document.getElementById("preview_img").style.background = document.getElementById("Input_imagem").value;
};*/

var noticia;

function setNoticia(obj) {
    noticia = obj;
}

async function updateNoticia(conteudo_noticia) {
    let url = window.location.href;
    let idDaNoticia = url.substring(url.indexOf("?") + 1);
    // verifica algumas condições para noticia poder ir ao BD
    if (document.getElementById("Input_fonte").value != "" &&
        document.getElementById("Input_titulo").value != "" &&
        conteudo_noticia != "") {


        let url_img;
        var img_noticia = document.getElementById("Input_imagem").files[0];
        if (hasImg == true) { // verifica se a noticia tem uma imagem 
            await firebase.storage().ref("img_noticias/" + imgNoticiaId).put(img_noticia).then(async function(snapshot) { // manda a imagem que o usuario escolheu para o storage
                await firebase.storage().ref("img_noticias/" + imgNoticiaId).getDownloadURL().then(snapshot => { //pega a url de acesso 
                    // define o objeto que vai ser enviado para o BD
                    setNoticia({
                        "conteudo": conteudo_noticia,
                        "fonte": document.getElementById("Input_fonte").value,
                        "imagem": snapshot,
                        "titulo": document.getElementById("Input_titulo").value
                    });
                });
            }).catch(err => { console.log(err) });
        } else { // se o usuario não tiver uma imagem ele vai execuar este bloco de código(igual ao bloco anterior só que sem ter q mandar a img para o firebase storage)
            setNoticia({
                "conteudo": conteudo_noticia,
                "fonte": document.getElementById("Input_fonte").value,
                "titulo": document.getElementById("Input_titulo").value
            });
        }
        firebase.database().ref("noticias").child(idDaNoticia).update(noticia).then(snapshot => {
            window.location.href = "./noticia.html?" + idDaNoticia;
        }); // manda a noticia para o BD

    } else { // aviso caso deixe algo desregulado na fonte ou no titulo da noticia
        alert("noticia precisa de uma fonte e de um titulo e tem que ter um conteudo na noticia")
    }
}