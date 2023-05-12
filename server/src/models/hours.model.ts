import { Schema, model, Document } from 'mongoose';

interface IHours {
    date: string,
    start_time: string,
    end_time: string,
    user_id: string,
    total_hours: number,
}

const hoursSchema = new Schema<IHours>({
    date: {
        type: String,
        required: true,
        default: new Date(Date.now()).toLocaleDateString(),
    },
    start_time: {
        type: String,
        required: true,
    },
    end_time: { type: String },
    user_id: { type: String, required: true },
    total_hours: { type: Number }
});

const Hours = model<IHours>('hour', hoursSchema);
export default Hours;