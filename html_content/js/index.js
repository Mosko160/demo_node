/*
La fonction digestMessage permet de chiffrer le mot de passe avant de le transmettre au serveur
On utilise la fonction crypto.subtle.digest pour chiffrer le mot de passe qui est asynchrone
C'est a dire qu'elle s'execut en parrallele de la fonction login (un second thread)
Mais on doit attendre la fin de la fonction pour pouvoir continuer
Donc on met un await devant la asynchrone pour attendre la fin de la fonction
Si tu construis une fonction qui contient une fonction asyncrhone alors celle que tu construis le devient automatiquement
Donc on précise en mettant un 'async' avant le 'function'
*/
async function digestMessage(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); 
    return hashHex;
}

async function login(){                         // On définit la fonction login
    var email = $("#email").val();              // On récupère l'email
    var password = $("#password").val();        // On récupère le mot de passe
    if(email == '' || password == ''){          // Si l'email et/ou le mot de passe est vide
        $("#failed_connection_message").html("Please fill all fields");     // On change le contenu de la h3 #failed_connection_message
        document.getElementById('failed_connection_message').style.display = 'block';   // On affiche le message d'erreur
    }else{                                      // Sinon
        var re = /\S+@\S+\.\S+/;                // On définit un regex pour vérifier l'email, c'est un pattern qui permet de vérifier si l'email est valide
        if(re.test(email)){                     // Si l'email est valide
            password = await digestMessage(password);   // On chiffre le mot de passe
            $.get('ajax',{action:'login',email:email,password:password},function(data){  // On envoie les données au serveur
                data = JSON.parse(data);                                // On parse les données en JSON pour pouvoir les utiliser
                if(data.state == 'success'){                            // Si le serveur nous renvoie un succès
                    window.location.href = `home.html?name=${data.name}`;   // On redirige l'utilisateur vers la page home avec le nom de l'utilisateur en paramètre
                }else{                                                  // Sinon
                    $("#failed_connection_message").html("Connection failed");            // On change le contenu de la h3 #failed_connection_message
                    document.getElementById('failed_connection_message').style.display = 'block';   // On affiche le message d'erreur
                }
            });
        }else{                                                        // Sinon
            $("#failed_connection_message").html("Please enter a valid email");    // On change le contenu de la h3 #failed_connection_message
            document.getElementById('failed_connection_message').style.display = 'block';   // On affiche le message d'erreur
        }
    }
}