# Res_Labo_HTTP_Infra
par Kylian Bourcoud

---

## Brief
Ce projet a été fait dans le cadre du cours Réseau de la HEIG-VD.
Il a permis de se familiariser avec les bases d'une infrastructure HTTP. Il est composé de trois images docker se trouvant dans le dossier docker-images : 
- apache_php-image : une image implémentant un serveur apache et php
- express-image : Une image implémentant un serveur dynamique avec node.js et le framework express.js.
- apache-reverse-proxy : un autre serveur apache servant de reverse proxy afin de se connecter aux deux images ci-dessus.
---
## Apache_php_image
### Build image
```
docker build -t res/apache_php .
```
Cette commande va créer l'image docker du serveur apache et copier les fichiers d'un dossier content contenant le nécéssaire pour un site web one-page statique, dans l'image.
### Run image
```
 docker run --name apache_static -d res/apache_php
```
Cette commande va démarrer le serveur apache. Lorsqu'un client se connectera au serveur reverse proxy en étant demo.res.ch comme host, et envoyant la requête get /,  le serveur renverra les fichiers affichant la page web.
La page web charge tous les 2 secondes des données prevenant d'une api contenu dans l'image du dossier express-image
---
## Express-image
### Build image
```
docker build -t res/express_address .
```
Cette commande va créer l'image docker de l'api express_js. 
De plus elle copie les informations se trouvant dans le dossier src dans l'image docker.

### Run image
```
Docker run --name express_dynamic -d res/express_address
```
Cette commande démarre le serveur express. Lorsqu'un client se connecte au serveur reverse proxy en étant demo.res.ch comme host  et envoyant la requête get /api/address/, le serveur renverra un document json contenant les données d'un nombre aléatoire d'adresse.

---
## Apache-Reverse-Proxy
### Build image
```
docker build -t res/apache_rp .
```
Cette commande va créer l'image du serveur Reverse Proxy.
De plus il va copier le contenu de deux dossier et d'un fichier dans l'image:
- conf : Le dossier contenant les données de configuration pour rediriger les requêtes sur les images correspondantes à la requête ou envoyer un message d'erreur.
- templates : un dossier contenant un script php, permettant de pouvoir renseigner les adresses ip des deux autres images
- apache2-foreground : Un fichier executant en autre le script php

### Run image
```
docker run 
    -d 
    -e STATIC_APP=<IP_Address_apache_static_container>
    -e DYNAMIC_APP=<IP_Address_express_dynamic_container>
    --name apache_rp 
    -p8080:80 
    res/apache_rp
```

Cette commande va démarre le serveur apache de reverse proxy.
On lui donne deux variables d'environnement :
- STATIC_APP : l'adresse ip docker du container apache_static, le serveur apache
- DYNAMIC_APP : l'adresse ip docker du container express_dynamic, le serveur express

De plus on mappe le port 8080 comme étant le port 80 du container apache_rp

## Résultat
Lorsque les 3 images ont été démarré correctement, 
on peut se connecter à l'aide d'un navigateur à l'adresse :
```
demo.res.ch:8080
```
On obtient alors le site contenu dans le container apache_static


on peut aussi se connecter à l'adresse :
```
demo.res.ch:8080/api/address/
```
On obtient alors le contenu d'un fichier json représentant une adress