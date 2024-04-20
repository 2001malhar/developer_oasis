const supertest = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = require('../server');
const User = require('../models/users');

jest.mock('..//models/users');

describe('POST /login', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

it('should login with valid credentials', async () => {
    const userData = {
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 10),
      username: 'testuser',
      id: '123456789'
    };
    User.findOne.mockResolvedValueOnce(userData);
    bcrypt.compare = jest.fn().mockResolvedValueOnce(true); // Updated line
    jwt.sign = jest.fn().mockImplementationOnce(() => 'mocked_token'); // Updated line

    const response = await supertest(app)
      .post('/user/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ token: 'mocked_token', message: 'Login Successful' });
});



  it('should return "User not found" for invalid email', async () => {
    User.findOne.mockResolvedValueOnce(null);

    const response = await supertest(app)
      .post('/user/login')
      .send({ email: 'invalid@example.com', password: 'password123' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'User not found' });
  });

  it('should return "Invalid credentials" with invalid password', async () => {
    // Mock User.findOne to return a user with valid email but invalid password
    const userData = {
      email: 'test@example.com',
      password: await bcrypt.hash('password456', 10), // Hash the password
      username: 'testuser',
      id: '123456789'
    };
    User.findOne.mockResolvedValueOnce(userData);

    // Mock bcrypt.compare to return false
    bcrypt.compare = jest.fn().mockResolvedValueOnce(false);

    // Send a login request with invalid password
    const response = await supertest(app)
      .post('/user/login')
      .send({ email: 'test@example.com', password: 'invalidpassword' });

    // Assertions
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Invalid credentials' });
  });
});
