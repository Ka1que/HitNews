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

    var mensagem_feedback = document.getElementById("Text_opniao");
    var email_feedback = document.getElementById("Input_login"); 

function validarFeedback()
{
    
    //TODO Validação

    //TODO Enviar feedback

    let data = new Date();
    let dataFormatada = data.getUTCDate() + "/" + (data.getUTCMonth() +1) + "/" + data.getUTCFullYear();
    console.log(dataFormatada);

    var feedback = {
        email: email_feedback.value,
        mensagem: mensagem_feedback.value,
        data: dataFormatada
    }
    
    firebase.database().ref().child("feedback").push(feedback).then(() =>{
        document.getElementById("mensagem").innerHTML = "Agradecemos o Feedback!";
    }).catch((erro) =>{
        document.getElementById("mensagem").innerHTML = "Erro ao enviar feedback!";
        console.log(erro);
    })
    

}
