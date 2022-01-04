const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    jobAdvertisment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobAdvertisment'
    }, employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    }, createdAt: {
        type: Date,
        default: new Date(Date.now()).toUTCString()
    }, createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    }, updatedAt: {
        type: Date,
        required: false
    }, updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    }, deletedAt: {
        type: Date,
        required: false
    }, deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    }
})

module.exports = mongoose.model("Like", LikeSchema);