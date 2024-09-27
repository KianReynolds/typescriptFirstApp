import express, {Application, Request, Response} from "express" ;

import userRoutes from './routes/users';

import dotenv from "dotenv";

import morgan from "morgan";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app: Application = express();


app.use(morgan("tiny"));
app.use(express.json());

app.use('/api/v1/users', userRoutes)


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
    
