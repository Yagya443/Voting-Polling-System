const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    voters: {
        type: Number,
        default: 0,
    },
    totalVotes: {
        type: Number,
        default: 0,
    },
});
const PollSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },
        options: {
            type: [OptionSchema],
            required: true,
            validate: {
                validator: (e) => e.length > 1 && e.length < 5,
                message: "A Poll Must Have Between 2 to 4 Options",
            },
        },
    },
    {
        timestamps: true,
    },
);
module.exports = mongoose.model("Poll", PollSchema);
