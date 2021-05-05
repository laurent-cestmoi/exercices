import { findAll, findById } from '../src/models/issue-model';
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
    expect(data.length).toEqual(2);
});

// On écrit le test sur la fonction devant renvoyer l'issues correspondant à l'id demandé
test('renvoie l\'issue avec l\'id demandé', async() => {
    // On exécute la fonction
    const data  = await findById(1) ;
    //console.log(data);
    // On indique le résultat attendu
    expect(data.id).toEqual(1);
    // const value = 1 + 1;
    // expect(value).toEqual(2);
});




