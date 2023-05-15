import express, { Request, Response } from 'express';
import { getPunch, punchIn } from '@controllers/hours.controller';
import authenticate from '@middlewares/authenticate';

const punchRouter = express.Router();
punchRouter.use(authenticate)
punchRouter.get("", getPunch);
punchRouter.get("/in", punchIn);

export default punchRouter;