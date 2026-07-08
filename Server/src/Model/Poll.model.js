const mongoose = require("require");

const OptionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    voters: {
        type: Number,
        default: true,
    },
});
const PollSchema = new mongoose.Schema(
    {
        questions: {
            type: String,
            required: true,
        },
        options: {
            type: [optionSchema],
            required: true,
            validator: {
                validate: (e) => e.length > 1 && e.length < 5,
                message: "A Poll Must Have Between 2 to 4 Options",
            },
        },
    },
    {
        timestamps: true,
    },
);

// module.exports={OptionSchema,PollSchema}
module.exports = mongoose.model("Poll", PollSchema);
