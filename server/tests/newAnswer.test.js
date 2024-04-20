// Unit tests for addAnswer in contoller/answer.js

const supertest = require("supertest")
const { default: mongoose } = require("mongoose");
const jwt = require('jsonwebtoken');

const Answer = require("../models/answers");
const Question = require("../models/questions");

const generateToken = () => {
  return jwt.sign({ userId: 'dummyUserId' }, 'abc');
};

// Mock the Answer model
jest.mock("../models/answers");

let server;
describe("POST /addAnswer", () => {

  beforeEach(() => {
    server = require("../server");
  })

  afterEach(async() => {
    server.close();
    await mongoose.disconnect()
  });

  it("should add a new answer to the question", async () => {
    // Mocking the request body
    const mockReqBody = {
      qid: "dummyQuestionId",
      ans: {
        text: "This is a test answer",
        ans_by: "dummyUserId",
        // ans_date_time: new Date().toISOString(), // Assuming ans_date_time is a date/time string
      },
    };

    const mockAnswer = {
      _id: "dummyAnswerId",
      text: "This is a test answer"
    }
    // Mock the create method of the Answer model
    Answer.create.mockResolvedValueOnce(mockAnswer);

    // Mocking the Question.findOneAndUpdate method
    Question.findOneAndUpdate = jest.fn().mockResolvedValueOnce({
      _id: "dummyQuestionId",
      answers: ["dummyAnswerId"]
    });

    const token = generateToken();

    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer")
      .set('Authorization', `Bearer ${token}`)
      .send(mockReqBody);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAnswer);

    // Verifying that Answer.create method was called with the correct arguments
    expect(Answer.create).toHaveBeenCalledWith({
      text: "This is a test answer",
      ans_by: "dummyUserId", // Mocked ans_by value
      // ans_date_time: expect.any(Date), // Using expect.any to match any date object
    });

    // Verifying that Question.findOneAndUpdate method was called with the correct arguments
    expect(Question.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: "dummyQuestionId" },
      { $push: { answers: { $each: ["dummyAnswerId"], $position: 0 } } },
      { new: true }
    );
  });

  it("should return 400 if request body is invalid", async () => {
    const mockReqBody = {}; // Invalid request body

    const token = generateToken();

    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer")
      .set('Authorization', `Bearer ${token}`)
      .send(mockReqBody);

    // Asserting the response
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid request body' });
  });

  it("should return 500 if server error occurs", async () => {
    // Mocking the create method of the Answer model to throw an error
    Answer.create.mockRejectedValueOnce(new Error('Database error'));

    const mockReqBody = {
      qid: "dummyQuestionId",
      ans: {
        text: "This is a test answer",
        ans_by: "dummyUserId",
        // ans_date_time: new Date().toISOString(), // Assuming ans_date_time is a date/time string
      },
    };

    const token = generateToken();

    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer")
      .set('Authorization', `Bearer ${token}`)
      .send(mockReqBody);

    // Asserting the response
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Server error' });
  });
});
