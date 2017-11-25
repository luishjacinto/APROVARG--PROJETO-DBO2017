//FUNÇOES DO FEED) APRESENTAR PROJETOS CADASTRADOS NO DATABAS, BOTAO DE APROVO, BOTAO DE DESAPROVO
var db = firebase.database();

//PEGAR OS CARDS E APRESENTA-LOS NO FEED
db.ref('/postagens/').once('value', function(p) { 
  var posts = p.toJSON();
  criar(posts);
});

//CRAR CARDS DOS PROJETOS
function criar(posts){
    const local = document.querySelector('#local');
    for(c = Object.keys(posts).length - 1; c >= 0; c--){
        //card
        const projeto = document.createElement("DIV");
        projeto.id = "projeto" + c;
        
        projeto.className = "demo-card-wide mdl-card mdl-shadow--2dp card";

        //titulo
        const title = document.createElement("h3");
        title.className = "mdl-card__title";
        title.innerHTML = posts[Object.keys(posts)[c]].titulo;
        
        //autor
        const a = document.createElement("DIV");
        a.className = "mdl-card__supporting-text";
        
        const a1 = document.createElement("h4");
        a1.className = "mdl-card__title-text";
        a1.innerHTML = "Autor: " + posts[Object.keys(posts)[c]].autor;

        //texto
        const tx = document.createElement("DIV");
        tx.className = "mdl-card__supporting-text";
        tx.innerHTML = posts[Object.keys(posts)[c]].texto;

        a.appendChild(a1);
        a.appendChild(tx);

        const buttons = document.createElement("DIV");
        buttons.className = "mdl-card__actions mdl-card--border";
        
        //Bbotao like
        const btt1 = document.createElement("a");
        btt1.innerHTML = "<button class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent bt btt btlike' onclick='aprovo.call(this)' > Aprovo </button>";
        btt1.id = "aprovo" + c;
        //n de likes
        const nlikes = document.createElement("span");
        nlikes.innerHTML = posts[Object.keys(posts)[c]].likes;
        nlikes.id = "count" + c;
        nlikes.className = "likes"; 

        //botao deslike
        const btt2 = document.createElement("a");
        btt2.innerHTML = "<button class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect bt btdeslike' onclick='desaprovo.call(this)' > Desaprovo </button>";
        btt2.id = "desaprovo" + c;
        
        //n de deslikes
        const ndeslikes = document.createElement("span");
        ndeslikes.innerHTML = posts[Object.keys(posts)[c]].deslikes;
        ndeslikes.id = "count" + c;
        ndeslikes.className = "deslikes";
        

        buttons.appendChild(btt1);
        buttons.appendChild(nlikes);        
        buttons.appendChild(btt2);
        buttons.appendChild(ndeslikes);        
        
        //juntar td
        projeto.appendChild(title);
        projeto.appendChild(a);
        projeto.appendChild(buttons);

        //postar
        const br = document.createElement("br");

        local.appendChild(projeto);
        local.appendChild(br);
    }
    document.querySelector('.carregando').style.display = 'none';
    logado();
    document.querySelector('.carregado').style.display = 'block';
}

//HABILITAR VOTO APENAS NOS PROJETOS N VOTADOS AINDA
logado = function(){
        firebase.database().ref('usuarios/').once('value', function(u) {
    
            var us = u.toJSON();
    
            for (c = 0; c < Object.keys(us).length; c++){
                
                var user = firebase.auth().currentUser;
    
                //RESGATAR KEY DO USUARIO NO BANCO
                if (us[Object.keys(us)[c]].uid == user.uid) { 
                    var atual = Object.keys(us)[c];             
                }
            }
            //PROCURAR NAS INTERACOES LIKES E DESLIKES DO USUARIO
            firebase.database().ref('usuarios/' + atual + "/" + 'interacao/').once('value', function(i) {
                var i = i.toJSON();

                //APRESENTAR NA TELA QUANDO CARREGADA NOVAMENTE
                if (i != null){
                    for (c1 = 0; c1 < Object.keys(i).length; c1++) {

                        if (i[Object.keys(i)[c1]].like != null) {
                            idbtt = i[Object.keys(i)[c1]].like;
                            document.querySelector('#aprovo' + idbtt).parentElement.children[1].style.color = 'MediumSeaGreen';                                                        
                            document.querySelector('#aprovo' + idbtt).children[0].disabled = true;                            
                            document.querySelector('#desaprovo' + idbtt).children[0].disabled = true;
                        }
                        if (i[Object.keys(i)[c1]].deslike != null) {
                            idbtt = i[Object.keys(i)[c1]].deslike;
                            document.querySelector('#aprovo' + idbtt).parentElement.children[3].style.color = 'red';                                                        
                            document.querySelector('#aprovo' + idbtt).children[0].disabled = true;                            
                            document.querySelector('#desaprovo' + idbtt).children[0].disabled = true;
                        }

                    }
                }
            });
    
        });
}

//FUNÇAO BOTAO APROVO
aprovo = function(){
    //buscar projeto
    var id = this.parentElement.parentElement.children[1].id.charAt(5);

    
    //buscar botoes
    var like = this;
    var deslike = this.parentElement.parentElement.children[2].children[0];

    //buscar contador likes
    var span = this.parentElement.parentElement.children[1];

    if (deslike.disabled == false) {
        //acessar banco
        firebase.database().ref('/postagens/').once('value', function(d) { 
            var ref = d.toJSON();
            var cont = ref[Object.keys(ref)[id]].likes;

            //atualizar banco
            db.ref('postagens/' + Object.keys(ref)[id] + "/").update({
                likes: cont + 1
            });
            retrievelikes(id);

            //atualizar likes
            span.innerHTML = ref[Object.keys(ref)[id]].likes + 1;
            span.style.color = 'MediumSeaGreen';
        });
        deslike.disabled = true;
    }
}

//FUNÇAO BOTAO DESAPROVO
desaprovo = function(){
    //buscar projeto
    var id = this.parentElement.parentElement.children[3].id.charAt(5);

    //buscar botoes
    var deslike = this;
    var like = this.parentElement.parentElement.children[0].children[0];

    //buscar contador likes
    var span = this.parentElement.parentElement.children[3];


    if (like.disabled == false) {
        //acessar banco
        firebase.database().ref('/postagens/').once('value', function(d) { 
            var ref = d.toJSON();
            var cont = ref[Object.keys(ref)[id]].deslikes;

            //acessar banco
            db.ref('postagens/' + Object.keys(ref)[id] + "/").update({
                deslikes: cont + 1
            });
            retrievedeslikes(id);

            //atualizar deslikes
            span.innerHTML = ref[Object.keys(ref)[id]].deslikes + 1;
            span.style.color = 'red';
        });
        like.disabled = true;
    }
}

//ADICIONA PROJETO APROVADO AO DATABASE
retrievelikes = function(id){
    firebase.database().ref('usuarios/').once('value', function(u) {

        const us = u.toJSON();

        for (c = 0; c < Object.keys(us).length; c++){

            //PEGAR USUARIO LOGADO
            var user = firebase.auth().currentUser;

            //VERIFICAR ONDE ESTAR O USUARIO NO BANCO
            if (us[Object.keys(us)[c]].uid == user.uid) { 

                var current = Object.keys(us)[c];

                //ADICIONAR INTERAÇAO NO BANCO
                db.ref('usuarios/' + current + "/" + 'interacao/').push({
                    like: id
                });

            }
        }

    });
}

//ADICIONA PROJETO DESAPROVADO AO DATABASE
retrievedeslikes = function(id){

    firebase.database().ref('usuarios/').once('value', function(u) {

        const us = u.toJSON();

        for (c = 0; c < Object.keys(us).length; c++){

            //PEGAR USUARIO LOGADO
            var user = firebase.auth().currentUser;

            //VERIFICAR ONDE ESTAR O USUARIO O BANCO
            if (us[Object.keys(us)[c]].uid == user.uid) { 

                var current = Object.keys(us)[c];

                //ADCIONAR INTERAÇAO NO BANCO
                db.ref('usuarios/' + current + "/" + 'interacao/').push({
                    deslike: id
                });

            }
        }

    });
}