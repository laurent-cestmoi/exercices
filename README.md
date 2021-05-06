# Série d'exercices <!-- omit in toc -->
Exercices pour montée en compétence sur Node.js, TypeScript, Knex.js, etc.
>Remarque : Je debute en programmation. Une certaine indulgence est requise :innocent:

- [Exercice 1](#exercice-1)
  - [Énoncé de l'exercice](#énoncé-de-lexercice)
  - [Mise en place de l'environnement développement et du projet](#mise-en-place-de-lenvironnement-développement-et-du-projet)
  - [Interaction avec une base de données PostgreSQL](#interaction-avec-une-base-de-données-postgresql)
    - [Création de la structure de la base de données](#création-de-la-structure-de-la-base-de-données)
    - [Alimentation de la base de données](#alimentation-de-la-base-de-données)
    - [Récupérer les infos de la base de données](#récupérer-les-infos-de-la-base-de-données)
- [Exercice 2](#exercice-2)
  - [Énoncé de l'exercice](#énoncé-de-lexercice-1)
  - [Créer un modèle avec les 2 fonctions](#créer-un-modèle-avec-les-2-fonctions)
  - [Ecrire les tests de ces 2 fonctions](#ecrire-les-tests-de-ces-2-fonctions)
    - [Installer Jest](#installer-jest)
    - [Créer le test sur les issues](#créer-le-test-sur-les-issues)
    - [Exécuter les tests](#exécuter-les-tests)
    - [Ajout de deux champs à la table issues](#ajout-de-deux-champs-à-la-table-issues)
    - [Ajouter une méthode pour sélectionner des issues en fonction de leur date de mise à jour](#ajouter-une-méthode-pour-sélectionner-des-issues-en-fonction-de-leur-date-de-mise-à-jour)

# Exercice 1

## Énoncé de l'exercice

* À faire :
  * Modéliser et scripter les issues en BDD (une seule table avec pour champ : Id, nom, URL Github)
  * Réaliser un script d'import qui permet d'ajouter rapidement des données de tests dans cette base de données)
  * En lançant l'outil, les issues sont listées en ligne de commande

* À utiliser:

    * Créer un repo Github spécifique pour cet exercice la lib Knex.js (pour la création script de création de la base de données (Migration), import de données, et requêtes SQL de lecture.)

> Pour le reste, aucune consigne => Libre choix
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
    // db.select().table('issues')
    // db.select('*').table('issues')
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
# Exercice 2

Amélioration des requêtes et mise en place des tests.

## Énoncé de l'exercice

Le but de cet exercice est de pouvoir créer des requêtes en base de données pour pouvoir faire des selections plus fines en base de données.
Nous souhaitons :
* pouvoir récupérer une issue en particulier grâce à son id
* Récupérer toutes les issues qui ont été modifiées depuis une certaine date

A faire:
* Créer une nouvelle migration knex, pour ajouter des timestamps (updated_at et created_at) (Ne pas hésiter à utiliser les mécanismes typestamp fournis par knex)
* Créer deux nouvelles méthodes qui permettent d'implémenter les deux requêtes
* Mettre en place des tests Jest pour tester ces deux méthodes.

>**Note sur les tests :**
    Au lancement des tests, on initialisera la table issues avec des données de tests.
    On pourra tester le nombre de résultats renvoyés par chacune des méthode.
    Tester 2 use cases :
    1. le cas ou aucune donnée ne correspond à la recherche
    2. le cas ou une partie des données correspondent à la recherche

## Créer un modèle avec les 2 fonctions

* Créer le répertoire `models` dans `src`
* Créer le fichier `issue-models.ts`
* Y ajouter les deux fonctions :
  * Pour récupérer toutes les issues
  * Pour récupérer une seule issue en précisant on id
  ```typescript
  import knex from '../config/knex';

    const db = knex();

    interface Issue {
        id: number;
        nom: string;
        url: number;
    };

    export async function findAll(): Promise<Issue>{
        const issues = await db('issues');
        return issues;
    };

    export async function findById(id: number): Promise<Issue>{
        const issue = await db('issues').where("id", id);
        return issue;
    };

  ```
* modifier le fichier `server.ts` pour appeler ces deux fonctions et voir le résultat dans la console :
  ```typescript
    import express from "express";
    import { config } from "dotenv";

    config(); 
    
    const app = express(); 
    const port = process.env.PORT || 3000;

    import {findAll, findById} from "./models/issue-model";

    async function main(): Promise<any> {
        console.log(await findAll());
        console.log(await findById(1)); // retourne l'issue qui a son id = 1
    }

    main().catch(err => {
        console.log(err.message);
    });

    main().finally(() => {
        process.exit()
    });
  ```
## Ecrire les tests de ces 2 fonctions
### Installer Jest
* Installer la dépendance Jest
    `npm install jest --save-dev`
* Installer le fichier de définition de Jest :
    `npm install @types/jest --save-dev`
* Installer ts-jest (préprocesseur TypeSript pour Jest)
    `npm install ts-jest --save-dev`
* Initialiser ts-jest
    `npx ts-jest config:init`
    Cela crée le fichier de configuration `jest.config.js` dans le dossier courant :
    ```javascript
    module.exports = {
        preset: 'ts-jest',
        testEnvironment: 'node',
    };
    ```
    >Pour plus d'info sur la configuration de jtest cf. https://jestjs.io/docs/configuration.
* Ajouter un script au fichier `package.json`pour lancer un test jest en ligne de commande
    ```javascript
    ... 
    "scripts": { 
        ... 
        "test": "jest --coverage",
        "test:watch": "jest --watch",
     } , 
    ...
    ```
    En fait on ajoute deux scripts :
    * un avec l'option `--coverage` qui va ajouter les informations de couverture de code au rapport de résultats.
    * un avec l'option `watch` qui n'exécute les tests que pour les fichiers `*.test.ts` modifiés depuis la dernière exécution.
* Créer le répertoire `__tests__`
    >**Note** : Par défaut `jest` regarde les fichiers de tests inclus dans le répertoire nommé `__tests__`.
* Ajouter ce répertoire au fichier `tsconfig.json` :
    ```json
    "include": [
        "src/**/*",
        "__tests__/**/*"
    ]
    ```
### Créer le test sur les issues
* Créer le fichier `issues.test.ts` dans le répertoire `__tests__`.
    >**Remarque :** Par convention on nomme les fichiers `*nom_de_la_classe_a_tester*.test.ts`.
    ```javascript
    import { findAll, findById, findIdUpdatedBefore } from '../src/models/issue-model';
    import knex from '../src/config/knex'

    // Avant de lancer les tests on effectue une série d'opérations
    beforeAll(async () => {
        // On vide la table issues
        await knex("issues").truncate();
        // On alimente ta table avec des données
        await knex("issues").insert([
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
        ]);
    });

    // Fermer la connexion à la base (notamment pour bien sortir des tests)
    afterAll(() => {
        knex.destroy()
    });

    // On écrit le test sur la fonction devant renvoyer toutes les issues
    test('renvoie toutes les issues', async() => {
        // On exécute la fonction
        const data  = await findAll() ;
        // On indique le résultat attendu
        expect(data.length).toEqual(3);
    });

    // On écrit le test sur la fonction devant renvoyer l'issues correspondant à l'id demandé
    test('renvoie l\'issue avec l\'id demandé', async() => {
        const data  = await findById(1) ;
        expect(data[0].id).toEqual(1); // La fonction renvoie un tableau d'issues avec une seule issue dont on récupère l'id
    });
    ```

### Exécuter les tests

* Taper la commande :
    `npm run test`
* Vous obtenez quelque chose du genre :
    ```
    > exercices@1.0.0 test C:\_depots\exercices
    > jest --coverage

    PASS  __tests__/issues.test.ts
    √ renvoie toutes les issues (4 ms)
    √ renvoie l'issue avec l'id demandé (2 ms)

    -----------------|---------|----------|---------|---------|-------------------
    File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
    -----------------|---------|----------|---------|---------|-------------------
    All files        |     100 |      100 |     100 |     100 | 
    config           |     100 |      100 |     100 |     100 | 
    knex.ts          |     100 |      100 |     100 |     100 | 
    models           |     100 |      100 |     100 |     100 | 
    issue-model.ts   |     100 |      100 |     100 |     100 | 
    -----------------|---------|----------|---------|---------|-------------------
    Test Suites: 1 passed, 1 total
    Tests:       2 passed, 2 total
    Snapshots:   0 total
    Time:        3.038 s
    Ran all test suites.
    ```
### Ajout de deux champs à la table issues

* Générer le fichier .js qui contiendra l'ajout des 2 attributs à notre table `issues` :
    `npx knex --knexfile .\knex\cli-config.js migrate:make add2ColumnsTo_issues`
    La commande affiche quelque chose du genre :
    ```
    Working directory changed to C:\_depots\exercices\knex
    Created Migration:
    C:\_depots\exercices\knex\migrations\20210506082443_add2ColumnsTo_issues.js
    ```
* Ouvrir le fichier créé `migrations\*datetime*_add2ColumnsTo_issues.js`
* Modifier le fichier pour créer les deux colonnes a table `issues` :
  * `updated_at`
  * `created_at`

    ```javascript
    exports.up = knex =>
    knex.schema.table('issues', t => {
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.timestamp('updated_at').defaultTo(knex.fn.now());
    });

    exports.down = knex =>
    knex.schema.table('issues', t => {
        t.dropColumns('created_at', 'updated_at');
    });
    ```
* Lancer l'ajout de ces 2 colonnes dans la table issues :
    ```
    npx knex migrate:latest --knexfile .\knex\cli-config.js
    Working directory changed to C:\_depots\exercices\knex
    Batch 2 run: 1 migrations
    ```
* lancer la commande de migration pour vérifier que tout est à jour :
    `npm run db:migrate`


### Ajouter une méthode pour sélectionner des issues en fonction de leur date de mise à jour
* Modifier le fichier `issue-model.ts` pour ajouter la méthode `findIdUpdatedBefore` :
    ```typescript
    export async function findIdUpdatedBefore(updated_at: Date): Promise<Array<Issue>> {
        const issue = await  knex('issues').select().where("updated_at", '>=', updated_at);
        return issue;
    };
  ```
* Modifier les tests pour tester cette nouvelle méthode
    * Commencer par modifier l'alimentation de la table pour ajouter les attributs concernant les dates :
        ```typescript
            {
            "nom": "Exercice 1",
            "url": "https://github.com/laurent-cestmoi/montee-en-competences/issues/2",
            "created_at": "2020-12-25 13:00:00",
            "updated_at": "2020-12-25 13:10:00"
        },
        {
            "nom": "Exercice 2",
            "url": "https://github.com/laurent-cestmoi/montee-en-competences/issues/4",
            "created_at": "2021-01-10 10:00:00",
            "updated_at": "2021-01-12 13:20:00"
        },
        {
            "nom": "Exercice 3",
            "url": "https://github.com/laurent-cestmoi/montee-en-competences/issues/5",
            "created_at": "2021-04-25 10:00:00",
            "updated_at": "2021-04-25 13:30:00"
        }
        ```
    * Ajouter le test pour cette nouvelle méthode
        ```typescript
        test('renvoie les issues mises à jour depuis une certaine date', async() => {
            const madate: Date = new Date('2020-12-25 13:30:00');
            const data  = await findIdUpdatedBefore(madate) ;
        expect(data.length).toEqual(2); //La fonction renvoie un tableau d'issues
        });
        ```
### Lancer tous les tests

Relancer tous les tests :
`npm run test`
```
 PASS  __tests__/issues.test.ts
  √ renvoie toutes les issues (5 ms)
  √ renvoie l'issue avec l'id demandé (2 ms)
  √ renvoie les issues mises à jour depuis une certaine date (2 ms)

-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------|---------|----------|---------|---------|-------------------
All files        |     100 |      100 |     100 |     100 | 
 config          |     100 |      100 |     100 |     100 | 
  knex.ts        |     100 |      100 |     100 |     100 | 
 models          |     100 |      100 |     100 |     100 | 
  issue-model.ts |     100 |      100 |     100 |     100 | 
-----------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.617 s, estimated 2 s
Ran all test suites.
```