/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle } from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChatBot from "../components/ChatBot";

// Styled Components
const PageWrapper = styled.div`
  background: #f9fafb;

  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem; /* Adjusted padding */
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1.5rem; /* Reduce padding for small screens */
  }
`;

const PayBillsContainer = styled.div`
  max-width: 500px;
  width: 90%; /* Makes it more responsive */
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  font-family: "Inter", sans-serif;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    max-width: 100%;
  }
`;

const CardHeader = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: clamp(1.2rem, 4vw, 1.8rem); /* Responsive font size */
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

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.6rem;
  }
`;

const SelectInput = styled.select`
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

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.7rem;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: -0.8rem;
`;

const fadeInScale = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: ${fadeInScale} 0.5s ease-out;
`;

const ModalContent = styled.div`
  position: relative;
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  animation: ${fadeInScale} 0.5s ease-out;

  @media (max-width: 480px) {
    padding: 1.5rem;
    width: 95%;
  }
`;

const ModalTitle = styled.h3`
  margin-top: 0;
  text-align: center;
  color: #333;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ModalInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ModalButton = styled(Button)`
  margin-top: 1rem;
`;
const CloseButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const Message = styled.div<{ type?: "error" | "success" }>`
  text-align: center;
  padding: 0.75rem;
  border-radius: 8px;
  color: ${(props) => (props.type === "error" ? "#d93025" : "#0f9d58")};
  background-color: ${(props) =>
    props.type === "error" ? "#fce8e6" : "#e6f4ea"};
  font-size: 0.95rem;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${fadeInScale} 1s linear infinite;
  margin: 0 auto;
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
const PayBills = () => {
  const { _id } = useAuth();
  const [billType, setBillType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [showConfirmTransferModal, setShowConfirmTransferModal] =
    useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // State for the spinner modal while transfer is initiating.
  const [isTransferring, setIsTransferring] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOpenPinModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!billType || !accountNumber || !amount) {
      setError("Please fill in all required fields.");
      return;
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Amount must be a positive number.");
      return;
    }
    if (!/^\d+$/.test(accountNumber)) {
      setError("Account number must be numeric.");
      return;
    }
    setShowPinModal(true);
  };

  const handleBillPayment = async () => {
    setError("");
    setShowConfirmTransferModal(false);
    setIsTransferring(true);

    setTimeout(async () => {
      try {
        const response = await axios.post(
          `https://standard-server.onrender.com/api/transactions/pay-bill`,
          {
            userId: _id,
            billType,
            billDetails: {
              accountNumber,
              billType,
            },
            accountNumber,
            amount,
          }
        );
        if (response.data.status) {
          toast.success("Bill payment successful!", {
            position: "top-right",
            autoClose: 3000,
          });
          setShowSuccessModal(true);
          setBillType("");
          setAccountNumber("");
          setAmount("");
        } else {
          const message = response.data.message || "Transfer failed.";
          toast.error(message, {
            position: "top-right",
            autoClose: 3000,
          });
          setError(message);
        }
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Payment failed. Try again."
        );
      } finally {
        setIsTransferring(false);
      }
    }, 2000);
  };

  const handleClosePinModal = () => {
    setShowPinModal(false);
    setPinError("");
    setPin("");
  };

  const handleConfirmPin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setPinError("");
    if (!/^\d{4}$/.test(pin)) {
      setPinError("PIN must be exactly 4 digits.");
      return;
    }
    try {
      // Call the check-pin endpoint.
      const checkResponse = await axios.post(
        "https://standard-server.onrender.com/api/users/check-pin",
        {
          sender: _id?.toString(),
          providedPin: pin,
        }
      );
      if (!checkResponse.data.success) {
        setPinError(checkResponse.data.message || "Incorrect PIN");
        return;
      }
      setShowPinModal(false);
      setPin("");
      setShowConfirmTransferModal(true);
    } catch (err: any) {
      setLoading(false);
      setPin("");
      console.error("Error verifying PIN. Try again:", err);
      setPinError(err.response.data.message);
    } finally {
      setLoading(false);
      setPin("");
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);

    // Reset form state
    setBillType("");
    setAccountNumber("");
    setAmount("");
    setError("");
  };

  return (
    <>
      <Navbar />
      <PageWrapper>
        <BackArrow onClick={() => navigate(-1)}>← Back</BackArrow>
        <PayBillsContainer>
          <CardHeader>Pay Your Bills</CardHeader>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Form onSubmit={handleOpenPinModal}>
            <InputField>
              <Label>Select Bill Type</Label>
              <SelectInput
                value={billType}
                onChange={(e) => setBillType(e.target.value)}
              >
                <option value="">Choose a bill</option>
                <option value="electricity">Electricity</option>
                <option value="water">Water</option>
                <option value="internet">Internet</option>
                <option value="phone">Phone</option>
              </SelectInput>
            </InputField>

            <InputField>
              <Label>Account Number</Label>
              <Input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </InputField>

            <InputField>
              <Label>Amount($)</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
              />
            </InputField>

            <Button type="submit" disabled={loading}>
              {loading ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                "Pay Now"
              )}
            </Button>
          </Form>
        </PayBillsContainer>
      </PageWrapper>
      <ChatBot />
      <Footer />

      {showPinModal && (
        <ModalOverlay>
          <ModalContent>
            {/* Close Button */}
            <CloseButton onClick={handleClosePinModal}>×</CloseButton>
            <ModalTitle>Enter Your PIN</ModalTitle>
            {pinError && <Message type="error">{pinError}</Message>}
            <ModalForm onSubmit={handleConfirmPin}>
              <InputField>
                <Label htmlFor="pin">4-Digit PIN</Label>
                <ModalInput
                  type="password"
                  id="pin"
                  placeholder="Enter PIN"
                  value={pin}
                  maxLength={4}
                  inputMode="numeric"
                  onChange={(e) => setPin(e.target.value)}
                />
              </InputField>
              <ModalButton disabled={loading} type="submit">
                {" "}
                {loading ? "Checking..." : "Confirm PIN"}
              </ModalButton>
            </ModalForm>
          </ModalContent>
        </ModalOverlay>
      )}
      {showConfirmTransferModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Confirm Transfer</ModalTitle>
            <p>
              <strong>Bill Type:</strong> {billType}
            </p>
            <p>
              <strong>Account Number:</strong> {accountNumber}
            </p>
            <p>
              <strong>Amount:</strong> ${amount}
            </p>
            <ModalButton onClick={handleBillPayment}>
              Confirm Payment
            </ModalButton>
            <CloseButton onClick={() => setShowConfirmTransferModal(false)}>
              Cancel
            </CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {isTransferring && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Initiating Bill Payment...</ModalTitle>
            <Spinner />
          </ModalContent>
        </ModalOverlay>
      )}

      {showSuccessModal && (
        <ModalOverlay>
          <ModalContent>
            <FaCheckCircle
              size={80}
              color="green"
              style={{ display: "block", margin: "0 auto" }}
            />
            <ModalTitle>Bill Payment Successful</ModalTitle>
            <p>Your bill payment has been processed successfully.</p>
            <ModalButton onClick={handleCloseSuccessModal}>OK</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
      <ToastContainer />
    </>
  );
};

export default PayBills;
