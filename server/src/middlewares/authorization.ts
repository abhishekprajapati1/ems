import { Request, Response, NextFunction } from "express";


function authorize(permittedRoles: Array<string>) {
    return function (req: Request, res: Response, next: NextFunction) {
        // first get the user from the req
        const user = req.user;

        // check if user has any of the permittedRoles
        let isPermitted = false;
        permittedRoles.map((role) => {

            if (user.roles.includes(role)) {
                isPermitted = true;
            }
        });

        // if not then throw an error
        if (!isPermitted) {
            return res.status(403).send({ message: "Permission denied" });
        }
        // if yes then return next
        return next();
    };
};


export default authorize;