import express, {Application, Request, Response} from "express" ;
import userRoutes from './routes/users';
import morgan from "morgan";
import dotenv from "dotenv";
import { Db} from 'mongodb';
import budgetRoutes from './routes/budgetRoutes'
import {authenticateKey} from './middleware/auth.middleware';
import cors from "cors";
import handleLoginRoutes from './routes/auth';


dotenv.config();

import gradeHistoriesRoutes from './routes/gradeHistories'
import { handleLogin } from "./controllers/authBudget";
import { validJWTProvided } from "./middleware/auth.middleware";
// import { isAdmin, validJWTProvided } from "./middleware/auth.middleware";


const PORT = process.env.PORT || 3000;

const app: Application = express();


app.use(morgan("tiny"));

app.use(express.json());

app.use(cors());

app.use('/api/v1/users',  userRoutes)

app.use('/api/v1/gradeHistories', gradeHistoriesRoutes)

app.use('/api/v1/budget', budgetRoutes)

app.use('/api/v1/auth', handleLoginRoutes)



// app.get("/admin", validJWTProvided, isAdmin, (req: Request, res: Response) => {
//   res.json({ message: "Welcome, admin! You have access to this route." });
// });

app.get("/ping", async (_req : Request, res: Response) => {
    res.send({
    message: "hello from Una",
    });
});
app.get('/bananas', async (_req : Request, res: Response) =>
  res.send('hello world, this is bananas'));



 app.listen(PORT, () => {
    console.log("Server is running on port  --", PORT);
    });
    
