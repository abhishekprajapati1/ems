import express from 'express';

const adminRouter = express.Router();

adminRouter.get("", (req, res) => {
    res.send("working");
})


export default adminRouter;