import { CookieOptions, Request, Response } from "express";
import createToken from "@middlewares/createToken";

import User from "@models/user.model";


export const createUser = async (req: Request, res: Response) => {
    const { name, email, password, date_of_birth, role } = req.body;

    if (!name || !email || !password || !date_of_birth || !role) {
        return res.status(401).json({ success: false, message: "Please fill each fields." });
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({ success: false, message: "An user already exists with the same email id." });
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


export const loginUser = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;

        // ensuring none of the field is empty
        if (!email || !password) {
            return res.status(401).json({ success: false, message: "Please fill each fields." });
        }

        // checking whether admin exist
        const foundUser = await User.findOne({ email: email });
        if (!foundUser) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        // check with saved password
        const isPasswordCorrect = await foundUser.checkPassword(password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        // if the password is correct then we create a token for the user
        const token = createToken({ _id: foundUser._id, email: foundUser.email, role: foundUser.role })

        // send a cookie containing the token
        res.cookie('authtoken', token, {
            expires: new Date(Date.now() + (24 * 60 * 60 * 1000)),
            httpOnly: true,
            // sameSite: "none",
            // secure: "false",
        } as CookieOptions);

        return res.status(200).json({ success: true, message: "Logged in successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error });
    }
}
