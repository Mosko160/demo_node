// On inclue les librairies
const http = require('http');                           // Pour creer le server
const fs = require('fs');                               // Pour lire les fichiers
const url = require('url');                             // Pour traiter les requetes http
const sql = require('sqlite3');                         // Pour lire les bases de donnes
const qs = require('querystring');                      // Pour simplifier la lecture d'objets
const crypto = require('crypto');                       // Pour hasher les mots de passes

const host = 'localhost';                               // Adresse du server (peut etre 'localhost' ou '127.0.0.1' ou '::1' ou '0.0.0.0', ou l'adresse de la machine)
const port = 80;                                        // Le port sur lequel le server ecoute

const user_DB = new sql.Database(__dirname+'/databases/user.sqlite');   //On instancie la base de donnees

const requestListener = function(req, res) {                                // On cree un listener qui ecoute les requetes http
    file = url.parse(req.url).pathname;                                     // On recupere le chemin du fichier demande
    if(file != '/ajax'){                                                    // Si on demande le fichier ajax on schinte cette partie car on ne demande pas reellement de ficher (voir la suite)
        if(file == '/'){file='/html_content/index.html';}                   // Si on ne specifie pas de ficher on le redirige vers le fichier index.html
        else{file = '/html_content'+file;}                                  // On ajoute le chemin du fichier a la racine du serveur
        fs.readFile(__dirname+file, '', (err,content)=>{                    // On lit le fichier
            if (err){                                                       // Si il y a une erreur
                res.writeHead(404, {'Content-Type': 'text/html'});          // On envoie un code 404
                return res.end("404 Not Found");                             
            }else{
                res.writeHead(200);                                         // On envoie un code 200
                res.end(content);                                           // On envoie le contenu du fichier
            }
        });
    }else{                                                                  // Si on ne demande pas un ficher mais une 'action'
        var data = qs.parse(url.parse(req.url).query);                      // On recupere les donnees de la requete
        var action = data.action;                                           // On recupere l'action demandee
        switch(action){                                                     // On utilise un switch pour eviter les ifs repetitifs (dans ce cas on n'a qu'une seule action donc c'est overkill)
            case 'login':                                                   // Si l'action est 'login'
                var email = data.email;                                     // On recupere l'email
                var password = data.password;                               // On recupere le mot de passe
                password = crypto.createHash('sha256').update(password).digest('base64');   // On hashe le mot de passe
                var sql_request = `select name from infos where email='${email}' and hash='${password}'`;   // On construit la requete sql
                user_DB.get(sql_request,(err,row)=>{                        // On execute la requete
                    if(err){throw err}                                      // Si il y a une erreur on lance une exception qui arretera le serveur en affichant l'erreur
                    else if(row){                                           // Si on a trouve un utilisateur
                        res.writeHead(200, {'Content-Type': 'text/plain'}); // On envoie un code 200 en specifiant qu'on envoi du texte
                        var response = {state:'success',name:row.name};     // On cree un objet qui contient le message de succes et le nom de l'utilisateur au format json
                        res.end(JSON.stringify(response));                  // On envoie le message au format texte
                    }else{                                                  // Si on ne trouve pas d'utilisateur
                        res.writeHead(200, {'Content-Type': 'text/plain'}); // On envoie un code 200 en specifiant qu'on envoi du texte
                        var response = {state:'fail'};                      // On cree un objet qui contient le message d'erreur au format json
                        res.end(JSON.stringify(response));                  // On envoie le message au format texte
                    }
                });
            break;                                                          // On termine le switch pour ce case (et donc dans ce cas on brise le switch)
        }
    }
}

const server = http.createServer(requestListener);                          // On cree le serveur avec le listener défini au dessus
server.listen(port, host, function() {                                      // On lance le serveur sur le port et l'adresse specifiees
    console.log('Server listening on http://'+host+':'+port);               // On affiche un message dans la console
});