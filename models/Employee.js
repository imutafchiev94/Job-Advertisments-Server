const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  }, email: {
    type: String,
    required: true,
    validate:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  }, passwordHash: {
    type: String,
    required: true,
  }, jobAdvertisments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobAdvertisment",
    },
  ], likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
  ], createdAt: {
    type: Date,
    default: new Date(Date.now()).toUTCString(),
  },  updatedAt: {
    type: Date,
    required: false,
  }, updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  }, deletedAt: {
    type: Date,
    required: false,
  }, deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
