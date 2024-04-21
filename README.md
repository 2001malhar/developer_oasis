[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/tekr69j1)
# Final Project CS5610

Login with your Northeastern credentials and read the project description [here](https://northeastern-my.sharepoint.com/:w:/g/personal/j_mitra_northeastern_edu/EVgJQzqalH9LlZQtMVDxz5kB7eZv2nBwIKFDFYxDMzgohg?e=EPjgIF).

## List of features

For each feature give a name and a one line description.

Clearly indicate which feature is an additional feature for extra credit.

- Feature 1: This is feature 1

## For each feature indicate the test

- Feature 1: /path/to/cypress/test

## For each server endpoint indicate the test

- Endpoint 1: /path/to/server/tests/test-file

## Instructions to generate and view coverage report 

testing\coverage\lcov-report\index.html

## Instructions for e2e tests

If while running the e2e tests there is a time where no data can be seen in the screen, please destroy the database and restart the server and run that tests again. This happens because of the limiter function which does not validate many login requests from that user. 

## Instructions for jest tests

Do not run the test files at once, please run the jest files one after the another. There are error testing which will not allow to pass tests if run all files at once.  

Also as the database error test is tested in the answer.test.js it will fail one test at 1st time but rerun it and it will pass.
This is due to error testing test.

## If user wants to run file locally.

if user wanto to run the project locally the will need to change the MONGO URL in the config.js file , and also in destroy.js file