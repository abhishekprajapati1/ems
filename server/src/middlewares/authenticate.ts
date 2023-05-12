import { Request, Response, NextFunction } from 'express';
import env from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';

env.config();

const verifyToken = (token: string): Promise<{}> => {
    const secret: Secret = process.env.SECRETKEY || "";
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, user) => {
            if (err) return reject(err);
            resolve(<any>user);
        });
    });
};


export interface IUserRequest extends Request {
    user?: {
        _id?: string,
        email?: string,
        role?: string,
    },
}

const authenticate = async (req: IUserRequest, res: Response, next: NextFunction) => {
    let token = req.cookies.authtoken;

    if (!token) {
        return res.status(400).send({ success: false, message: "Access Denied ! Login to continue." });
    }

    let user;

    try {
        user = await verifyToken(token);
    } catch (error) {
        return res.status(400).send({ msg: "Authorization token was not provided or was invalid." });
    }

    // now we put the user retrieved from the token in req.user.
    req.user = user;

    // return the control to route
    next();
}


export default authenticate;