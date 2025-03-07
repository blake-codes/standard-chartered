import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";
import TransactionModal from "../components/TransactionModel";

// Define the Transaction type
interface Transaction {
  _id: string;
  type: string;
  category: "debit" | "credit";
  amount: number;
  status: "completed" | "pending" | "failed";
  createdAt: string; // Keep for reference
  transactionDate?: string; // Allow users to specify a date
  details: {
    fullName?: string;
    sender?: string;
    merchant?: string;
    billType?: string;
    accountNumber?: string;
    bankName?: string;
    routingNumber?: string;
    address?: string;
    narration?: string;
  };
}

const Transactions: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { username } = useAuth();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [transactionToEdit, setTransactionToEdit] =
    useState<Transaction | null>(null);

  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://standard-server.onrender.com/api/users/transactions/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust auth method as needed
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();

        setTransactions(data || []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleEditTransaction = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
    setShowEditModal(true);
  };
  return (
    <>
      <Navbar />
      <Container>
        <BackArrow onClick={() => navigate(-1)}>← Back</BackArrow>

        <Title>Transaction History</Title>

        {loading ? (
          <Message>Loading transactions...</Message>
        ) : error ? (
          <Message style={{ color: "red" }}>{error}</Message>
        ) : !transactions || transactions.length === 0 ? (
          <Message>No transactions found.</Message>
        ) : (
          <TransactionList>
            {transactions
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((transaction) => (
                <TransactionItem
                  key={transaction._id}
                  category={transaction.category}
                >
                  <Left>
                    <TransactionType>
                      {transaction.type.toUpperCase()}{" "}
                    </TransactionType>
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

                    <TransactionDate>
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </TransactionDate>
                    <TransactionStatus status={transaction.status}>
                      {transaction.status}
                    </TransactionStatus>
                  </Left>
                  <Right>
                    <Amount category={transaction.category}>
                      {transaction.category === "credit" ? "+" : "-"}$
                      {transaction.amount}
                    </Amount>
                    <ViewButton
                      onClick={() => setSelectedTransaction(transaction)}
                    >
                      View Details
                    </ViewButton>
                    {username === "admin" && (
                      <EditButton
                        onClick={() => handleEditTransaction(transaction)}
                      >
                        Edit
                      </EditButton>
                    )}
                  </Right>
                </TransactionItem>
              ))}
          </TransactionList>
        )}
      </Container>

      {/* Edit Transaction Modal */}
      {showEditModal && transactionToEdit && (
        <TransactionModal
          onClose={() => setShowEditModal(false)}
          mode="edit"
          transaction={transactionToEdit}
        />
      )}
      {selectedTransaction && (
        <ModalOverlay onClick={() => setSelectedTransaction(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>Transaction Details</h3>
            <p>
              <strong>Type:</strong> {selectedTransaction.type}
            </p>
            <p>
              <strong>Amount:</strong> ${selectedTransaction.amount}
            </p>
            <p>
              <strong>Status:</strong> {selectedTransaction.status}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedTransaction.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Details:</strong>
            </p>
            <ul>
              {Object.entries(selectedTransaction.details).map(
                ([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                )
              )}
            </ul>
            <CloseButton onClick={() => setSelectedTransaction(null)}>
              Close
            </CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

// Styled Components
const Container = styled.div`
  padding: 2rem 3rem;
  background-color: white;
  font-family: "Arial", sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 10px;
  margin-top: 90px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;
const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const TransactionList = styled.div`
  margin-top: 10px;
`;
const BackArrow = styled.button`
  background: none;
  border: none;
  color: gray;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;
const TransactionItem = styled.div<{ category: "debit" | "credit" }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 15px;
  margin: 10px 0;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-left: 6px solid
    ${({ category }) => (category === "credit" ? "#28a745" : "#dc3545")};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  }
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TransactionType = styled.div`
  font-weight: 600;
  text-transform: capitalize;
  color: #444;
  font-size: 16px;
`;
const TransactionDetail = styled.div`
  color: #666;
  font-size: 14px;
`;

const TransactionDate = styled.div`
  font-size: 13px;
  color: #888;
`;
const TransactionStatus = styled.div<{
  status: "completed" | "pending" | "failed";
}>`
  font-size: 12px;
  font-weight: bold;
  text-transform: capitalize;
  padding: 3px 8px;
  border-radius: 5px;
  width: fit-content;

  background-color: ${({ status }) =>
    status === "completed"
      ? "#28a74533"
      : status === "pending"
      ? "#ffc10733"
      : "#dc354533"};
  color: ${({ status }) =>
    status === "completed"
      ? "#28a745"
      : status === "pending"
      ? "#ffc107"
      : "#dc3545"};
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Amount = styled.div<{ category: "debit" | "credit" }>`
  font-size: 18px;
  font-weight: bold;
  color: ${({ category }) => (category === "credit" ? "#28a745" : "#dc3545")};
`;

const Message = styled.p`
  text-align: center;
  color: #777;
`;

const ViewButton = styled.button`
  margin-top: 8px;
  padding: 8px 14px;
  border: none;
  background: #007bff;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: #0056b3;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
`;
const CloseButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background: red;
  color: white;
  border: none;
  cursor: pointer;
`;

const EditButton = styled.button`
  margin-top: 5px;
  padding: 6px 10px;
  background: #ff9800;
  color: white;
  border: none;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: #e68900;
    transform: scale(1.05);
  }
`;

export default Transactions;
