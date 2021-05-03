# Série d'exercices <!-- omit in toc -->
Exercices pour montée en compétence sur Node.js, TypeScript, Knex.js, etc.

- [Exercice 1](#exercice-1)
  - [Mise en place de l'environnement développement et du projet](#mise-en-place-de-lenvironnement-développement-et-du-projet)
  - [Interaction avec une base de données PostgreSQL](#interaction-avec-une-base-de-données-postgresql)
    - [Création de la structure de la base de données](#création-de-la-structure-de-la-base-de-données)
    - [Alimentation de la base de données](#alimentation-de-la-base-de-données)
    - [Récupérer les infos de la base de données](#récupérer-les-infos-de-la-base-de-données)

# Exercice 1

## Mise en place de l'environnement développement et du projet

* Création d'une branche "exercice1"
* Se placer sur cette branche
* Initialiser le projet Node :
    `npm init -y`
* Installer TypeScript pour le développement :
    `npm install typescript --save-dev`
* Créer un dossier `src` pour mettre les sources
* Créer dans src un fichier `server.ts`
* Ouvrir le fichiet `server.ts`
* Indiquer à VSCode d'utiliser la version de TypeScript installée localement et non celle qu'il embarque :
    * Shift+Ctrl+P et choisir :
    `TypeScript : Sélectionner la version de TypeScript`
    puis
    `Utiliser la version de l'espace de travail`
    *Remarque : Dans notre cas on utilisera donc la 4.2.4 au lieu de la 4.2.3*
    Cela a créer un répertoire `.vscode` contenant le fichier `settings.json` avec les lignes :
    ```json
    {
        "typescript.tsdk": "node_modules\\typescript\\lib"
    }
    ```
* Initialiser à présent la configuration du transpilateur TypeScript :
    Dans le terminal saisir :
    `.\node_modules\.bin\tsc --init`
    Cela affiche le message :
    `message TS6071: Successfully created a tsconfig.json file.`
    *Remarque : Le fichier `tsconfig.json` a été créé à la racine du projet.*
* Indiquer dans le fichier `tsconfig.json` d'inclure les fichiers se trouvant dans le répertoire `src` en ajoutant ceci après la propriété compilerOptions :
    ```json
    "include": ["src/"]
    ```
* Modifier aussi le target pour produire du ES2017 (remplacer es5):
    ```json
    "target": "ES2017"
    ```
* Créer un répertoire dist à la racine du projet pour accueillir les fichiers destinés à la prod.
* Créer à la racine du projet le fichier `tsconfig.prod.json`.
    Y écrire les lignes suivantes :
    ```json
    { 
      "extends": "./tsconfig.json", 
      "compilerOptions": { 
        "outDir": "dist" 
      } 
    }
    ```
* Ajouter le script de construction des fichiers prod dans le fichier `package.json` au niveau de la propriété `"scripts"` :
    `"build": "tsc -p tsconfig.prod.json"`
* Ajouter la simple ligne suivante au fichier `server.ts` :
    `console.log("Début de l'exercice 1");`
* Lancer la création des livrables prod avec la commande :
    `npm run build`
    *Remarque : Le répertoire `dist` a été alimenté avec le fichier `server.js`.*
* vérifier que tout fonctionne en lançant node :
    `node .\dist\server.js`
* Installer Nodemon pour permettre la compilation lors de la modification des fichiers :
    `npm install nodemon --save-dev`
* Installer pour le développement la dépendance `ts-node` permettant de combiner la phase de compilation et d’exécution d’une application Node.js.
    Il sera utilisé pour exécuter l’application directement avec les fichiers `.ts`.
    `npm install ts-node --save-dev`
* créer le fichier `nodemon.json` à la racine du projet et ajoutez le contenu suivant :
    ```json
    { 
      "watch": ["src"], 
      "ext": "ts", 
      "exec": "ts-node ./src/server.ts" 
    }
    ```
    *Remarque : Le fichier `nodemon.json` contient la configuration qui sera utilisée lors du lancement de nodemon. Les propriétés contenues dans ce fichier indiquent à nodemon de surveiller les fichiers `.ts` dans le dossier `src` et d’exécuter en cas de modification la commande `ts-node ./src/server.ts`.*
* Ouvrir le fichier `package.json`, et dans la propriété `scripts`, ajoutez la commande :
    `"start": "nodemon"`
* Lancer le script start :
    `npm start`

`ts-node` ne possède pas d’option permettant d’activer le débogage d’une application Node.js, il faut donc utiliser la ligne de commande node. L’option `--inspect-brk` démarre un processus Node.js qui sera en attente d’une connexion du debugger de Visual Studio Code et qui s’arrêtera lors de la présence d’un point d’arrêt. L’option `-r` (alias de `--require`) permet de charger un module dans Node.js (`ts-node` dans ce cas précis, pour permettre la compilation des fichiers sources).
Nous allons mettre en place le débogage avec nodemon et ts-node.
Il ne sera donc pas nécessaire d’activer l’option de compilation sourceMap pour déboguer le projet dans Visual Studio Code.

On va faire deux configuration de nodemon ;
1. `nodemon.json` pour exécuter sans débuguer (on l'a déjà créé)
2. `nodemon-debug.json` pour exécuter en débugant

* créer le fichier `nodemon-debug.json` à la racine du projet et ajoutez le contenu suivant :
    ```json
    { 
      "watch": ["src"], 
      "ext": "ts", 
      "exec": "node --inspect-brk -r ts-node/register ./src/server.ts" 
    }
    ```
* Modifier la commande `start` dans le fichier `package.json` :
    remplacer : `"start": "nodemon"`
    par : `"start": "nodemon --config nodemon.json"`
* Ajouter la commande  permettant de lancer le serveur avec le mode debug :
    `"start_with_debug": "nodemon --config nodemon-debug.json"`
* Ajouter la dépendance gérant les variables d'environnement :
    `npm install dotenv`
* La bibliothèque dotenv n’inclut aucun fichier de définition pour TypeScript. Installer la définition avec la commande suivante :
    `npm install @types/dotenv --save-dev`
    > **_NOTE :_**  TypeScript applique un typage statique sur l’ensemble du code. Beaucoup de bibliothèques JavaScript comme `dotenv` ne sont pas écrites en TypeScript et ne contiennent donc pas ce typage. Les fichiers de définition sont là pour répondre à ce besoin. Ces fichiers (ayant pour extension .d.ts) décrivent les types correspondant au code JavaScript qui va être utilisé. Pour utiliser une bibliothèque externe écrite en JavaScript dans un projet utilisant TypeScript, il faut donc récupérer le fichier de définition associé à cette bibliothèque. Une fois récupéré, la bibliothèque devient utilisable comme si elle était écrite en TypeScript et permet d’avoir toutes les fonctionnalités intégrées aux IDE (autocomplétion, remontée d’erreur, documentation dans l’éditeur…).

    > **_IMPORTANT :_**  Les fichiers de définitions doivent toujours être installés en tant que dépendance de développement, car ils ne sont jamais utilisés lors de l’exécution d’un programme.

* Ajouter la dépendance permettant de développer des applications Web :
    `npm install express`
* La bibliothèque express n’inclut aucun fichier de définition pour TypeScript. Installer la définition avec la commande suivante :
    `npm install @types/express --save-dev`

## Interaction avec une base de données PostgreSQL

* Créer une base de données PostgreSQL et renseigner  les paramètres nécessaires dans le fichier `.env`
    ```sh
    PGHOST=localhost # Hôte sur lequel se trouve le cluster PostgreSQL
    PGPORT=5413 # Numéro de port d'accès au cluster PostgreSQL (5432 par défaut)
    PGDATABASE=exercices # Nom de votre BDD PostgreSQL
    PGUSER=votre_utilisateur # Nom de votre utilisateur
    PGPASSWORD='votre_mot_de_passe' # Mot de passe de votre utilisateur
    ```
* Installer Knex et le client PostgreSQL :
    `npm install knex pg`
* Créer un répertoire `knex` pour accueillir les fichiers à utiliser.
    * créer le sous-répertoire `migrations` pour accueillir les fichiers de création de la base de données.
    * créer le sous-répertoire `seeds` pour accueillir les fichiers d'alimentation de la base de données.
* Se positionner dans le répertoire `knex`
* Initialiser knex :
    `npx knex init`
    > **_NOTE :_**  On utilise npx et non npm car `knex` n'est pas installé globalement.
    L'initialisation crée un fichier `knexfile.js` dans le répertoire courant.
* On va ici faire à "la mode camino-api" :
    1. Renommer le fichier `knexfile.js` en `config.js`
    2. Modifier son contenu pour qu'il contienne quelque chose du style :
        ```javascript
        const connection = {
            host: process.env.PGHOST,
            port: Number(process.env.PGPORT),
            database: process.env.PGDATABASE,
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD
        }
        const knexConfig = {
            client: 'pg',
            connection,
            migrations: {
                directory: join(__dirname, './migrations')
            },
            seeds: {
                directory: join(__dirname, './seeds')
            }
        }
        module.exports = { knexConfig, connection }
        ```
    3. Créer au même niveau un fichier `cli-config.js` avec le contenu suivant :
        ```javascript
        const { knexConfig } = require('./config')

        module.exports = knexConfig;
        ```
        > **_NOTE :_**  C'est ce fichier `cli-config.js` qui sera "notre `knexfile.js` classique".
### Création de la structure de la base de données   

* Créer le répertoire `migrations` dans le dossier `knex`.
* Générer le fichier .js qui contiendra la définition de notre table `issues` :
    `npx knex --knexfile .\knex\cli-config.js migrate:make createTable_issues`
    La commande affiche quelque chose du genre :
    ```
    Working directory changed to C:\_depots\exercices\knex
    Created Migration: Created Migration:
    C:\_depots\exercices\knex\migrations\20210430131725_createTable_issues.js
    ```
    > **_NOTE :_**  Le nom du fichier créé porte le nom indiqué dans la commande précédé de la date exacte de création. On choisit la convention de nommer ces fichiers en indiquant l'action et le nom impliqué en base de données. Ici on va créer la table  `issues`, donc on indique `createTable_issues`.
* Ouvrir le fichier créé `migrations\*datetime*_createTable_issues.js` :
    Il contient deux parties :
    * `up` : qui contiendra les actions à réaliser dans la base
    * `down` : qui contiendra les actions pour annuler celles spécifiées dans `up` (c'est en fait un rollback).
    ```javascript
    exports.up = function(knex) {

    };
    
    exports.down = function(knex) {

    };
    ```
* Modifier le fichier pour créer la table `issues` contenant trois champs (Id, nom, URL Github). On fait ici aussi "à la mode camino" :
    ```javascript
    exports.up = knex =>
    knex.schema.createTable('issues', table => {
        table.increments('id') // pas la peine d'ajouter .primary();
        table.string('nom').notNullable();
        table.text('url');
    })

    exports.down = knex => knex.schema.dropTable('issues')
    ```
    > **_NOTE :_**  On a choisi volontairement le type `text`pour stocker les longues URL. En revanche pour gérer les identifiants on choisit le type `increments` contrairement à camino.

* Lancer la création de la table en ligne de commande :
    ```
    npx knex migrate:latest --knexfile .\knex\cli-config.js
    Working directory changed to C:\_depots\exercices\knex
    Batch 1 run: 1 migrations
    ```
    > **_NOTE :_**  Deux tables sont automatiquement créées :
    * `knex_migrations` : liste des "migrations" exécutées
    * `knex_migrations_lock` : gère un verrou pour qu'il n'y ait pas plusieurs personnes à la fois qui exécuter des "migrations".

    > **_IMPORTANT :_**  `migrate:latest` exécute toutes les "migrations" qui n'ont pas encore été exécutées.
* ajouter le script de création de la structure de la base de données au fichier `package.json` :
    `"db:migrate": "npx knex migrate:latest --knexfile .\\knex\\cli-config.js"`
* lancer la commande de migration pour vérifier que tout est à jour :
    `npm run db:migrate`

### Alimentation de la base de données   

* Créer le répertoire `seeds` dans le dossier `knex`.
* Générer le fichier .js qui contiendra des insertions de données dans la table `issues` :
    `npx knex --knexfile .\knex\cli-config.js seed:make 01_issues`
    La commande affiche quelque chose du genre :
    ```
    Working directory changed to C:\_depots\exercices\knex
    Created seed file: C:\_depots\exercices\knex\seeds\01_issues.js
    ```
    > **_NOTE :_**  Le nom du fichier créé porte le nom indiqué dans la commande précédé de la date exacte de création.
* Ouvrir le fichier créé `seeds\01_issues.js` et y mettre le code suivant :
    ```javascript
    const seeding = require('../seeding');

    const issues = require('../../sources/issues.json');

    const seed = seeding(async ({ insert }) => {
        await insert('issues', issues);
    });
    
    module.exports = seed ;

    module.exports.seed = seed ;
    ```
* On va réaliser l'alimentation à "la sauce camino" :
    1. Créer le dossier `sources` à la racine du projet
    2. Créer dans ce dossier le fichier `issues.js` et y ajouter nos issues :
        ```json
        [
            {
                "nom": "Exercice 1",
                "url": "https://github.com/laurent-cestmoi/montee-en-competences/issues/2"
            },
            {
                "nom": "Exercice 2",
                "url": "https://github.com/laurent-cestmoi/montee-en-competences/issues/4"
            },
            {
                "nom": "Exercice 3",
                "url": "https://github.com/laurent-cestmoi/montee-en-competences/issues/5"
            }
        ]
        ```
    3. dans le dossier `knex` créer le fichier `seedings.js` et y mettre le code suivant :
        ```javascript
        const INSERT_SIZE = 3000;

        module.exports = func => knex => {
        const del = table => {
            console.info(`suppression des données de la table "${table}"`);

            return knex(table).del();
        };

        const insert = (table, data) => {
            console.info(
            `insertion des données de la table "${table}", (${data.length} élément(s))`
            );

            const arrs = [];
            for (let i = 0; i < data.length; i += INSERT_SIZE) {
            arrs.push(data.slice(i, i + INSERT_SIZE));
            };

            return Promise.all(arrs.map(arr => knex(table).insert(arr))).catch(e => {
            // si le message d'erreur est trop long
            // réduit la taille du message à 100 caractères
            const problem = e.message.split(' - ').pop();
            const message = `Table "${table}" - ${problem} - ${e.detail}`;

            throw new Error(message);
            });
        };

        return func({ del, insert })
        };
        ```
    4. ajouter le script de création de la structure de la base de données au fichier `package.json` :
        `"db:seed": "npx knex seed:run --knexfile .\\knex\\cli-config.js"`
    5. lancer l'alimentation de la table `issues` :
        `npm run db:seed`
        On obtient dans la console :
        ```
        exercices@1.0.0 db:seed C:\_depots\exercices     
        > npx knex seed:run --knexfile .\knex\cli-config.js

        Working directory changed to C:\_depots\exercices\knex
        insertion des données de la table "issues", (3 élément(s))
        Ran 1 seed files
        ```

### Récupérer les infos de la base de données

On va faire à présent référence à notre configuration pour utiliser knex dans notre code dédié à être déployé. On va faire "à la mode Camino" :
1. Créer un répertoire `config` dans le répertoire `src`
2. Créer dans ce répertoire le fichier `knex.ts` et y insérer le code suivant :
    ```javascript
    const connection = {
        host: process.env.PGHOST,
        port: Number(process.env.PGPORT),
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD
    };

    const knexConfig = {
        client: 'pg',
        connection  
    };

    export { knexConfig };
    ```
3. Modifier le fichier `server.ts` pour ajouter les lignes nécessaires à lister dans le terminal le contenu de la table issues.
    > **Remarque :** On utilisera un appel asynchrone pour gérer l'ordre d'affichage dans le log de la console.
    ```javascript
    // Récupération de issues (en fait le select * from issues)
    function getIssues() {
    // Plusieurs façons d'écrire le select * from issues :
    // db('issues')
    // db.from('issues').select('*')
    return db('issues');
    };

    // Utilisation d'une fonction asynchrone pour avoir tous les 
    // retours console dans l'ordre souhaité
    (async function(){
    const res = await getIssues()
    .then(data => {

        // On affiche la requête créée par knex
        console.log('Requête créée par knex :');
        console.log(getIssues().toString(), '\n');

        // On affiche le résultat brut
        console.log('Résultat brut :') 
        console.log(data,'\n');

        // On affiche plus joliment en ne prenant que les attributs
        console.log('Résultat avec simplement la valeur des attributs id, nom, url :')
        for (const issue of data) {
        console.log(issue.id, issue.nom, issue.url);
        }
    })
    .catch(err => {
        console.log(err.message);
    })
    .finally(() => {
        db.destroy();
    });
    })();
    ```