const mongoose = require("mongoose");

module.exports = mongoose.Schema(
    {
        text: { type: String, required: true },
        comment_by: { type: String },
        commented_on: { type: Date },
    },
    { timestamps: true }
);