import express from 'express';
import userRouter from './user.routes';
import punchRouter from './punch.routes';
import { loginUser, logoutUser } from '@controllers/user.controller';
import { getPunch } from '@controllers/hours.controller';
import authenticate from '@middlewares/authenticate';

const appRouter = express.Router();

appRouter.use("/user", userRouter);
appRouter.post('/login', loginUser);
appRouter.get("/logout", authenticate, logoutUser);
appRouter.use('/punch', punchRouter);

export default appRouter;