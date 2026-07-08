const express = require("express");
const router = express.Router();

const Poll = require("../Model/Poll.model");

router.get("/polls", async (req, res) => {
    try {
        const polls = await Poll.find().toSorted(-1);
        res.json(polls)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
