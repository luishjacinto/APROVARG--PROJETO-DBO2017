//FEED) VERIFICAÇÃO SE ESTA ONLINE E CADASTRO DO USUARIO NO DATABASE
window.onload=function(){
    
    //VERIFICA SE ESTA LOGADO
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var usuario = user;

            //MOSTRAR NOME DE USUARIO NO RODAPE
            document.querySelector('#username').innerHTML = usuario.displayName;

            //CRIAR OU N NOVO USER
            firebase.database().ref('usuarios/').once('value', function(u) {
                var ref = u.toJSON();

                //VARIAVEL QUE VERIFICA SE USUARIO JA EXISTE
                var userexistente = 0;

                //TESTE SE USUARIO JA EXISTE
                for (c = 0; c < Object.keys(ref).length; c++){
                    if (ref[Object.keys(ref)[c]].uid == usuario.uid) { var userexistente = 1; }
                }
                //SE USUARIO N EXISTE ELE EH CRIADO
                if(userexistente == 0){
                    db.ref('usuarios/').push({
                        uid: usuario.uid,
                        nome: usuario.displayName
                    });
                }

            });
        } else {
            //CASO N ESTEJA LOGADO USUARIO É REDIRECIONADO AO LOGIN
            usuario = null;
            window.location.href="index.html";
        }
    });

    //BOTAO DE LOGOUT
    var logout = document.querySelector('#logout');

    //DESLOGAR
    logout.addEventListener('click', function() {
        firebase.auth().signOut().then(function() {
            usuario = null;
        });
    });

}


