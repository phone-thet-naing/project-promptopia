import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    id: {
        type: String,
        required: [true, "Id is required"],
        unique: true,
    },
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!']
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/, 'Invalid username, it should contain 8-20 alphanumeric characters and be unique!']
    },
    image: {
        type: String,
        requried: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = models.User || model('User', UserSchema)

export default User 