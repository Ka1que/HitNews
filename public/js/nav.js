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