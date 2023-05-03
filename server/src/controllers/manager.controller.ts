import { Request, Response } from "express";
import Manager from "@models/manager.model";

export const createManager = async (req: Request, res: Response) => {
    const { name, email, password, date_of_birth } = req.body;

    if (!name || !email || !password || !date_of_birth) {
        return res.status(401).json({ msg: "Please fill each fields." });
    }

    try {
        const managerExist = await Manager.findOne({ email: email });
        if (managerExist) {
            return res.status(400).json({ msg: "An user already exists with the same email id." });
        }

        // finaly create a user instance
        const manager = new Manager({
            name: name,
            email: email,
            password: password,
            date_of_birth: date_of_birth
        });

        // Now before saving the data in database we need to hash the password see usermodel.
        await manager.save(); // that's it.
        res.status(201).json({ success: true, message: "Registration Successfull" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
}