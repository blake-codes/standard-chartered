import { useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ChatBot from "../components/ChatBot";

const LoanContainer = styled.div`
  padding: 2rem;
  background-color: white;
  margin-top: 90px;
  font-family: "Arial", sans-serif;
  min-height: 80vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 2rem;
    color: #333;
  }
`;

const LoanOptions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const LoanCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 280px;
  text-align: center;
  border: 2px solid transparent;
  transition: 0.3s;

  &:hover {
    border-color: #007bff;
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  p {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 1rem;
  }
`;

const ApplyButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
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
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    font-size: 1rem;
    color: #666;
  }

  button {
    margin-top: 1rem;
    padding: 0.6rem 1.2rem;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
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

// ---------------- Mock Loan Data ----------------

const loanOptions = [
  {
    id: "1",
    name: "Personal Loan",
    description: "Quick loans for personal expenses with low interest rates.",
  },
  {
    id: "2",
    name: "Business Loan",
    description:
      "Funding for small and medium businesses with flexible repayment.",
  },
  {
    id: "3",
    name: "Education Loan",
    description: "Affordable student loans for college and university tuition.",
  },
  {
    id: "4",
    name: "Home Loan",
    description: "Finance your dream home with competitive rates.",
  },
];

// ---------------- Loan Services Component ----------------

const LoanServices = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleApply = () => {
    setShowModal(true);
  };

  return (
    <>
      <Navbar />
      <LoanContainer>
        <BackArrow onClick={() => navigate(-1)}>← Back</BackArrow>
        <Header>
          <h2>Loan Services</h2>
        </Header>

        <LoanOptions>
          {loanOptions.map((loan) => (
            <LoanCard key={loan.id}>
              <h3>{loan.name}</h3>
              <p>{loan.description}</p>
              <ApplyButton onClick={() => handleApply()}>Apply Now</ApplyButton>
            </LoanCard>
          ))}
        </LoanOptions>

        {showModal && (
          <ModalOverlay>
            <ModalContent>
              <h3>Loan Eligibility Requirement</h3>
              <p>
                Your account must have been open and active for at least 3
                months to apply for a loan.
              </p>
              <button onClick={() => setShowModal(false)}>OK</button>
            </ModalContent>
          </ModalOverlay>
        )}
      </LoanContainer>
      <ChatBot />
      <Footer />
    </>
  );
};

export default LoanServices;
