import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useAuth } from "../AuthContext";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  min-height: 100vh;
  padding: 40px 20px;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 100px auto;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (max-width: 768px) {
    margin-top: 80px;
    padding: 25px;
  }
`;

const StyledForm = styled.form`
  width: 100%;
  text-align: center;

  h2 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 16px;
  position: relative;
  text-align: left;

  label {
    font-size: 14px;
    font-weight: 500;
    color: #555;
    margin-bottom: 6px;
    display: block;
  }

  input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    transition: all 0.3s ease;
    box-sizing: border-box; /* Ensures padding doesn't affect width */

    &:focus {
      border-color: #4caf50;
      box-shadow: 0 0 5px rgba(76, 175, 80, 0.2);
      outline: none;
    }
  }
`;

const PasswordInputWrapper = styled.div`
  position: relative;

  input {
    padding-right: 40px;
  }

  button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #888;
    font-size: 18px;
    transition: color 0.3s ease;

    &:hover {
      color: #333;
    }
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #388e3c;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  background: #ffefef;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 10px;
  text-align: center;
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://standard-server.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      localStorage.setItem("token", data.token || "");
      localStorage.setItem("username", data.username || "");
      localStorage.setItem("userId", data._id || "");
      login(data.token || "", data._id || "", data.username || "");

      navigate(data.username === "admin" ? "/accounts" : "/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <FormContainer>
          <StyledForm onSubmit={handleLogin}>
            <h2>Sign In</h2>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <InputGroup>
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup>
              <label>Password</label>
              <PasswordInputWrapper>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </PasswordInputWrapper>
            </InputGroup>

            <Button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </StyledForm>
        </FormContainer>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
