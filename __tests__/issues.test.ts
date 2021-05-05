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

test('renvoie toutes les issues', async() => {
    // On exécute la fonction
    const data  = await findAll() ;
    // On indique le résultat attendu
    expect(data.length).toEqual(2);
});

// On écrit le test sur la fonction devant renvoyer toutes les issues




