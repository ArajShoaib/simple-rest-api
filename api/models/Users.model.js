const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: 'Required'
    },
    email: {
        type: String,
        required: 'Required',
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: 'Required'
    },
    is_email_verified: {
        type: Boolean,
        default: false,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
UsersSchema.index({ 'email': 'unique' });
module.exports = mongoose.model('users', UsersSchema);
