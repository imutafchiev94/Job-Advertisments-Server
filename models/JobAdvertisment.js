const mongoose = require('mongoose');

const JobAdvertismentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
    }, description: {
        type: String,
        required: true,
        minlength: 25
    }, likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like"
    }, kind: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobAdvertismentKind'
    }, category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobAdvertismentCategory'
    }, createdAt: {
        type: Date,
        default: new Date(Date.now()).toUTCString(),
    }, createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
    }, updatedAt: {
        type: Date,
        required: false
    }, updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
    }, deletedAt: {
        type: Date,
        required: false
    }, 
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
    } 
})

module.exports = mongoose.model("JobAdvertisment", JobAdvertismentSchema);