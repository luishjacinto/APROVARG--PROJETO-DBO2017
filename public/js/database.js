//GERADOR) ADICIONA AO DATABASE O TITULO, AUTOR E TEXTO DE UM PROJETO
var db = firebase.database();
db.ref('/postagens/').once('value',function(p) { return posts = p.toJSON(); })

window.onload=function(){

    //VERIFICAR SE ESTA LOGADO COM ADMIM
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var usuario = user;

            firebase.database().ref('usuarios/' + '-KzpFGz3glgHRgw2mYsF/').once('value', function(u) {
                var ref = u.toJSON();
                //CASO LOGADO COM ADMIM, FORMULARIO É CARREGADO
                if (ref[Object.keys(ref)[2]] == usuario.uid){
                    document.querySelector('#body').style.display = 'block';
                }

            });

        } else {
            usuario = null;
            window.location.href="index.html";
        }
    });

    //FUNCAO Q ADICIONA PROJETO AO BANCO
    var form = document.querySelector('#formulario');
    form.addEventListener('submit', function (e) {
        db.ref('postagens/').push({
            titulo: form.titulo.value,
            autor: form.autor.value,
            texto: form.texto.value,
            likes: 0,
            deslikes: 0
        });
        form.reset();
        (e).preventDefault();
    });
    
}
