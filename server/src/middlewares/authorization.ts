import { Request, Response, NextFunction } from "express";

interface IAuthUserRequest extends Request {
    user: {
        _id: string,
        role: string,
        email: string,
    }
}

function authorize(permittedRoles: Array<string>) {
    return function (req: IAuthUserRequest, res: Response, next: NextFunction) {
        // first get the user from the req
        const user = req.user;

        // check if user has any of the permittedRoles
        let isPermitted = permittedRoles.includes(user.role);

        // if not then throw an error
        if (!isPermitted) {
            return res.status(403).json({ success: false, message: "Permission denied !!" });
        }
        // if yes then return next
        return next();
    };
};


export default authorize;