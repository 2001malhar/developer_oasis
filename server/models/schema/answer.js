const mongoose = require("mongoose");

module.exports = mongoose.Schema(
    {
        text: { type: String, required: true },
        ans_by: { type: String, required: true },
        ans_date_time: { type: Date, required: true },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
        // comments : [{type : mongoose.Schema.Types.ObjectId, ref : 'Comment'}]
    },
    { timestamps: true }
);
