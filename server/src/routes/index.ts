import express from 'express';
import adminRouter from './admin.routes';

const appRouter = express.Router();

appRouter.use("/admin", adminRouter);
// appRouter.get("", defaultRouter);

export default appRouter;