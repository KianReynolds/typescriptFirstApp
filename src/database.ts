import { MongoClient, Db, Collection}  from "mongodb";
import  dotenv from "dotenv";
import User from './models/user'
import {GradeHistory} from './models/gradeHistory'

import Budget from "./models/budgetModel";


  dotenv.config();
  const connectionString : string  = process.env.DB_CONN_STRING || "";
  const dbName : string = process.env.DB_NAME || "Web2_2024";
  const client = new MongoClient(connectionString);

let db : Db 
  export let usersCollection : Collection<User>

  export let gradeHistoriesCollection : Collection<GradeHistory>

  export const collections: { users?: Collection<User> } = {};

  
  export let budgetCollection : Collection<Budget>
  export const getCollection: { budgets?: Collection<Budget> } = {};
  

client.connect().then
(()=>
  {
  db = client.db(dbName);
  usersCollection  = db.collection('users');
  collections.users = usersCollection;
  gradeHistoriesCollection = db.collection('grades')
  

  budgetCollection = db.collection('budgeting');
  getCollection.budgets = budgetCollection;

  console.log('Connected to database');
}
)
.catch ((error) => 
{
    if (error instanceof Error)
    {
     console.log(`issue with db connection ${error.message}`);
    }
    else{
      console.log(`error with ${error}`)
    }
  });
