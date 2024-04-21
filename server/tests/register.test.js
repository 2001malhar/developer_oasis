//Unit tests for endpoint /register in controller/auth.js.

const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../server'); 
const User = require('../models/users');

jest.mock('../models/users');

describe('POST /register', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user with valid credentials', async () => {
    const requestBody = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    };
  
    User.findOne.mockResolvedValueOnce(null);
    bcrypt.hash = jest.fn().mockResolvedValueOnce('hashed_password');
  
    const newUser = new User({
      _id: '123456789',
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashed_password',
    });
  
    const saveSpy = jest.spyOn(newUser, 'save').mockResolvedValueOnce(newUser);
  
    const response = await supertest(app)
      .post('/user/register')
      .send(requestBody);
  
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(response.body).not.toHaveProperty('newUser');
  });
  

  it('should return error for invalid username', async () => {
    const requestBody = {
      username: '@testuser',
      email: 'test@example.com',
      password: 'password123'
    };
    const response = await supertest(app)
      .post('/user/register')
      .send(requestBody);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Username must contain at least one alphanumeric character');
  });

  it('should return error for invalid email format', async () => {
    const requestBody = {
      username: 'testuser',
      email: 'invalid_email_format',
      password: 'password123'
    };
    const response = await supertest(app)
      .post('/user/register')
      .send(requestBody);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid email format');
  });

  it('should return error if email already exists', async () => {
    const requestBody = {
      username: 'testuser',
      email: 'existing@example.com',
      password: 'password123'
    };
    User.findOne.mockResolvedValueOnce({ email: 'existing@example.com' });
    const response = await supertest(app)
      .post('/user/register')
      .send(requestBody);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Email already exists');
  });

});
