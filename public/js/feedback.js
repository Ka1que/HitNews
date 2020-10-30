

    var email_feedback = document.getElementById("Input_login"); 

function validarFeedback()
{
    
    //TODO Validação
    if(email_feedback.checkValidity())
    {
        //Enviar feedback
        let data = new Date();
        let dataFormatada = data.getUTCDate() + "/" + (data.getUTCMonth() +1) + "/" + data.getUTCFullYear();
        console.log(dataFormatada);
    
        var feedback = {
            email: email_feedback.value,
            mensagem: document.getElementById("Text_opniao").value,
            data: dataFormatada
        }
        
        firebase.database().ref().child("feedbacks").push(feedback).then(() =>{
            
            document.getElementById("mensagem").innerHTML = "Agradecemos o Feedback!";
        }).catch((erro) =>{
            document.getElementById("mensagem").innerHTML = "Erro ao enviar feedback!";
            console.log(erro);
        })
    }

    
}
