import express, { Request, Response } from 'express';
import { createUser, logoutUser } from '@controllers/user.controller';

const userRouter = express.Router();

userRouter.get("", (req: Request, res: Response) => {
    res.send("working");
})

userRouter.post("", createUser);

export default userRouter;