/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ChatBot from "../components/ChatBot";

const PageWrapper = styled.div`
  background: white;
  min-height: 80vh;
  padding-bottom: 2rem;
  margin-top: 100px;
`;

const TransferContainer = styled.div`
  max-width: 600px;
  margin: 20px auto 0;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-family: "Roboto", sans-serif;
`;

const CardHeader = styled.div`
  background-color: #007bff;
  color: #fff;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
`;

const HeaderText = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

const FormSection = styled.div`
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SelectInput = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: #fff;
  border: none;
  padding: 0.85rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #0056b3, #003f7f);
  }
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

/* Modal & Animation Styles */
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
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  animation: ${fadeInScale} 0.5s ease-out;
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

const BackArrow = styled.button`
  background: none;
  border: none;
  color: gray;
  font-size: 1.2rem;
  margin-left: 20px;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

// New CloseButton styled component for the PIN modal.
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

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${fadeInScale} 1s linear infinite;
  margin: 0 auto;
`;

const TransferMoney = () => {
  const { _id } = useAuth();
  const [recipient, setRecipient] = useState("");
  const [fullName, setFullName] = useState("");
  const [pendingFullName, setPendingFullName] = useState("");
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [pendingRoutingNumber, setPendingRoutingNumber] = useState("");
  const [address, setAddress] = useState("");
  const [pendingAddress, setPendingAddress] = useState("");
  const [narration, setNarration] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // State for the PIN modal
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfirmTransferModal, setShowConfirmTransferModal] =
    useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  // State for the "Confirm Receiver" modal
  const [showConfirmReceiverModal, setShowConfirmReceiverModal] =
    useState(false);

  // State for the spinner modal while transfer is initiating.
  const [isTransferring, setIsTransferring] = useState(false);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch receiver details when Standard Chartered is selected.
  const fetchReceiverDetails = async () => {
    try {
      const response = await axios.get(
        `https://standard-server.onrender.com/api/users/search?accountNumber=${recipient}`
      );
      if (response.data) {
        // Assume the API returns fullName, routingNumber, and address.
        if (response.data.fullName) {
          setPendingFullName(response.data.fullName);
        }
        if (response.data.routingNumber) {
          setPendingRoutingNumber(response.data.routingNumber);
        }
        if (response.data.address) {
          setPendingAddress(response.data.address);
        }
        setShowConfirmReceiverModal(true);
      } else {
        setPendingFullName("");
        setPendingRoutingNumber("");
        setPendingAddress("");
      }
    } catch (err) {
      console.error("Error fetching receiver details", err);
      setPendingFullName("");
      setPendingRoutingNumber("");
      setPendingAddress("");
    }
  };

  // Trigger fetching details when recipient field loses focus.
  const handleRecipientBlur = () => {
    if (bankName === "standard-chartered" && recipient) {
      fetchReceiverDetails();
    }
  };

  const handleClosePinModal = () => {
    setShowPinModal(false);
    setPinError("");
    setPin("");
  };

  // When the user confirms the receiver modal, populate the fields.
  const handleConfirmReceiver = () => {
    setFullName(pendingFullName);
    setRoutingNumber(pendingRoutingNumber);
    setAddress(pendingAddress);
    setShowConfirmReceiverModal(false);
    setPendingFullName("");
    setPendingRoutingNumber("");
    setPendingAddress("");
  };

  // Called when the user clicks "Send Money"
  const handleOpenPinModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!recipient || !amount || !bankName || !routingNumber || !address) {
      setError("Please fill in all required fields.");
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    // For non-Standard Chartered, ensure full name is provided.
    if (bankName !== "standard-chartered" && !fullName) {
      setError("Please enter the recipient's full name.");
      return;
    }
    setShowPinModal(true);
  };

  // Called when the user confirms their PIN.
  // This function now calls an endpoint to check the user pin, then shows a spinner modal.
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
      setShowConfirmTransferModal(true);
    } catch (err: any) {
      setLoading(false);
      console.error("Error verifying PIN. Try again:", err);
      setPinError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const handleTransfer = async () => {
    setShowConfirmTransferModal(false);
    setIsTransferring(true); // Show a loading state

    // Simulating a delay before initiating the transfer (e.g., 2 seconds)
    setTimeout(async () => {
      const payload = {
        userId: _id,
        type: "transfer",
        category: "debit",
        amount: parseFloat(amount),
        details: {
          accountNumber: recipient,
          fullName,
          bankName,
          routingNumber,
          address,
          narration,
        },
      };

      try {
        const response = await axios.post(
          "https://standard-server.onrender.com/api/transactions/transfer-money",
          payload
        );
        console.log(response, "RES____");
        if (response.data.status) {
          toast.success("Transfer successful!", {
            position: "top-right",
            autoClose: 3000,
          });
          setShowSuccessModal(true);
        } else {
          const message = response.data.message || "Transfer failed.";
          toast.error(message, {
            position: "top-right",
            autoClose: 3000,
          });
          setError(message);
        }
      } catch (err: any) {
        console.log("Error processing transfer. Try again:", err);
        toast.error("Error processing transfer. Try again.", {
          position: "top-right",
          autoClose: 3000,
        });
        setError("Error processing transfer. Try again.");
      } finally {
        setIsTransferring(false);
      }
    }, 2000); // 2-second delay
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);

    // Reset form state
    setRecipient("");
    setFullName("");
    setAmount("");
    setBankName("");
    setRoutingNumber("");
    setAddress("");
    setNarration("");
    setError("");
    setSuccess("");
  };

  return (
    <>
      <Navbar />
      <PageWrapper>
        <BackArrow onClick={() => navigate(-1)}>← Back</BackArrow>
        <TransferContainer>
          <CardHeader>
            <FaPaperPlane size={24} />
            <HeaderText>Transfer Funds</HeaderText>
          </CardHeader>
          <FormSection>
            {error && <Message type="error">{error}</Message>}
            {success && <Message type="success">{success}</Message>}
            <Form onSubmit={handleOpenPinModal}>
              <InputField>
                <Label htmlFor="bankName">Bank Name</Label>
                <SelectInput
                  id="bankName"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                >
                  <option value="">Select recipient Bank</option>
                  <option value="bank_of_America">Bank of America</option>
                  <option value="standard-chartered">Standard Chartered</option>
                  <option value="chase">Chase</option>
                  <option value="wells_fargo">Wells Fargo</option>
                  <option value="citi">Citi</option>
                  <option value="Other">Other</option>
                </SelectInput>
              </InputField>
              <InputField>
                <Label htmlFor="recipient">Recipient Account Number</Label>
                <Input
                  type="text"
                  id="recipient"
                  placeholder="Enter recipient's account number"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  onBlur={handleRecipientBlur}
                />
              </InputField>
              <InputField>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  type="text"
                  id="fullName"
                  placeholder="Enter recipient's full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={bankName === "standard-chartered"}
                />
              </InputField>
              <InputField>
                <Label htmlFor="routingNumber">Routing Number</Label>
                <Input
                  type="text"
                  id="routingNumber"
                  placeholder="Enter routing number"
                  value={routingNumber}
                  onChange={(e) => setRoutingNumber(e.target.value)}
                />
              </InputField>
              <InputField>
                <Label htmlFor="address">Address</Label>
                <Input
                  type="text"
                  id="address"
                  placeholder="Enter recipient address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </InputField>
              <InputField>
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  type="number"
                  id="amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  step="0.01"
                  min="0"
                />
              </InputField>
              <InputField>
                <Label htmlFor="narration">Narration (Optional)</Label>
                <Textarea
                  id="narration"
                  placeholder="Enter a note for this transfer"
                  rows={3}
                  value={narration}
                  onChange={(e) => setNarration(e.target.value)}
                />
              </InputField>
              <Button type="submit">Send Money</Button>
            </Form>
          </FormSection>
        </TransferContainer>
      </PageWrapper>
      <ToastContainer />
      <ChatBot />
      <Footer />

      {/* PIN Modal */}
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

      {/* Confirm Receiver Modal */}
      {showConfirmReceiverModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Confirm Receiver Details</ModalTitle>
            <p style={{ textAlign: "center", marginBottom: "0.5rem" }}>
              Full Name: <strong>{pendingFullName}</strong>
            </p>
            <p style={{ textAlign: "center", marginBottom: "0.5rem" }}>
              Routing Number: <strong>{pendingRoutingNumber}</strong>
            </p>
            <p style={{ textAlign: "center", marginBottom: "1rem" }}>
              Address: <strong>{pendingAddress}</strong>
            </p>
            <ModalForm
              onSubmit={(e) => {
                e.preventDefault();
                handleConfirmReceiver();
              }}
            >
              <ModalButton type="submit">Confirm Receiver</ModalButton>
              <ModalButton
                type="button"
                onClick={() => {
                  setShowConfirmReceiverModal(false);
                  setPendingFullName("");
                  setPendingRoutingNumber("");
                  setPendingAddress("");
                }}
              >
                Cancel
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
              <strong>Recipient:</strong> {fullName}
            </p>
            <p>
              <strong>Bank:</strong> {bankName}
            </p>
            <p>
              <strong>Amount:</strong> ${amount}
            </p>
            <p>
              <strong>Narration:</strong> {narration || "N/A"}
            </p>
            <ModalButton onClick={handleTransfer}>Confirm Transfer</ModalButton>
            <CloseButton onClick={() => setShowConfirmTransferModal(false)}>
              Cancel
            </CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Initiating Transfer Spinner Modal */}
      {isTransferring && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Initiating Transfer...</ModalTitle>
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
            <ModalTitle>Transfer Successful</ModalTitle>
            <p>Your transfer has been processed successfully.</p>
            <ModalButton onClick={handleCloseSuccessModal}>OK</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default TransferMoney;
