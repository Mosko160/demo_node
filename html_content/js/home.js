const queryString = window.location.search;                 // On recupere les parametres de l'url
const urlParams = new URLSearchParams(queryString);         // On utilise une fonction native pour simplifier

function display_message(){
    var username = urlParams.get('name');                   // On recupere le nom de l'utilisateur
    document.getElementById('message').innerHTML = `Bienvenue ${username} !`;   // On affiche un message de bienvenue avec le nom de l'utilisateur
}