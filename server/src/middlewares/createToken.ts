import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

interface IUser {
    _id: string,
    role: string,
    email: string
}

const createToken = (user: IUser): string => {
    const expiresIn = 24 * 60 * 60 * 1000;
    const secret: any = process.env.SECRETKEY;
    const token = jwt.sign(user, secret, { expiresIn })
    return token;
}

export default createToken;