import express, { Request, Response } from 'express';
import { createUser, getUser } from '@controllers/user.controller';
import authenticate from '@middlewares/authenticate';

const userRouter = express.Router();

userRouter.get("", authenticate, getUser);

userRouter.post("", createUser);

export default userRouter;