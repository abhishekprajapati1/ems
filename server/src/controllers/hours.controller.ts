import { Request, Response } from 'express';
import dayjs from 'dayjs';
import { IUserRequest } from '@middlewares/authenticate';

import Hours from "@models/hours.model";



export const getPunch = async (req: IUserRequest, res: Response) => {
    try {
        const punch = await Hours.findOne({ user_id: req.user?._id, date: dayjs().format("DD/MM/YYYY") });
        res.status(200).json({ success: true, data: punch });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error })
    }
}



export const punchIn = async (req: IUserRequest, res: Response) => {
    // return res.status(201).json({ success: true, message: "OK", data: req.user, start: dayjs().format() })

    try {
        const isPunched = await Hours.findOne({ date: dayjs().format("DD/MM/YYYY") });
        if (isPunched) return res.status(400).json({ success: false, message: "You have punched in already." });

        const punched = new Hours({
            user_id: req.user?._id,
            start: dayjs().format(),
        })

        const punchSaved = await punched.save();
        res.status(201).json({ success: true, data: punchSaved, message: "Punched in !!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong !", error });
    }
}