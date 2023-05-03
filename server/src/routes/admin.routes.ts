import express, { Request, Response } from 'express';
import { createManager } from '@controllers/manager.controller';

const adminRouter = express.Router();

adminRouter.get("", (req: Request, res: Response) => {
    res.send("working");
})

adminRouter.post("", createManager);


export default adminRouter;