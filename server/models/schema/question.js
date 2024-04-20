const mongoose = require("mongoose");

module.exports = mongoose.Schema(
    {
        title: { type: String, required: true },
        text: { type: String, required: true },
        asked_by: { type: String, required: true },
        ask_date_time: { type: Date, required: true },
        views: { type: Number, default: 0 },
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true }], 
        answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'fake_so' }],
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
        vote : { type : Number , default : 0}
    },
    { timestamps: true }
);
