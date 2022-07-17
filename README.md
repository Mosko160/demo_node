# demo_node

Pour lancer le server:
    - installer node.js
    - telecharger le git
    - dans la racine du dossier git taper la commande 'npm install sqlite3' car librairie annexe
    - puis lancer (jsp comment on fait sur linux mais sous macOS/linux c'est : 'sudo node app.js')

Quelques précisons/aides de compréhension:

Node.js :
    Node est juste un interpreteur de code javascript rien de plus, il vient avec le logiciel npm qui sert a en partie a installer des librairies

HTML : 
    - Fonctionne avec des balises qu'on ouvre <nom> et qu'on ferme </nom>
    - Y'a 3 codes différents qui interviennent :
        - HTML pour "l'ossature" de la page, ce que l'utilisateur verra
        - Cascading Style Sheets (CSS) pour le visuel de l'ossature
        - Javascript (JS) pour l'interactivite
        On compare souvent une page web a un humain ou l'HTML c'est les os, le CSS la peau et le JS les muscles/organes 
    - Les balises h(chiffre) correspond a des titres en gras, plus le chiffre est eleve plus la taille du texte sera petite
    - Les charactere speciaux ne sont pas pris en comptes donc faut utiliser les codes html ou ascii

Javascript :
    C'est un langage derive de JAVA mais oriente script. C'est a dire qu'il est EXTREMEMENT plus laxiste que JAVA, pas besoin de declarer les variables avant de les utiliser ni de specifier leur type ni si elle sont publiques ou privees (par contre y'a tjs le bail de variables locales) et pas besoin de mettre des ; partout.

Fonctionnement global :

    - Le "fichier" ajax :
        ajax c'est l'ancien nom de jquery, quand sur le client on communique avec le server on demande obligatoirement un fichier, sauf qu'on veut juste faire transiter des infos, donc pour ce faire on dit qu'on veut le fichier ajax et le server comprend

    - Le double hash de mdp :
        C'est juste pour la sécurité, on peut pas envoyer le mdp en clair au server car on peut trop simplement l'attraper, mais on peut pas non plus utiliser le hash envoye par le client car si on l'intercepte on peut ecrire une requete a la main pour se log a sa place

    - Le switch :
        Ca remplace une succession de if,else if,else if... et c'est mieux optimisé
    
    - res / req :
        Dans le listener req correspond a la requete recu par le server par le client res, res.end() sert a envoyer au client

    - header : 
        Le chiffre correspond au type de communication (404 -> erreur, 403 -> interdit, 200 -> "normal" etc...)
        Le content type sert a specifier le type de document envoye, il faudrait changer ca ici car on envoie du js et css en temps qu'html et certain navigateurs aiment pas et generent des erreurs (ca s'appelle des mime type)