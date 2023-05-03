import { Request, Response } from "express";
import User from "@models/user.model";

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password, date_of_birth, role } = req.body;

    if (!name || !email || !password || !date_of_birth || !role) {
        return res.status(401).json({ msg: "Please fill each fields." });
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({ msg: "An user already exists with the same email id." });
        }

        // finaly create a user instance
        const user = new User({
            name: name,
            email: email,
            password: password,
            date_of_birth: date_of_birth,
            role: role
        });

        // Now before saving the data in database we need to hash the password see usermodel.
        await user.save(); // that's it.
        res.status(201).json({ success: true, message: "Registration Successfull" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
}

