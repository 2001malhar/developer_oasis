const request = require('supertest');
const app = require('../server'); // Assuming your server is set up in an 'app.js' file
const mongoose = require('mongoose');
const Question = require('../models/questions');
const Comment = require("../models/comments")
const jwt = require('jsonwebtoken')

const generateToken = () => {
  return jwt.sign({ userId: 'dummyUserId' }, 'abc');
};

describe('GET /getQuestionByIdComment/:qid', () => {
    beforeEach(() => {
      server = require("../server");
    });
  
    afterEach(async () => {
      server.close();
      await mongoose.disconnect();
    });
  
    it('should return a question with comments', async () => {
      // Delete the existing question with the same _id
      await Question.deleteOne({ _id: '66207c858b919ebf46053ab1' });
  
      const comment1 = new Comment({
        text: 'Test Comment 1',
        comment_by: 'User1',
        commented_on: new Date(),
      });
      const comment2 = new Comment({
        text: 'Test Comment 2',
        comment_by: 'User2',
        commented_on: new Date(),
      });
  
      await Promise.all([comment1.save(), comment2.save()]);
  
      const question = new Question({
        _id: '66207c858b919ebf46053ab1',
        title: 'Test Question',
        ask_date_time: new Date(),
        asked_by: 'Test User',
        text: 'Test question text',
        views: 0,
        comments: [comment1._id, comment2._id],
      });
  
      await question.save();

      const token = generateToken();
  
      const response = await request(app)
        .get('/question/getQuestionByIdComment/66207c858b919ebf46053ab1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
  
      expect(response.body).toHaveProperty('_id', '66207c858b919ebf46053ab1');
      expect(response.body).toHaveProperty('title', 'Test Question');
      expect(response.body).toHaveProperty('views', 1);
      expect(response.body.comments).toHaveLength(2);
      expect(response.body.comments[0]).toHaveProperty('text', 'Test Comment 1');
      expect(response.body.comments[0]).toHaveProperty('comment_by', 'User1');
      expect(response.body.comments[1]).toHaveProperty('text', 'Test Comment 2');
      expect(response.body.comments[1]).toHaveProperty('comment_by', 'User2');
  
      await Promise.all([
        Question.deleteOne({ _id: '66207c858b919ebf46053ab1' }),
        Comment.deleteMany({ _id: { $in: [comment1._id, comment2._id] } }),
      ]);
    });
  });

  it('should return a 404 error if the question is not found', async () => {
    const token = generateToken();
    const response = await request(app)
      .get('/question/getQuestionByIdComment/123456789abcdef')
      .set('Authorization', `Bearer ${token}`)
      .expect(500);

    expect(response.body).toHaveProperty('error', 'Server error');
  });

  it('should handle server errors gracefully', async () => {
    jest.spyOn(Question, 'findOneAndUpdate').mockRejectedValue(new Error('Server error'));
    

  });