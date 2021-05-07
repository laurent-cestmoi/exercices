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
    expect(data.length).toEqual(3); //La fonction renvoie un tableau d'issues
});

// On écrit le test sur la fonction devant renvoyer l'issues correspondant à l'id demandé
test('renvoie l\'issue avec l\'id demandé', async() => {
    const data  = await findById(1) ;
    expect(data.id).toEqual(1); // La fonction renvoie un tableau d'issues avec une seule issue dont on récupère l'id
});

// On écrit le test sur la fonction devant renvoyer les issues modifiées depuis une certaine date
test('renvoie les issues mises à jour depuis une certaine date', async() => {
    const madate: Date = new Date('2020-12-25 13:30:00');
    const data  = await findIdUpdatedBefore(madate) ;
    expect(data.length).toEqual(2); //La fonction renvoie un tableau d'issues
});




