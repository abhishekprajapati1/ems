import express from 'express';
import userRouter from './user.routes';
import { loginUser } from '@controllers/user.controller';

const appRouter = express.Router();

appRouter.use("/user", userRouter);
appRouter.post('/login', loginUser);
// appRouter.get("", defaultRouter);

export default appRouter;