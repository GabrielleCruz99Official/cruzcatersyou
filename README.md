1T-cruzcatersyou-final
==
Cours à repasser
--
Aspects logique et programmation

Présentation de l'équipe
--
CRUZ Gabrielle (JhandarTheUnhallowed)

Description du project
--
La famille CRUZ a commencé une service horeca pour leurs amis 
et des clients qui voulaient un certain cuisine 
pendant la confinement. Afin de faciliter et structurer la préparation
et mise en place de leurs commandes, un site web sera crée. 

But du site
--
Ce site web sert à mettre en ordre 
les entrées planifiées pour chaque semaine, et de prendre des commandes des clients.

Aspects implémentés
--
Le site implémente 3 pages: le page index, une page pour créer et sauvegarder le menu
de la semaine concurrente, et une page qui prendre et sauvegarde des commandes pour
telle semaine.

![Index](/img/index.png)

Le page index a 2 boutons qui dirige vers les deux autres pages, et le logo en
navigation dirige vers le page index. Aussi, il affiche le menu choisi pour chaque
semaine et leurs commandes.

![SetMenu](/img/setmenu.png)

La page setmenu prend le tableau des plats dans la base des données et l'implemente
par type (entrée, plat, dessert). L'administrateur, par le checkbox, choisit les plats
qu'il voulait vendre pour chaque semaine. Après, un pop-up paraît pour confirmer
avant de revenir à la page index.

![SetOrder](/img/setorder.png)

La page setorder prend le tableau du menu pour tel semaine, et il fonctionne comme
une caisse: on prend le nom et l'adrèsse du client qui commande, et la quantité
de chaque plat. Après une autre pop-up, on sauvegarde la commande avant de diriger
vers l'index.

Lien github
--
https://github.com/JhandarTheUnhallowed/cruzcatersyou
