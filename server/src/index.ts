import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import appRouter from '@routes/index';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/test', (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: 'Express + TypeScript Server with hot reload ⚡️' });
});

app.get("/data", (req: Request, res: Response) => {
    res.status(200).json({ success: true, data: { name: "Abhishek", age: 23, address: "Nhi Pta" } });
})

app.use("", appRouter)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});