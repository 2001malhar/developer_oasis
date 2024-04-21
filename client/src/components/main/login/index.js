import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(45deg, #4b6cb7, #182848);
`;

const LoginCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 32px;
  width: 400px;
  max-width: 90%;
  margin: 0 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
`;

const InputField = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  padding: 12px 16px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 16px;
`;

const SubmitButton = styled.button`
  background-color: #4b6cb7;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  padding: 12px 24px;
  width: 100%;
  transition: background-color 0.3s ease;
  margin-top : 10px;
  &:hover {
    background-color: #182848;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 8px;
`;

const LoginComponent = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const register = () => {
    navigate("/register");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('MAKE LOGIN REQUEST');
      const response = await fetch('http://localhost:8000/user/login', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email, password }),
      });
  


      const data = await response.json();

      if (data && data.token) {
        Cookies.set("token", data.token);
      }
  
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
  
      setToken(data.token);
      localStorage.setItem('token', data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <LoginContainer>
      <LoginCard>
        <Title>Login</Title>
        <form onSubmit={handleLogin}>
          <InputField
            type="text"
            id="loginUsername"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            id="loginPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton type="submit" onClick={handleLogin}>Log In</SubmitButton>
          <SubmitButton type="submit" onClick={register}>Register New User</SubmitButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </form>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginComponent;