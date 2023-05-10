import express from 'express';
import userRouter from './user.routes';
import { loginUser, logoutUser } from '@controllers/user.controller';
import authenticate from '@middlewares/authenticate';

const appRouter = express.Router();

appRouter.use("/user", userRouter);
appRouter.post('/login', loginUser);
appRouter.get("/logout", authenticate, logoutUser);

export default appRouter;