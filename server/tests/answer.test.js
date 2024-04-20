const Answer = require('../models/answers');
const supertest = require('supertest');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
// import { SECRET } from '../constant';

jest.mock('../models/answers', () => {
  const mockAnswer = {
    _id: '661cb62478959d23c2d1aee4',
    text: 'dsa',
    ans_by: 'dsa',
    ans_date_time: new Date('2024-04-15T05:07:48.642Z'),
    createdAt: new Date('2024-04-15T05:07:48.722Z'),
    updatedAt: new Date('2024-04-15T06:58:57.182Z'),
    __v: 0,
    comments: [
      {
        _id: '661cd0313d0b5414bb3aa9c5',
        text: 'sa',
        comment_by: 'sa',
        commented_on: new Date('2024-04-15T06:58:57.146Z'),
        createdAt: new Date('2024-04-15T06:58:57.171Z'),
        updatedAt: new Date('2024-04-15T06:58:57.171Z'),
        __v: 0
      }
    ]
  };

  return {
    findById: jest.fn().mockImplementation(async (id) => {
      if (id === mockAnswer._id) {
        return {
          ...mockAnswer,
          populate: jest.fn().mockResolvedValueOnce(mockAnswer)
        };
      }
      return null;
    })
  };
});


const generateToken = () => {
  return jwt.sign({ userId: 'dummyUserId' },'abc');
};


beforeEach(() => {
  server = require("../server");
});

afterEach(async () => {
  server.close();
  await mongoose.disconnect();
});

describe('GET /getAnswerById/:aid', () => {

    test('should return the answer with the given ID', async () => {
      const token1 = generateToken();
      console.log(token1)
      const token = `${token1}`

      const response = await supertest(server)
      .get('/answer/getAnswerById/661cb62478959d23c2d1aee4')
      .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        _id: '661cb62478959d23c2d1aee4',
        text: 'dsa',
        ans_by: 'dsa',
        ans_date_time: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        __v: 0,
        comments: [
          {
            _id: '661cd0313d0b5414bb3aa9c5',
            text: 'sa',
            comment_by: 'sa',
            commented_on: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            __v: 0
          }
        ]
      });
      expect(Answer.findById).toHaveBeenCalledWith('661cb62478959d23c2d1aee4');
    });

  test('should return a 404 error when the answer is not found', async () => {
    Answer.findById.mockResolvedValue(null);

    const token1 = generateToken();
    console.log(token1)
    const token = `${token1}`

    const response = await supertest(server).get('/answer/getAnswerById/123456789').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Answer not found' });
    expect(Answer.findById).toHaveBeenCalledWith('123456789');
  });

  test('should return a 500 error when there is a server error', async () => {
    const token1 = generateToken();
    console.log(token1)
    const token = `${token1}`

    const mockError = new Error('Server error');
    const response = await supertest(server).get('/answer/getAnswerById/123456789').set('Authorization', `Bearer ${token}`);
  });
});
