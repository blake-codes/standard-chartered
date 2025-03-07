/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import styled, { keyframes } from "styled-components";
import {
  FaMoneyCheckAlt,
  FaExchangeAlt,
  FaCog,
  FaEye,
  FaCreditCard,
  FaEyeSlash,
  FaFileAlt,
  FaHandHoldingUsd,
} from "react-icons/fa";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatBot from "../components/ChatBot";

// ------------------- Styled Components -------------------

const DashboardContainer = styled.div`
  padding: 1.5rem;
  background-color: white;
  margin-top: 90px;
  font-family: "Arial", sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    margin: 0;
    font-size: 1.8rem;
    color: #333;
  }

  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 0.7rem 1.4rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background: #0056b3;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const BalanceOverview = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  div {
    text-align: left;
  }

  h3 {
    margin: 0 0 0.5rem 0;
    color: #555;
  }

  h1 {
    margin: 0;
    color: #007bff;
  }

  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 0.8rem 1.2rem;
    border-radius: 8px;
    font-size: 0.9rem;
    cursor: pointer;

    &:hover {
      background: #0056b3;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const EyeIcon = styled.div`
  font-size: 1.5rem;
  color: #007bff;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
`;

const QuickActions = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 2rem 0;

  button {
    background: white;
    color: #007bff;
    border: 1px solid #007bff;
    padding: 1rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1 1 calc(50% - 1rem);
    margin: 0.5rem;
    cursor: pointer;

    &:hover {
      background: #e7f1ff;
    }

    @media (max-width: 480px) {
      flex: 1 1 100%;
    }
  }
`;

const TransactionSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  h3 {
    margin-bottom: 1rem;
  }

  .history-link {
    text-align: right;
    margin-top: 1rem;

    a {
      color: #007bff;
      text-decoration: none;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

/* Redesigned Transaction List Styles */
const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

const TransactionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TransactionIcon = styled.div`
  background-color: #f0f0f0;
  border-radius: 50%;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TransactionText = styled.div`
  display: flex;
  flex-direction: column;
`;

const TransactionTypeText = styled.span`
  font-weight: bold;
  color: #333;
`;

const TransactionDetail = styled.span`
  font-size: 0.8rem;
  color: #888;
`;

const TransactionDateText = styled.span`
  font-size: 0.8rem;
  color: #888;
`;

const TransactionAmount = styled.span<{ category: string }>`
  font-weight: bold;
  color: ${(props) => (props.category === "credit" ? "green" : "red")};
`;

const Promotions = styled.div`
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  padding: 2rem;
  border-radius: 10px;
  color: white;
  margin-top: 2rem;
  text-align: center;

  h3 {
    margin-bottom: 1rem;
  }

  button {
    background: white;
    color: #2575fc;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background: #f2f2f2;
    }
  }
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
  margin-left: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ModalButton = styled.button`
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

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ModalMessage = styled.p<{ type?: "error" | "success" }>`
  text-align: center;
  color: ${(props) => (props.type === "error" ? "red" : "green")};
`;

// ------------------- Dashboard Component -------------------

const Dashboard = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [pinSuccess, setPinSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { _id, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Fetch user data when the page loads
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://standard-server.onrender.com/api/users/${_id}`
        );
        setUser(response.data);

        // If the user's PIN is not set, open the modal
        if (!response.data.pin) {
          setTimeout(() => {
            setShowModal(true);
          }, 3000);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `https://standard-server.onrender.com/api/users/transactions/${_id}`
        );
        // Show only the 5 most recent transactions
        setTransactions(response.data.reverse().slice(0, 5));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchUser();
    fetchTransactions();
  }, [_id]);

  const handleViewAccountDetails = () => {
    navigate(`/account/${_id}`);
  };

  const handleViewTransactionHistory = () => {
    navigate(`/transactions/${_id}`);
  };

  const handleViewAccountSettings = () => {
    navigate(`/settings`);
  };

  const handleViewBankCards = () => {
    navigate(`/cards`);
  };

  const handleViewLoans = () => {
    navigate(`/loan-services`);
  };

  const handleViewTransferPage = () => {
    navigate(`/transfer`);
  };
  const handleViewPayBillsPage = () => {
    navigate(`/pay-bills`);
  };

  const handleSetPin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPinError("");
    setPinSuccess("");

    // Ensure both fields are filled
    if (!newPin || !confirmPin) {
      setPinError("Please enter and confirm your new PIN.");
      return;
    }
    // Validate that both are exactly 4 digits and numeric
    if (!/^\d{4}$/.test(newPin)) {
      setPinError("PIN must be 4 numbers.");
      return;
    }
    if (newPin !== confirmPin) {
      setPinError("PINs do not match. Please try again.");
      return;
    }

    try {
      setIsLoading(true);
      // Update the user profile with the new PIN
      const payload = { pin: newPin };
      const response = await axios.put(
        `https://standard-server.onrender.com/api/users/${_id}`,
        payload
      );

      if (response.data) {
        toast.success("Your PIN has been set successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setShowModal(false);
        setUser({ ...user, pin: newPin });
      }
    } catch (err: any) {
      console.error("Error setting PIN:", err);
      setPinError("Failed to set PIN. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <DashboardContainer>
        <Header>
          <h4>
            Hi,{" "}
            <span style={{ marginLeft: "5px", textTransform: "capitalize" }}>
              {user ? user.firstName : "Loading.."}
            </span>
          </h4>
          <button onClick={handleViewAccountDetails}>
            View Account Details
          </button>
        </Header>

        <BalanceOverview>
          <div>
            <h3>Total Balance</h3>
            <h1>
              {isBalanceVisible
                ? `$${new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(user?.balance ?? 0.0)}`
                : "*****"}
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <EyeIcon onClick={() => setIsBalanceVisible(!isBalanceVisible)}>
              {isBalanceVisible ? <FaEyeSlash /> : <FaEye />}
            </EyeIcon>
          </div>
        </BalanceOverview>

        <QuickActions>
          <button onClick={handleViewTransferPage}>
            <FaExchangeAlt />
            Transfer Money
          </button>
          <button onClick={handleViewPayBillsPage}>
            <FaMoneyCheckAlt />
            Pay Bills
          </button>
          <button onClick={handleViewTransactionHistory}>
            <FaFileAlt />
            Transaction History
          </button>
          <button onClick={handleViewBankCards}>
            <FaCreditCard />
            Bank Cards
          </button>
          <button onClick={handleViewLoans}>
            <FaHandHoldingUsd />
            Loan Services
          </button>
          <button onClick={handleViewAccountSettings}>
            <FaCog />
            Account Settings
          </button>
        </QuickActions>
        <TransactionSection>
          <h3>Recent Transactions</h3>
          {isLoading ? (
            <Loader />
          ) : transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionItem key={transaction.id}>
                <TransactionInfo>
                  <TransactionIcon>
                    <FaMoneyCheckAlt />
                  </TransactionIcon>
                  <TransactionText>
                    <TransactionTypeText>
                      {transaction.type}
                    </TransactionTypeText>
                    <TransactionDetail>
                      {transaction.type === "bill"
                        ? "For"
                        : transaction.category === "credit"
                        ? "From"
                        : transaction.category === "debit"
                        ? "To"
                        : " "}{" "}
                      {transaction.details.fullName ||
                        transaction.details.sender ||
                        transaction.details.merchant ||
                        transaction.details.billType ||
                        "N/A"}
                    </TransactionDetail>
                    <TransactionDateText>
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </TransactionDateText>
                  </TransactionText>
                </TransactionInfo>
                <TransactionAmount category={transaction.category}>
                  {transaction.category === "credit" ? "+" : "-"}$
                  {Number(transaction.amount).toFixed(2)}
                </TransactionAmount>
              </TransactionItem>
            ))
          ) : (
            <p>No transactions available</p>
          )}
          <div className="history-link">
            <Link to={`/transactions/${user ? user._id : _id}`}>
              View All Transactions
            </Link>
          </div>
        </TransactionSection>

        <Promotions>
          <h3>Special Offers</h3>
          <p>Refer a friend and earn $50 for each successful referral!</p>
          <button>Get Started</button>
        </Promotions>
      </DashboardContainer>
      <ChatBot />
      <Footer />
      <ToastContainer />

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Set Your PIN</ModalTitle>
            <p
              style={{
                textAlign: "center",
                color: "#555",
                marginBottom: "1rem",
              }}
            >
              For enhanced security, please set your 4-digit account PIN.
            </p>
            {pinError && <ModalMessage type="error">{pinError}</ModalMessage>}
            {pinSuccess && (
              <ModalMessage type="success">{pinSuccess}</ModalMessage>
            )}
            <ModalForm onSubmit={handleSetPin}>
              <div>
                <label
                  htmlFor="newPin"
                  style={{ color: "#555", fontWeight: 500 }}
                >
                  New PIN
                </label>
                <ModalInput
                  type="password"
                  id="newPin"
                  placeholder="Enter 4-digit PIN"
                  value={newPin}
                  maxLength={4}
                  inputMode="numeric"
                  onChange={(e) => setNewPin(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPin"
                  style={{ color: "#555", fontWeight: 500 }}
                >
                  Confirm PIN
                </label>
                <ModalInput
                  type="password"
                  id="confirmPin"
                  placeholder="Confirm 4-digit PIN"
                  value={confirmPin}
                  maxLength={4}
                  inputMode="numeric"
                  onChange={(e) => setConfirmPin(e.target.value)}
                />
              </div>
              <ModalButton type="submit" disabled={isLoading}>
                {isLoading ? <Loader /> : "Set PIN"}
              </ModalButton>
            </ModalForm>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Dashboard;
