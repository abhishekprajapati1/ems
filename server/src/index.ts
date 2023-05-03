import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import appRouter from '@routes/index';
import connect_db from './configs/connect_db';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const username: string = process.env.USER_NAME || "";
const password: string = process.env.PASSWORD || "";

app.get('/test', (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: 'Express + TypeScript Server with hot reload ⚡️' });
});

app.get("/data", (req: Request, res: Response) => {
    res.status(200).json({ success: true, data: { name: "Abhishek", age: 23, address: "Nhi Pta" } });
})


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("", appRouter);

app.listen(port, () => {
    console.log(username);
    connect_db(username, password);
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});