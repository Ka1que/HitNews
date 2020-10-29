/*
function getIp(callback) {
    function response(s) {
        callback(window.userip);

        s.onload = s.onerror = null;
        document.body.removeChild(s);
    }

    function trigger() {
        window.userip = false;

        var s = document.createElement("script");
        s.async = true;
        s.onload = function() {
            response(s);
        };
        s.onerror = function() {
            response(s);
        };

        s.src = "https://l2.io/ip.js?var=userip";
        document.body.appendChild(s);
    }

    if (/^(interactive|complete)$/i.test(document.readyState)) {
        trigger();
    } else {
        document.addEventListener('DOMContentLoaded', trigger);
    }
}

getIp(function(ip) {
    console.log(ip);
});


  UMA TENTATIVA Q DEU ERRADO MAIS TEM INFORMAÇÕES IMPORTANTES
document.getElementById('Input_login').addEventListener("focus", function() { tittleUp(this, "Text_gmail"); });
document.getElementById('Input_senha').addEventListener("focus", function() { tittleUp(this, "Text_gmail"); });

document.getElementById('Input_login').addEventListener("blur", function() { tittleDown(this, "Text_gmail"); });

function tittleUp(element, titulo) {
    const h3 = document.getElementById(titulo)

    h3.style.top = "5px";
}*/

/**
 * OBRIR MENU LATERAL
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