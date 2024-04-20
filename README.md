[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/tekr69j1)
# Final Project CS5610

Login with your Northeastern credentials and read the project description [here](https://northeastern-my.sharepoint.com/:w:/g/personal/j_mitra_northeastern_edu/EVgJQzqalH9LlZQtMVDxz5kB7eZv2nBwIKFDFYxDMzgohg?e=EPjgIF).

## List of features

Feature 1: Ask questions
This feature allows user to ask a question on the website which will be displayed on the questions page.

Feature 2: provide answers
This feature allows user to answer a question which will be displayed on the answers page of the question.

Feature 3: Search for posts.
This feature allows user to search for a post based on a text, title and tag of the question.

Feature 4: Tag posts.
This feature has the total number of questions of a particular tag which is displayed on the tags page of the webiste.

Feature 5: Authenticate registered users.
This feature is authentication of a user. This feature allows registering and logging in a user. This feature also checks if the credentials during login are valid or not.

Feature 6: Comment on questions and answers.
This feature allows users to post comments on a question or an answer.

Additional Features.

Sorting of the Questions:
The Questions are sorted based on the newest question, active question, unanswered questions, 
Also they are sorted based on number of comments and number of views.

## For each feature indicate the test

- Feature 1: testing\cypress\e2e\addQuestion.cy.js

- Feature 2: testing\cypress\e2e\newAnswer.cy.js

- Feature 3: testing\cypress\e2e\search.cy.js

- Feature 4: testing\cypress\e2e\tags.cy.js

- Feature 5: testing\cypress\e2e\login.cy.js

- Feature 6: testing\cypress\e2e\comment.cy.js

Additional Features:

-Sorting : testing\cypress\e2e\sorting.cy.js (contains views and comments)

## For each server endpoint indicate the test

NOTE : Please run the tests one file after the other for example run answer.test.js then run login.test.js
       This will pass all tests otherwise some tests will fail due to server.

- /addAnswer : server\tests\newAnswer.test.js

- /getAnswerById/:qid : server\tests\answer.test.js

- /login : server\tests\login.test.js

- /register : server\tests\register.test.js

- /addComment : server\tests\newComment.test.js => (describe("POST /addComment))

- /addCommentOnAnswer : server\tests\newComment.test.js => (describe("POST /addCommentOnAnswer"))

- /getQuestion : server\tests\question.test.js 

- /getQuestionById/:qid : server\tests\question.test.js 

- /getQuestionByIdComment/:qid : server\tests\question2.test.js

- /addQuestion : server\tests\newQuestion.test.js

- /getTagsWithQuestionNumber : server\tests\tags.test.js

Additional Feature: 
- server\tests\question.test.js => (line number 212 & 224)

## Instructions to generate and view coverage report 

Coverage report : server\coverage\lcov-report\index.html