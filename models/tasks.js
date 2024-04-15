const mongoose = require("mongoose");
const db = require('../config/database').getUserDB();

const taskSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: [true, "Heading should not be empty!"],
    },
    description: {
      type: String,
      required: [true, "Description should not be empty!"],
    },
    fixed_dueDate: {
      type: Date,
      required: true,
    },
    variable_dueDate: Date,
    complete: {
      type: Boolean,
      default: false,
    },
    columnId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'column',
      default: null, 
    },
    repeat: String,
    repeatFrequency: String,
    taskExpired: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true, strict: true }
).index({ heading: 1 });

const Task = db.model("task", taskSchema);

module.exports = Task;