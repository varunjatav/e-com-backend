import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    mobileNumber: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'admin' }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
