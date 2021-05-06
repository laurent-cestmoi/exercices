import express from "express";
import { config } from "dotenv";
//import { knex } from 'knex';
//import * as knexfile from './config/knex';
//import knex from './config/knex';

config(); 
 
const app = express(); 
const port = process.env.PORT || 3000;
//const db = knex();

import {findAll, findById, findIdUpdatedBefore} from "./models/issue-model";

async function main(): Promise<any> {
  console.log(await findAll());
  console.log(await findById(1)); // retourne l'issue qui a son id = 1
  console.log(await findIdUpdatedBefore(new Date('2021-01-01 11:14:47.814646+02')));
}

main().catch(err => {
  console.log(err.message);
});

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