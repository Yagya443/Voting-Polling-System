const express = require("express");
const router = express.Router();

const Poll = require("../Model/Poll.model");

router.post("/polls", async (req, res) => {
    try {
        const { question, options } = req.body;

        if (!question || !options) {
            return res.status(400).json({
                message: "Question and options are required.",
            });
        }

        const poll = new Poll({
            question,
            options: options.map((option) => ({
                text: option,
            })),
            options
        });

        await poll.save();

        res.status(201).json({
            poll,
            message: "Poll created successfully.",
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/polls", async (req, res) => {
    try {
        const polls = await Poll.find().sort({ createdAt: -1 });
        res.json(polls);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post("/polls/:id/vote", async (req, res) => {
    try {
        const { optionIndex } = req.body;
        
        const poll = await Poll.findById(req.params.id);

        if(optionIndex<0 ||optionIndex>=poll.options.length){
        return res.status(500).json({ message: "Invalid Option" });

        }

        poll.options[optionIndex].voters += 1;

        poll.totalVotes += 1;

        await poll.save();

        res.status(201).json({
            poll,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/polls/:id", async (req, res) => {
    try {
        const polls = await Poll.findById(req.params.id);
        if (!polls) {
            return res
                .status(500)
                .json({ message: "No polls are found by this id" });
        }

        res.json(polls);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
module.exports = router;
