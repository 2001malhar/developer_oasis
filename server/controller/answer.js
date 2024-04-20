const express = require("express");
const Answer = require("../models/answers");
const Question = require("../models/questions");
const rateLimit = require('express-rate-limit');
const router = express.Router();
const { authMiddleware } = require("../middleware/middleware")

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});

function escapeHTML(input) {
  return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

const addAnswer = async (req, res) => {
  try {
    console.log(req.body)
    const { qid, ans } = req.body;

    if (!qid || !ans || !ans.text || !ans.ans_by) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const sanitizedText = escapeHTML(ans.text);
    console.log(sanitizedText);
    const sanitizedAnsBy = escapeHTML(ans.ans_by);

    const newAnswer = await Answer.create({
      text: sanitizedText,
      ans_by: sanitizedAnsBy,
      ans_date_time: ans.ans_date_time,
    });

    const updatedQuestion = await Question.findOneAndUpdate(
      { _id: qid },
      { $push: { answers: { $each: [newAnswer._id], $position: 0 } } },
      { new: true }
    );

    console.log(updatedQuestion);
    res.status(200).json(newAnswer);
  } catch (err) {
    console.error('Error adding answer:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

router.post('/addAnswer', limiter,authMiddleware, addAnswer);

const getAnswerById = async (req, res) => {
  const answerId = req.params.qid;
  console.log(answerId)
  const sanitizedAid = answerId.replace(/[^\w\s]/gi, '');
  console.log(sanitizedAid)
  try {
    const answer = await Answer.findById(sanitizedAid)
    console.log(answer)
    
    if (!answer) {
      return res.status(404).json({ error: 'Answer not found' });
    }

    await answer.populate('comments');
    console.log(answer)

    res.json(answer);
  } catch (err) {
    console.error('Error fetching question:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


router.get('/getAnswerById/:qid', limiter,authMiddleware, getAnswerById);


module.exports = router;
