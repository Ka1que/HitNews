var email_feedback = document.getElementById("Input_login");

function validarFeedback() {

    //TODO Validação
    if (email_feedback.checkValidity()) {
        //Enviar feedback
        let data = new Date();//pega a data
        let dataFormatada = data.getUTCDate() + "/" + (data.getUTCMonth() + 1) + "/" + data.getUTCFullYear();//formata a data
        console.log(dataFormatada);

        /**
         * Objeto que vai ser mandado para o banco
         */
        var feedback = {
            email: email_feedback.value,
            mensagem: document.getElementById("Text_opniao").value,
            data: dataFormatada
        }

        /**
         * manda o feedback para o banco e faz um promisse
         */
        firebase.database().ref().child("feedbacks").push(feedback).then(() => {
            
            document.getElementById("mensagem").innerHTML = "Agradecemos o Feedback!";//avisa para o usuário que o feedback foi enviado
        }).catch((erro) => {
            document.getElementById("mensagem").innerHTML = "Erro ao enviar feedback!";//avisa para o usuário que ocorreu um erro ao enviar o feedback
            console.log(erro);//mostra o erro no console
        })
    }


}