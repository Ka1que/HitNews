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

(function() {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
        apiKey: "AIzaSyBB7MMwkJFt9Rclu-gu26K7C-Rgnu3IWn4",
        authDomain: "hitnews-be38c.firebaseapp.com",
        databaseURL: "https://hitnews-be38c.firebaseio.com",
        projectId: "hitnews-be38c",
        storageBucket: "hitnews-be38c.appspot.com",
        messagingSenderId: "779470699260",
        appId: "1:779470699260:web:675f129b5fc57d91ee3579",
        measurementId: "G-CXR3JTJ2P2"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
})