import express from "express";
import { config } from "dotenv";
import { knex } from 'knex';
import * as knexfile from './config/knex';

config(); 
 
const app = express(); 
const port = process.env.PORT || 3000;
const db = knex(knexfile.knexConfig);

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

/*
//app.get("/", (req, res) => res.send("Début de l'exercice 1."));
app.get("/", (req, res) =>
  res.send("Exercice 1")
);
app.listen( 
  port,  
  () => console.log(`Exemple d'application écoutant sur le port ${port}!`) 
);
*/