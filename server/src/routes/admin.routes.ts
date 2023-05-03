import express, { Request, Response } from 'express';

const adminRouter = express.Router();

adminRouter.get("", (req: Request, res: Response) => {
    res.send("working");
})


export default adminRouter;