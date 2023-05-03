import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

interface IUser {
    name: string,
    email: string,
    password: string,
    date_of_birth: string,
    role: string,
}


const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        date_of_birth: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        }
    }
);



// we need to has the password before saving it in database
// we cannot use arrow function here as we cannot use a lexical function inside an standard function.
UserSchema.pre("save", async function (next) {
    // if the password field is already hashed we simply return the control to the save method of singup controller
    if (!this.isModified("password")) {
        return next();
    }

    // else we do hashing
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
});

// Here we create a model method checkPassword which will be used to compare the password at login time.
UserSchema.methods.checkPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}

const User = model<IUser>('user', UserSchema);
export default User;