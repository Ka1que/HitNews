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

var CDEditor = function(textarea) {
    this.textarea = textarea;

    var textareaSource = null;
    var container = null;
    var toolbar = [];
    var iframe = null;


    var fonts = ['Arial', 'Calibri', 'Comic Sans MS', 'Impact', 'Trebuchet MS', 'Times New Roman'];
    var sizes = [1, 2, 3, 4, 5, 6, 7];
    var self = this;

    var init = function() {
        textareaSource = document.querySelector(self.textarea);
        textareaSource.style.display = 'none';
        container = textareaSource.parentElement;
        initToolbar(container, toolbar);
        initIframe(container, textareaSource);
    };

    this.save = function() {
        textareaSource.value = CDEditorIframe.document.body.innerHTML;
        var conteudo = CDEditorIframe.document.body.innerHTML;


        salvarNoticia(conteudo);

    };

    var Component = function(commandName, element, event) {
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

    var ComponentButton = function(commandName, icon) {
        var button = document.createElement('button');
        var buttonIcon = document.createElement('i');
        buttonIcon.classList.add('fa', 'fa-' + icon);
        button.appendChild(buttonIcon);
        Component.call(this, commandName, button, 'click');
    };

    var ComponentSelect = function(commandName, values) {
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

    var Space = function() {
        this.element = document.createElement('li');
        this.element.classList.add('space');
        this.element.innerHTML = '&nbsp;';
    };

    var selectedNode = function() {
        return CDEditorIframe.getSelection().anchorNode.parentNode;
    };

    var initToolbar = function(container, toolbar) {
        //HIGNLIGHTER BUTTON
        var highlighter = new ComponentButton('backColor', 'highlighter');
        highlighter.recoverValue = function() {
            return selectedNode().style.backgroundColor === 'yellow' ? 'white' : 'yellow';
        };

        //FONTCOLOR MENU
        //var fontColor = new ComponentSelect('forecolor', colors);
        /*Array.from(fontColor.element.firstChild.options).forEach(function(option) {
            option.style.color = option.value;
        });
        fontColor.element.firstChild.style.color = Array.from(fontColor.element.firstChild.options)[0].value;
        fontColor.recoverValue = function() {
            fontColor.element.firstChild.style.color = fontColor.element.firstChild.value;
            return fontColor.element.firstChild.value;
        };*/

        // LINK BUTTON
        var link = new ComponentButton('createLink', 'link');
        link.recoverValue = function() {
            return prompt('Entre com o endereço do link:');
        };

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

    var renderToolbar = function(container, toolbar) {
        var list = document.createElement('ul');
        list.classList.add('cd-toolbar');

        toolbar.forEach(function(component) {
            list.appendChild(component.element);
        });

        container.appendChild(list);
    };

    var initIframe = function(container, textareaSource) {
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
    //console.log(user.uid);
    usuOnline = user.uid;
});

function salvarNoticia(conteudo_noticia) {

    if (document.getElementById("Input_fonte").value != "" &&
        document.getElementById("Input_titulo").value != "" &&
        conteudo_noticia != "") {

        let url_img;
        var img_noticia = document.getElementById("Input_imagem").files[0];
        if (imgNoticiaId) {
            firebase.storage().ref("img_noticias/" + imgNoticiaId).put(img_noticia).then(function(snapshot) {
                console.log('Uploaded ', snapshot);
                firebase.storage().ref("img_noticias/" + imgNoticiaId).getDownloadURL().then(url => {
                    console.log("link pra download: ", url);
                    url_img = url;
                    var noticia = {
                        "autor_uid": usuOnline,
                        "conteudo": conteudo_noticia,
                        "curtidas": 0,
                        "fonte": document.getElementById("Input_fonte").value,
                        "imagem": url,
                        "titulo": document.getElementById("Input_titulo").value,
                        "views": 0
                    }
                    firebase.database().ref("noticias").push(noticia).then(snapshot => {
                        var noticiaid = {
                            "status": true
                        }

                        firebase.database().ref("usuarios/" + snapshot.autor_uid + "/noticias/" + snapshot.key).set(noticiaid).then(() => {
                            console.log("okay");
                        });
                    });
                })
            });

        } else {

            var noticia = {
                "autor_uid": usuOnline,
                "conteudo": conteudo_noticia,
                "curtidas": 0,
                "fonte": document.getElementById("Input_fonte").value,
                "imagem": "",
                "titulo": document.getElementById("Input_titulo").value,
                "views": 0
            }

            //ref.push(conteudo).then((noticia) => { console.log("upado com sucesso ", noticia) });

            firebase.database().ref("noticias").push(noticia).then(snapshot => {
                function getid() { return snapshot.key + "" };
                var noticiaid = {
                    "status": true
                }

                firebase.database().ref("usuarios/").child(snapshot.autor_uid + "/noticias/" + snapshot.key).set(noticiaid).then((user) => {
                    console.log("okay : " + getid());
                    window.location.href = "./noticia.html?" + String(getid());
                });
            });

        }
        // firebase.database().ref("/Usuarios/" + usuOnline.uid + "/").on("value", snapshot => {
        //     console.log("not " + snapshot.val().nome);
        //     aut_nome = snapshot.val().nome;
        //     aut_img = snapshot.val().img_perfil;

        //     console.log("oq importas  " + aut_nome + " " + aut_img);
        // });

        //console.log("oq importa " + aut_nome + " " + aut_img);


    } else {
        alert("noticia precisa de uma fonte e de um titulo e tem que ter um conteudo na noticia")
    }
}


$(function() {
    $('#Input_imagem').change(function() {
        const file = $(this)[0].files[0];
        const fileReader = new FileReader();

        fileReader.onloadend = function() {
            $("#preview_img").attr("src", fileReader.result)
        }
        fileReader.readAsDataURL(file);
    });
});



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