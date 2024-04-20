const supertest = require("supertest");
const mongoose = require("mongoose");

const Comment = require("../models/comments");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const jwt = require('jsonwebtoken');

// Mock the Comment model
jest.mock("../models/comments");

const generateToken = () => {
    return jwt.sign({ userId: 'dummyUserId' }, 'abc');
  };
  

describe("POST /addComment", () => {
    beforeEach(() => {
        server = require("../server");
    });

    afterEach(async () => {
        server.close();
        await mongoose.disconnect();
    });

    it("should add a new comment to the question", async () => {
        // Mocking the request body
        const mockReqBody = {
            qid: "dummyQuestionId",
            comment: {
                text: "This is a test comment",
                comment_by: "dummyUserId",
                //commented_on: new Date().toISOString(), // Assuming commented_on is a date/time string
            },
        };

        const mockComment = {
            _id: "dummyCommentId",
            text: "This is a test comment",
        };

        // Mock the create method of the Comment model
        Comment.create.mockResolvedValueOnce(mockComment);

        // Mocking the Question.findOneAndUpdate method
        Question.findOneAndUpdate = jest.fn().mockResolvedValueOnce({
            _id: "dummyQuestionId",
            comments: ["dummyCommentId"],
        });

        const token = generateToken();

        // Making the request to the correct endpoint
        const response = await supertest(server)
            .post("/comments/addComment")
            .set('Authorization', `Bearer ${token}`)
            .send(mockReqBody);

        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockComment);

        // Verifying that Comment.create method was called with the correct arguments
        expect(Comment.create).toHaveBeenCalledWith({
            text: "This is a test comment",
            comment_by: "dummyUserId",
            //commented_on: expect.any(Date), // Using expect.any to match any date object
        });

        // Verifying that Question.findOneAndUpdate method was called with the correct arguments
        expect(Question.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: "dummyQuestionId" },
            { $push: { comments: { $each: ["dummyCommentId"], $position: 0 } } },
            { new: true }
        );
    });
});


jest.mock("../models/comments");


describe("POST /addCommentOnAnswer", () => {
    beforeEach(() => {
        server = require("../server");
    });

    afterEach(async () => {
        server.close();
        await mongoose.disconnect();
    });

    it("should add a new comment to the answer", async () => {
        // Mocking the request body
        const mockReqBody = {
            aid: "dummyAnswerId",
            comment: {
                text: "This is a test comment",
                comment_by: "dummyUserId",
                // commented_on: new Date().toISOString(),
            },
        };

        const mockComment = {
            _id: "dummyCommentId",
            text: "This is a test comment",
        };

        // Mock the create method of the Comment model
        Comment.create.mockResolvedValueOnce(mockComment);

        // Mocking the findOneAndUpdate method of the Answer model
        Answer.findOneAndUpdate = jest.fn().mockResolvedValueOnce({
            _id: "dummyAnswerId",
            comments: ["dummyCommentId"],
        });

        const token = generateToken();

        // Making the request
        const response = await supertest(server)
            .post("/comments/addCommentOnAnswer")
            .set('Authorization', `Bearer ${token}`)
            .send(mockReqBody);

        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockComment);

        // Verifying that Comment.create method was called with the correct arguments
        expect(Comment.create).toHaveBeenCalledWith({
            text: "This is a test comment",
            comment_by: "dummyUserId",
            // commented_on: expect.any(Date), // Using expect.any to match any date object
        });

        // Verifying that Answer.findOneAndUpdate method was called with the correct arguments
        expect(Answer.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: "dummyAnswerId" },
            { $push: { comments: { $each: ["dummyCommentId"], $position: 0 } } },
            { new: true }
        );
    });
});