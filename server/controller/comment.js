const express = require("express");
const Comment =  require("../models/comments");
const rateLimit = require('express-rate-limit');
const router = express.Router();
const Question = require("../models/questions");
const Answer = require("../models/answers")
const { authMiddleware } = require("../middleware/middleware")

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
  });

function escapeHTML(input) {
    return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}  

const addComment = async (req, res) => {
    try {
      console.log(req.body)
      const { qid, comment } = req.body;
  
      if (!qid || !comment || !comment.text || !comment.comment_by) {
        return res.status(400).json({ error: 'Invalid request body' });
      }
  
      const sanitizedText = escapeHTML(comment.text);
      console.log(sanitizedText);
      const sanitizedAnsBy = escapeHTML(comment.comment_by);
  
      const newComment = await Comment.create({
        text: sanitizedText,
        comment_by: sanitizedAnsBy,
        commented_on: comment.commented_on,
      });
  
      const updatedComment = await Question.findOneAndUpdate(
        { _id: qid },
        { $push: { comments: { $each: [newComment._id], $position: 0 } } },
        { new: true }
      );
  
      console.log(updatedComment);
      res.status(200).json(newComment);
    } catch (err) {
      console.error('Error adding answer:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  router.post('/addComment', limiter,authMiddleware, addComment);

  const addCommentOnAnswer = async (req, res) => {
    try {
      console.log(req.body)
      const { aid, comment } = req.body;
  
      if (!aid || !comment || !comment.text || !comment.comment_by) {
        return res.status(400).json({ error: 'Invalid request body' });
      }
  
      const sanitizedText = escapeHTML(comment.text);
      console.log(sanitizedText);
      const sanitizedAnsBy = escapeHTML(comment.comment_by);
  
      const newComment = await Comment.create({
        text: sanitizedText,
        comment_by: sanitizedAnsBy,
        commented_on: comment.commented_on,
      });
  
      const updatedComment = await Answer.findOneAndUpdate(
        { _id: aid },
        { $push: { comments: { $each: [newComment._id], $position: 0 } } },
        { new: true }
      );
  
      console.log(updatedComment);
      res.status(200).json(newComment);
    } catch (err) {
      console.error('Error adding answer:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  router.post('/addCommentOnAnswer', limiter,authMiddleware, addCommentOnAnswer);

  
module.exports = router;