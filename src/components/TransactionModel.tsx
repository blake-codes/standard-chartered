import React, { useState } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Transaction {
  _id?: string;
  type: string;
  category: "debit" | "credit";
  amount: number;
  status: "completed" | "pending" | "failed";
  transactionDate?: string;
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

interface TransactionModalProps {
  onClose: () => void;
  mode: "add" | "edit";
  transaction?: Transaction;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  onClose,
  mode,
  transaction,
}) => {
  const [formData, setFormData] = useState<Transaction>(
    transaction || {
      type: "",
      category: "debit",
      amount: 0,
      status: "pending",
      transactionDate: "",
      details: {
        fullName: "",
        sender: "",
        merchant: "",
        billType: "",
        accountNumber: "",
        bankName: "",
        routingNumber: "",
        address: "",
        narration: "",
      },
    }
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name in formData.details) {
      setFormData((prev) => ({
        ...prev,
        details: {
          ...prev.details,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "amount" ? parseFloat(value) || 0 : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = mode === "add" ? "POST" : "PUT";
      const endpoint =
        mode === "add"
          ? "https://standard-server.onrender.com/api/transactions"
          : `https://standard-server.onrender.com/api/transactions`; // Use edit endpoint

      // Construct request body
      const payload =
        mode === "add"
          ? formData
          : { transactionId: transaction?._id, updates: formData };

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to save transaction");
      toast.success("Transaction updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        onClose(); // Close the modal
      }, 3000);
      setTimeout(() => {
        window.location.reload(); // Reload the page
      }, 3100);
    } catch (error) {
      toast.error("Error updating transaction", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error(error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h3>{mode === "add" ? "Add Transaction" : "Edit Transaction"}</h3>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Type:</Label>
            <Select name="type" value={formData.type} onChange={handleChange}>
              <option value="transfer">Transfer</option>
              <option value="bill">Bill Payment</option>
            </Select>
          </InputGroup>

          <InputGroup>
            <Label>Category:</Label>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </Select>
          </InputGroup>

          <InputGroup>
            <Label>Amount:</Label>
            <Input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </InputGroup>

          {formData.type === "transfer" && (
            <>
              <InputGroup>
                <Label>Account Number:</Label>
                <Input
                  type="text"
                  name="accountNumber"
                  value={formData.details.accountNumber || ""}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <Label>Full Name:</Label>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.details.fullName || ""}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <Label>Bank Name:</Label>
                <Input
                  type="text"
                  name="bankName"
                  value={formData.details.bankName || ""}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <Label>Routing Number:</Label>
                <Input
                  type="text"
                  name="routingNumber"
                  value={formData.details.routingNumber || ""}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <Label>Address:</Label>
                <Input
                  type="text"
                  name="address"
                  value={formData.details.address || ""}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <Label>Narration:</Label>
                <TextArea
                  name="narration"
                  value={formData.details.narration || ""}
                  onChange={handleChange}
                />
              </InputGroup>
            </>
          )}

          <InputGroup>
            <Label>Transaction Date:</Label>
            <Input
              type="date"
              name="transactionDate"
              value={formData.transactionDate || ""}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <Label>Status:</Label>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </Select>
          </InputGroup>

          <ButtonGroup>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : mode === "add" ? "Add" : "Update"}{" "}
              Transaction
            </Button>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
          </ButtonGroup>
        </Form>
        <ToastContainer />
      </ModalContent>
    </ModalOverlay>
  );
};

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 25px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const CloseButton = styled.span`
  font-size: 24px;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background: green;
  color: white;
  padding: 10px;
`;

const CancelButton = styled(Button)`
  background: red;
`;

export default TransactionModal;
