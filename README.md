# Arduino-Project
Un système de diffusion d’annonces entre le personnel d’un magasin , d’un hôtel, restaurant ...Des écrans sont installlés dans les locaux avec des lecteurs de badges à côté, Un employé badge et voit apparaître sur l’écran ses nouveaux messages pas encore lus.
## /NotifyMe-Frontend/notifymefrontend:
Le front-End de l'appliccation .
### /src/Screen : 
L'intefrace utilisateur qui badge et voit ses messages à l'ecran.
### /src/* : 
une interface d’administration qui permet à l’admin de :
- créer / modifier/ supprimer des groupes de diffusion 
- envoyer des annonces ciblés pour ces groups ou pour des individus
- accéder au détails de vues d'un message( les personnes qui ont vu le message et ceux qui l'ont pas fait)
- ajouter/supprimer/modifier des employés
## /NotifyMe-Frontend/node-server:
une serveur pour récupérer l'ID envoyé par Arduino.
## /NotifyMe:
Le back-End de l'application: gestion de la base de données / requêtes HTTP provenant du front.
## /NotifyMe-Arduino:
Un sketch Arduino pour récupérer l'ID d'un badge lu par un lecteur RFID

