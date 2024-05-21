import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    mobileNumber: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export default mongoose.model('User', userSchema);
