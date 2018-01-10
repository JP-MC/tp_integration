class Profile {
    
    constructor(id,nom,prenom,adresse,date_naissance,telephone,email){
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.date_naissance = date_naissance;
        this.telephone = telephone;
        this.email = email;
    }

    setTelephone(telephone){
        telephone = telephone.replace(/\D/g,'');
        if(telephone.match(/^\d{10}$/)){
            this.telephone = telephone;
        }
    }
    setDateNaissance(date_naissance){
        date_naissance = date_naissance.replace(/\D/g,'');
        if(date_naissance.match(/^\d{8}$/)){
            this.date_naissance = date_naissance;
        }
    }

    getTelephone(){
        return this.telephone.replace(/(.{2})(?!$)/g,"$1.");
    }
    getDateNaissance(){
        return this.date_naissance.substr(0,2) + '/' + this.date_naissance.substr(2,2) + '/' + this.date_naissance.substr(4,4);
    }
    getDateNaissanceLong(){
        var date_naissance = this.date_naissance.substr(4,4) + '-' + this.date_naissance.substr(2,2) + '-' + this.date_naissance.substr(0,2);
        date_naissance = new Date(Date.parse(date_naissance));
        return date_naissance.toLocaleDateString('fr-FR',{weekday:"long",year:"numeric",month:"long",day:"numeric"});
    }
    
}

class Article {
    
    constructor(titre,texte,date){
        this.titre = titre;
        this.texte = texte;
        this.date = date;
    }

}

var loadProfile = function(){
    if(localStorage.getItem('profile') == null){
        var id = 1;
        var nom = 'Maillet-Carré';
        var prenom = 'Jean-Paul';
        var adresse = '27 avenue du docteur Torreilles 66310 Estagel';
        var date_naissance = '26101979';
        var telephone = '0637390811';
        var email = 'jpmc@cegetel.net';
    }else{
        var JSONprofile = localStorage.getItem('profile');
        JSONprofile = JSON.parse(JSONprofile);
        console.log(JSONprofile);
        
        var id = JSONprofile.id;
        var nom = JSONprofile.nom;
        var prenom = JSONprofile.prenom;
        var adresse = JSONprofile.adresse;
        var date_naissance = JSONprofile.date_naissance;
        var telephone = JSONprofile.telephone;
        var email = JSONprofile.email;
    }
    return new Profile(id,nom,prenom,adresse,date_naissance,telephone,email);
}

var loadArticles = function(){
    if(localStorage.getItem('articles') == null){
        var articles = [];
        articles.push(new Article('Titre 1','Texte','07/01/2018 à 9:14:32'));
        articles.push(new Article('Titre 2','Texte','08/01/2018 à 12:02:11'));
    }else{
        var articles = localStorage.getItem('articles');
        articles = JSON.parse(articles);
    }
    return articles;
}

var regex_name = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1,30}-?[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1,30}$/;
var regex_tel = /^[0-9]{2}[.\-/\s]?[0-9]{2}[.\-/\s]?[0-9]{2}[.\-/\s]?[0-9]{2}[.\-/\s]?[0-9]{2}$/;
var regex_date = /^[0-3]{1}[0-9]{1}[.\-/\s]?(01|02|03|04|05|06|07|08|09|10|11|12)[.\-/\s]?[12]{1}[0-9]{3}$/;

//Charge les données
var profile = loadProfile();
console.log(profile);
var articles = loadArticles();

//Éléments HTML
//Menu
var $profile_link = document.getElementById('profile-link');
var $wall_link = document.getElementById('wall-link');

//Profile
var $profile_section = document.getElementById('profile-section');
var $profile = document.getElementById('profile');
var $profile_form = document.getElementById('profile_form');
var $modifyprofile_link = document.getElementById('modify-profile');
var $validateprofile_link = document.getElementById('validate-profile');
var $input_nom = document.getElementById('nom_form');
var $input_prenom = document.getElementById('prenom_form');
var $input_adresse = document.getElementById('adresse_form');
var $input_date_naissance = document.getElementById('date-naissance_form');
var $input_telephone = document.getElementById('telephone_form');
var $input_email = document.getElementById('email_form');

//Wall
var $wall_section = document.getElementById('wall-section');
var $messages = document.getElementById('messages');
var $new_message = document.getElementById('new-message');
var $form_wrap = document.getElementById('form-wrap');
var $save_message = document.getElementById('save-message');

//Affichage des pages
$profile_link.addEventListener('click', function(){
    $profile.style.display = "block";
    $profile_form.style.display = "none";
    $wall_section.style.display = "none";
}, false);
$wall_link.addEventListener('click', function(){
    $profile.style.display = "none";
    $profile_form.style.display = "none";
    $wall_section.style.display = "block";
}, false);

//Vérifie les données
var checkProfileForm = function(){
    
    var regex_name = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1,30}-?[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1,30}$/;
    var regex_tel = /^[0-9]{2}[.\-/\s]?[0-9]{2}[.\-/\s]?[0-9]{2}[.\-/\s]?[0-9]{2}[.\-/\s]?[0-9]{2}$/;
    var regex_date = /^[0-3]{1}[0-9]{1}[.\-/\s]?(01|02|03|04|05|06|07|08|09|10|11|12)[.\-/\s]?[12]{1}[0-9]{3}$/;

    var erreur =[];

    var nom = document.getElementById('nom_form').value;
    if(!regex_name.test(nom)){erreur.push('Nom invalide');}
    
    var prenom = document.getElementById('prenom_form').value;
    if(!regex_name.test(prenom)){erreur.push('Prénom invalide');}
    
    var adresse = document.getElementById('adresse_form').value;
    var date_naissance = document.getElementById('date-naissance_form').value;
    if(!regex_date.test(date_naissance)){erreur.push('Date de naissance invalide');}

    var telephone = document.getElementById('telephone_form').value;
    if(!regex_tel.test(telephone)){erreur.push('Numéro de téléphone invalide');}

    var email = document.getElementById('email_form').value;
    
    return erreur;
};

//Insere les données profil dans le dom
var showProfile = function(profile){
    //profil
    document.getElementById('nom').textContent = profile.nom;
    document.getElementById('prenom').textContent = profile.prenom;
    document.getElementById('adresse').textContent = profile.adresse;
    document.getElementById('date-naissance').textContent = profile.getDateNaissanceLong();
    document.getElementById('telephone').textContent = profile.getTelephone();
    document.getElementById('email').textContent = profile.email;
    //formulaire
    document.getElementById('nom_form').value = profile.nom;
    document.getElementById('prenom_form').value = profile.prenom;
    document.getElementById('adresse_form').value = profile.adresse;
    document.getElementById('date-naissance_form').value = profile.getDateNaissance();
    document.getElementById('telephone_form').value = profile.getTelephone();
    document.getElementById('email_form').value = profile.email;
}

//enregistre les données du profil
var saveProfile = function(profile){
    
    profile.nom = document.getElementById('nom_form').value;
    profile.prenom = document.getElementById('prenom_form').value;
    profile.adresse = document.getElementById('adresse_form').value;
    profile.setDateNaissance(document.getElementById('date-naissance_form').value);
    profile.setTelephone(document.getElementById('telephone_form').value);
    profile.email = document.getElementById('email_form').value;

    localStorage.setItem('profile',JSON.stringify(profile));
}

//Check de l'input nom
$input_nom.addEventListener('input',function(){
    if(regex_name.test($input_nom.value)){
        $input_nom.classList.remove('error');
        $input_nom.classList.add('check');
    }else{
        $input_nom.classList.remove('check');
        $input_nom.classList.add('error');
    }
}, false);

//Check de l'input Prénom
$input_prenom.addEventListener('input',function(){
    if(regex_name.test($input_prenom.value)){
        $input_prenom.classList.remove('error');
        $input_prenom.classList.add('check');
    }else{
        $input_prenom.classList.remove('check');
        $input_prenom.classList.add('error');
    }
}, false);

//Check de l'input Date de naissance
$input_date_naissance.addEventListener('input',function(){
    if(regex_date.test($input_date_naissance.value)){
        $input_date_naissance.classList.remove('error');
        $input_date_naissance.classList.add('check');
    }else{
        $input_date_naissance.classList.remove('check');
        $input_date_naissance.classList.add('error');
    }
}, false);

//Check de l'input téléphone
$input_telephone.addEventListener('input',function(){
    if(regex_tel.test($input_telephone.value)){
        $input_telephone.classList.remove('error');
        $input_telephone.classList.add('check');
    }else{
        $input_telephone.classList.remove('check');
        $input_telephone.classList.add('error');
    }
}, false);

//Affiche le formulaire pour modifier le profil
$modifyprofile_link.addEventListener('click',function(){

    $profile.style.display = "none";
    $profile_form.style.display = "block";

}, false);

//Valide le formulaire de profil
$validateprofile_link.addEventListener('click', function(){
    
    //vérifie les données du profil
    var erreur = checkProfileForm();
    console.log(erreur);
    console.log(erreur.length);
    if(erreur.length == 0){
        //enregistre les données du profil
        saveProfile(profile);

        //Affiche le profil
        showProfile(profile);

        //Masque le formulaire
        $profile.style.display = "block";
        $profile_form.style.display = "none";
    }else{
        //Affiche les erreurs
        alert(erreur);
    }

}, false);

//Affiche le formulaire de création de message
$new_message.addEventListener('click', function(){
    $form_wrap.style.display = "block";
}, false);

//Enregistrer le nouveau message
$save_message.addEventListener('click', function(){
    //enregistrer le message
    var titre = document.getElementById('title').value;
    var texte = document.getElementById('text').value;
    var date = new Date();
    date = date.toLocaleString();
    articles.push(new Article(titre,texte,date));

    localStorage.setItem('articles',JSON.stringify(articles));

    //Mettre à jour l'affichage
    showArticles(articles);

    //Masquer le formulaire
    $form_wrap.style.display = "none";
}, false);

//Créé et insère les articles dans le dom
var showArticles = function(articles){

    //Vide la zone de messages
    $messages.innerHTML = '';

    articles.forEach(function (article,index){

        //Construit un message
        var html_article = '<article class=\"article\" id=\"article' + index + '\">';
        html_article += '<div class=\"erase-message\">X</div>';
        html_article += '<h2>' + article.titre + '</h2>';
        html_article += '<p>' + article.texte + '</p>';
        html_article += '<p>' + article.date.toLocaleString() + '</p>';
        html_article += '</article>';
        
        //Ajoute le message au DOM
        $messages.innerHTML += html_article;
    });
}

//Supprimer un message
document.addEventListener('click',function(event){
    if (event.target.classList.contains('erase-message')){
        
        //récupérer l'id de l'article
        var message_id = event.target.parentNode.id.replace('article', '');

        //supprimer l'element de la liste
        articles.splice(message_id,1);

        //mettre à jour l'affichage
        showArticles(articles);
    }
}, false);


//Affiche les données
showProfile(profile);
showArticles(articles);

//console.log(profile);