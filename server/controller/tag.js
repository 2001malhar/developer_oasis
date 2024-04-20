const express = require("express");
const Tag = require("../models/tags");
const Question = require("../models/questions");
const rateLimit = require('express-rate-limit');
const { authMiddleware } = require("../middleware/middleware")
const router = express.Router();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
  });

const getTagsWithQuestionNumber = async (req, res) => {
    try {
        const tagMap = new Map();

        const tags = await Tag.find({});
        for (const tag of tags) {
            const { name } = tag;
            if (!tagMap.has(name)) {
                tagMap.set(name, { qcnt: 0 });
            }
        }

        const questions = await Question.find({}).populate('tags');
        for (const question of questions) {
            for (const tag of question.tags) {
                const { name } = tag;
                if (tagMap.has(name)) {
                    tagMap.get(name).qcnt++;
                }
            }
        }

        const tagsWithQuestionNumber = Array.from(tagMap.entries()).map(([name, { qcnt }]) => ({ name, qcnt }));
        res.json(tagsWithQuestionNumber);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


router.get('/getTagsWithQuestionNumber',limiter,authMiddleware, getTagsWithQuestionNumber);

module.exports = router;