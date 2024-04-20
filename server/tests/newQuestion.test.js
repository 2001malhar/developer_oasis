// unit tests for functions in controller/question.js


const supertest = require("supertest")
const { default: mongoose } = require("mongoose");
const jwt = require('jsonwebtoken');
const Question = require('../models/questions');
const { addTag, getQuestionsByOrder, filterQuestionsBySearch } = require('../utils/question');
const comments = require("../models/comments");

// Mocking the models
jest.mock("../models/questions");
jest.mock('../utils/question', () => ({
  addTag: jest.fn(),
  getQuestionsByOrder: jest.fn(),
  filterQuestionsBySearch: jest.fn(),
}));

let server;

const generateToken = () => {
  return jwt.sign({ userId: 'dummyUserId' }, 'abc');
};

const tag1 = {
  _id: '507f191e810c19729de860ea',
  name: 'tag1'
};
const tag2 = {
  _id: '65e9a5c2b26199dbcc3e6dc8',
  name: 'tag2'
};

const ans1 = {
  _id: '65e9b58910afe6e94fc6e6dc',
  text: 'Answer 1 Text',
  ans_by: 'answer1_user',
  
}

const ans2 = {
  _id: '65e9b58910afe6e94fc6e6dd',
  text: 'Answer 2 Text',
  ans_by: 'answer2_user',
  
}
const cmt = {
  _id: '65e9b58910afe6e94fc6e6ee',
  text: 'Comment text',
  comment_by: 'comment_user',
}

const mockQuestions = [
  {
      _id: '65e9b58910afe6e94fc6e6dc',
      title: 'Question 1 Title',
      text: 'Question 1 Text',
      tags: [tag1],
      answers: [ans1],
      views: 21
  },
  {
      _id: '65e9b5a995b6c7045a30d823',
      title: 'Question 2 Title',
      text: 'Question 2 Text',
      tags: [tag2],
      answers: [ans2],
      views: 99
  }
]

describe('GET /getQuestion', () => {

  beforeEach(() => {
    server = require("../server");
  })

  afterEach(async() => {
    server.close();
    await mongoose.disconnect()
  });

  it('should return questions by filter', async () => {
    // Mock request query parameters
    const mockReqQuery = {
      order: 'someOrder',
      search: 'someSearch',
    };
   
    getQuestionsByOrder.mockResolvedValueOnce(mockQuestions);
    filterQuestionsBySearch.mockReturnValueOnce(mockQuestions);

    const token = generateToken();

    // Making the request
    const response = await supertest(server)
      .get('/question/getQuestion')
      .set('Authorization', `Bearer ${token}`)
      .query(mockReqQuery);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockQuestions);
  });
});

describe('GET /getQuestionById/:qid', () => {

  beforeEach(() => {
    server = require("../server");
  })

  afterEach(async() => {
    server.close();
    await mongoose.disconnect()
  });

  it('should return a question by id and increment its views by 1', async () => {

    // Mock request parameters
    const mockReqParams = {
      qid: '65e9b5a995b6c7045a30d823',
    };

    const mockPopulatedQuestion = {
        answers: [mockQuestions.filter(q => q._id == mockReqParams.qid)[0]['answers']], // Mock answers
        views: mockQuestions[1].views + 1
    };
    
    // Provide mock question data
    Question.findOneAndUpdate = jest.fn().mockImplementation(() => ({ populate: jest.fn().mockResolvedValueOnce(mockPopulatedQuestion)}));
   
    const token = generateToken();

    // Making the request
    const response = await supertest(server)
      .get(`/question/getQuestionById/${mockReqParams.qid}`).set('Authorization', `Bearer ${token}`);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPopulatedQuestion);
  });
});

describe('POST /addQuestion', () => {

  beforeEach(() => {
    server = require("../server");
  })

  afterEach(async() => {
    server.close();
    await mongoose.disconnect()
  });

  it('should add a new question', async () => {
    // Mock request body
    const mockQuestion = {
      _id: '65e9b58910afe6e94fc6e6fe',
      title: 'Question 3 Title',
      text: 'Question 3 Text',
      asked_by: "User123",
      ask_date_time: "2024-04-17T15:20:52.624Z", // Ensure this is a string
      tags: ["tag1", "tag2"],
      answers: ["ans1"],
      comments:["cmt"],
      vote : 0,
    };
  
    // Mock addTag to return mock tags
    const mockTags = ["tag1", "tag2"]; 
    addTag.mockResolvedValueOnce(mockTags);
  
    // Mock Question.create to return a mock question
    Question.create.mockResolvedValueOnce(mockQuestion);

    const token = generateToken();
  
    // Making the request
    const response = await supertest(server)
      .post('/question/addQuestion')
      .set('Authorization', `Bearer ${token}`)
      .send(mockQuestion);
  
    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      _id: mockQuestion._id,
      title: mockQuestion.title,
      text: mockQuestion.text,
      asked_by: mockQuestion.asked_by,
      ask_date_time: mockQuestion.ask_date_time,
      tags: mockTags, // Use mockTags instead of original tags
      answers: mockQuestion.answers,
    });
  });
  
});
