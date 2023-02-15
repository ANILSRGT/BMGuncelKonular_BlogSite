import { Schema, model } from 'mongoose';

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: false
    },
    pictureUrl: {
        type: String,
        required: false
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

export default model('Blog', schema);