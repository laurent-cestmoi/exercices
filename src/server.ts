import { PORT } from './config/config'
import express from "express"

// Import et initialisation de Knex.js
import Knex from "knex"
import knexFile from "./config/knexfile"
const knex = Knex(knexFile.development)

// Import de la calsse Model de Objection.js
import { Model } from "objection";

// On lie les modèles Objection à l'instance Knex
Model.knex(knex)
 
const app = express()
const port = PORT || 3000

import {findAll, findById, findIdUpdatedBefore} from "./api/issues";

async function main(): Promise<any> {
  console.log(await findAll());
  console.log(await findById(1)); // retourne l'issue qui a son id = 1
  // console.log(await findIdUpdatedBefore(new Date('2021-01-01 11:14:47.814646+02')));
}

// main().catch(err => {
//   console.log(err.message);
// });

main().finally(() => {
  process.exit()
});


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