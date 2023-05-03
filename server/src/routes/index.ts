import express from 'express';
import adminRouter from './user.routes';

const appRouter = express.Router();

appRouter.use("/user", adminRouter);
// appRouter.get("", defaultRouter);

export default appRouter;