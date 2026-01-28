import mongoose from 'mongoose';

const taskSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: [true, 'Please add a text value'],
        },
        status: {
            type: String,
            enum: ['To-Do', 'In Progress', 'Completed'],
            default: 'To-Do',
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Task', taskSchema);
