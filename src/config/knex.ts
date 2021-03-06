//import { knexSnakeCaseMappers } from 'objection'
import { config } from "dotenv";
config(); 

const connection = {
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD
};

const knexConfig = {
  client: 'pg',
  // debug: true,
  connection//,
  //...knexSnakeCaseMappers()
};

//export { knexConfig };

export default require('knex')(knexConfig);