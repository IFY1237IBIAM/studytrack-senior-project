import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        role: {
            type: String,
            enum: ['student', 'teacher'],
            default: 'student',
        },
        status: {
            type: String,
            enum: ['active', 'disabled'],
            default: 'active',
        },
        lastLogin: {
            type: Date,
            default: Date.now,
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('User', userSchema);
