import express from "express"; 
import { config } from "dotenv"; 
 
config(); 
 
const app = express(); 
const port = process.env.PORT || 3000; 
 
app.get("/", (req, res) => res.send("Début de l'exercice 1.")); 
 
app.listen( 
  port,  
  () => console.log(`Exemple d'application écoutant sur le port ${port}!`) 
); 