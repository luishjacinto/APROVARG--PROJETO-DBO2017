//USUARIO) APRESENTAR CARD COM FOTO, NOME E EMAIL DO USUARIO DO GOOGLE
window.onload=function(){
    
    //VERIFICAR SE ESTA LOGADO
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            usuario = user;
            //APRESENTA DADOS NO CARD
            document.querySelector('#fotoperfil').src = usuario.photoURL;
            document.querySelector('#usuario').innerHTML = 'Nome: ' + usuario.displayName;
            document.querySelector('#email').innerHTML = 'Email: ' + usuario.email;
            console.log('logado');
            
        } else {
            usuario = null;
            window.location.href="index.html";
        }
    });

    //BUSCA BOTAO DESLOGA
    var logout = document.querySelector('#logout');

    //DESLOGA
    logout.addEventListener('click', function() {
        firebase.auth().signOut().then(function() {
            usuario = null;
            document.querySelector('#fotoperfil').src = '';
            document.querySelector('#usuario').innerHTML = '';
            document.querySelector('#email').innerHTML = '';
        });
    });

}