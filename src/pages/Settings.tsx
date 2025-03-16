/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChatBot from "../components/ChatBot";
import { useAuth } from "../AuthContext";
import axios from "axios";

// Styled Components
const PageWrapper = styled.div`
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  margin-top: 80px;
  flex-direction: column;
`;

const SettingsContainer = styled.div`
  max-width: 600px;
  width: 90%;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  font-family: "Inter", sans-serif;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.4rem;
  font-weight: 600;
  color: #444;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 0.9rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CheckboxLabel = styled.label`
  font-size: 1rem;
  color: #333;
`;

const BackArrow = styled.button`
  background: none;
  border: none;
  color: gray;
  font-size: 1.2rem;
  margin-bottom: 20px;
  cursor: pointer;

  &:hover {
    color: black;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-left: 10px;
  }
`;

// Main Component
const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [enable2FA, setEnable2FA] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const navigate = useNavigate();

  const { isAuthenticated, _id } = useAuth(); // Get userId from auth context

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      toast.error("Please fill in both password fields.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      setLoading(true);

      await axios.put(
        `https://standard-server.onrender.com/api/users/${_id}/update-password`,
        {
          currentPassword,
          newPassword,
        }
      );

      toast.success("Password updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setCurrentPassword("");
      setNewPassword("");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to update password.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <PageWrapper>
        <BackArrow onClick={() => navigate(-1)}>← Back</BackArrow>
        <SettingsContainer>
          <Form onSubmit={handleSaveChanges}>
            {/* Change Password */}
            <SectionTitle>Change Password</SectionTitle>
            <InputField>
              <Label>Current Password</Label>
              <Input
                type="text"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </InputField>
            <InputField>
              <Label>New Password</Label>
              <Input
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </InputField>

            {/* Security Settings */}
            <SectionTitle>Security Settings</SectionTitle>
            <CheckboxContainer>
              <input
                type="checkbox"
                checked={enable2FA}
                onChange={() => setEnable2FA(!enable2FA)}
              />
              <CheckboxLabel>
                Enable Two-Factor Authentication (2FA)
              </CheckboxLabel>
            </CheckboxContainer>

            {/* Notification Preferences */}
            <SectionTitle>Notifications</SectionTitle>
            <CheckboxContainer>
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <CheckboxLabel>Receive email notifications</CheckboxLabel>
            </CheckboxContainer>

            <Button
              type="submit"
              disabled={loading || !currentPassword || !newPassword}
            >
              {loading ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                "Save Changes"
              )}
            </Button>
          </Form>
        </SettingsContainer>
        <ToastContainer />
      </PageWrapper>
      <ChatBot />
      <Footer />
    </>
  );
};

export default Settings;
