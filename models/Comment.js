import { Schema, model } from 'mongoose';

const schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    blogId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: false
    }
});

export default model('Comment', schema);