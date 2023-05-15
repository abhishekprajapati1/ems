import { Schema, model, Document } from 'mongoose';
import dayjs from 'dayjs';

interface IHours {
    date: string,
    start_time: string,
    end_time: string,
    user_id: string,
    total_hours: number,
    start: string,
    end: string
}

const hoursSchema = new Schema<IHours>({
    date: {
        type: String,
        required: true,
        default: dayjs().format("DD/MM/YYYY"),
    },
    start: {
        type: String,
    },
    end: {
        type: String,
    },
    user_id: { type: String, required: true },
    total_hours: { type: Number }
});

const Hours = model<IHours>('hour', hoursSchema);
export default Hours;