const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const PostModel = new Schema({
    content: {
        type: String,
        required: true,
        minlength: 24,
        maxlength: 280
    },
    email: {
        type: String,
        required: false,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Invalid email address'
        ]
    },
    location: {
        type: String,
        required: false
    },
    approved: {
        type: Boolean,
        default: false
    },
    categories: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: []
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = Mongoose.model('posts', PostModel);