const mongoose = require("mongoose");
const db = require('../config/database').getUserDB();

const columnSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name should not be empty!"],
    },
    inbuilt: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, strict: true }
).index({ name: 1 });

const Column = db.model("column", columnSchema);

module.exports = Column;
