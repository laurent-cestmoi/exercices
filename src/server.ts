import express from "express";
import { config } from "dotenv";
import { knex } from 'knex';
import * as knexfile from './config/knex';

config(); 
 
const app = express(); 
const port = process.env.PORT || 3000;
const db = knex(knexfile.knexConfig);

db('issues').then(function (rows) {
  for (var r of rows) {
    //console.log('Issue:', r.nom);
    console.log(`${r.id} ${r.nom} ${r.url}`);
  }
});
 
//app.get("/", (req, res) => res.send("Début de l'exercice 1."));
app.get("/", (req, res) =>
  res.send("Exercice 1")
);
app.listen( 
  port,  
  () => console.log(`Exemple d'application écoutant sur le port ${port}!`) 
); 