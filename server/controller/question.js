const express = require("express");
const Question = require("../models/questions");
const rateLimit = require("express-rate-limit");
const { addTag, getQuestionsByOrder, filterQuestionsBySearch } = require('../utils/question');
const { authMiddleware } = require("../middleware/middleware")


const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Too many requests from this IP, please try again later."
});


function escapeHTML(input) {
  return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

const getQuestionsByFilter = async (req, res) => {
  try {
    const { search, order } = req.query;
    let questions = await getQuestionsByOrder(order || 'newest');
    if (search) {
      if (typeof search !== "string" || search.trim() === "") {
        return res.status(400).json({ error: "Invalid search query" });
      }
      else {
        const sanitizedText = escapeHTML(search);
        questions = await filterQuestionsBySearch(questions, sanitizedText);
      }
    }

    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

router.get('/getQuestion', limiter,authMiddleware, getQuestionsByFilter)


const getQuestionById = async (req, res) => {
  const questionId = req.params.qid;

  const sanitizedQid = questionId.replace(/[^\w\s]/gi, '');

  try {
    const question = await Question.findOneAndUpdate(
      { _id: sanitizedQid },
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate({
        path: 'answers',
        select: 'text ans_by ans_date_time',
      })

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json(question);
  } catch (err) {
    console.error('Error fetching question:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

router.get('/getQuestionById/:qid', limiter,authMiddleware, getQuestionById)

const addQuestion = async (req, res) => {
  try {
    const { _id, title, text, asked_by, ask_date_time, tags, answers } = req.body;

    // Sanitize HTML inputs
    const sanitizeTitle = escapeHTML(title);
    const sanitizeText = escapeHTML(text);
    const sanitizeAskedBy = escapeHTML(asked_by);
    const sanitizeTags = tags.map(tag => escapeHTML(tag));

    const tagIds = await Promise.all(sanitizeTags.map(addTag));

    const newQuestion = await Question.create({
      _id,
      title: sanitizeTitle,
      text: sanitizeText,
      asked_by: sanitizeAskedBy,
      ask_date_time,
      tags: tagIds,
      answers,
    });

    res.status(200).json({
      _id: newQuestion._id,
      title: sanitizeTitle,
      text: sanitizeText,
      asked_by: sanitizeAskedBy,
      ask_date_time,
      tags: tags,
      answers: newQuestion.answers,
    });
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

router.post('/addQuestion', limiter,authMiddleware, addQuestion);

const getQuestionByIdComment = async (req, res) => {
  const questionId = req.params.qid;

  const sanitizedQid = questionId.replace(/[^\w\s]/gi, '');
  try {
    const question = await Question.findOneAndUpdate(
      { _id: sanitizedQid },
      { $inc: { views: 1 } },
      { new: true }
    ).populate({
        path: 'comments',
        select: 'text comment_by commented_on',
      })
      .catch((err) => {
        console.error('Error populating comments:', err);
        throw err;
      });
  

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json(question);
  } catch (err) {
    console.error('Error fetching question:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

router.get('/getQuestionByIdComment/:qid', limiter,authMiddleware ,getQuestionByIdComment)


module.exports = router;