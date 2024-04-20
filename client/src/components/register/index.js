import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const RegistrationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(45deg, #4b6cb7, #182848);
`;

const RegistrationCard = styled.div`
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

  &:hover {
    background-color: #182848;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 8px;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 14px;
  margin-top: 8px;
`;

const RegisterComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
  
      setSuccess(true);
      setUsername('');
      setPassword('');
      setEmail('');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <RegistrationContainer>
      <RegistrationCard>
        <Title>New User</Title>
        <form onSubmit={handleRegister}>
          <InputField
            type="text"
            id = "formUsername"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            type="email"
            id = "formEmail"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            id = "formPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton type="submit" onClick={handleRegister}>Register</SubmitButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage >Registration successful!</SuccessMessage>}
        </form>
      </RegistrationCard>
    </RegistrationContainer>
  );
};

export default RegisterComponent;
