//LOGIN) LOGAR COM O GOOGLE
var provider = new firebase.auth.GoogleAuthProvider();
var db = firebase.database();

window.onload=function(){

    //BOTAO DE LOGIN COM O GOOGLE
    var linklogin = document.querySelector('#loginbt');

    //FUNCAO LOGAR
    linklogin.addEventListener('click', function() {
        firebase.auth().signInWithRedirect(provider).then(function(user) {
            if (user) {
                usuario = user;
            } else {
                usuario = null;
            }
        }).catch(function(erro) {
            alert("Falha ao realizar o login");
        });
    
    });

}

//VERIFICAR SE JA ESTA LOGADO
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        usuario = user; 
        window.location.href="feed.html"
    } else {
        usuario = null;
    }
});