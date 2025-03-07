/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { FaCreditCard, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ChatBot from "../components/ChatBot";

// ------------------- Styled Components -------------------

const CardsContainer = styled.div`
  padding: 1.5rem;
  background-color: white;
  margin-top: 90px;
  font-family: "Arial", sans-serif;
  min-height: 80vh;
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
`;

const CardsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CardItem = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
`;

const CardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CardIcon = styled.div`
  font-size: 2rem;
  color: #007bff;
`;

const CardText = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 1rem;
    font-weight: bold;
    color: #333;
  }

  small {
    color: #888;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: red;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: darkred;
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

// ------------------- Cards Page Component -------------------

const Cards = () => {
  const [cards, setCards] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDeleteCard = (cardId: string) => {
    setCards((prevCards) => prevCards.filter((card) => card._id !== cardId));
    toast.success("Card deleted successfully!");
  };

  return (
    <>
      <Navbar />
      <CardsContainer>
        <BackArrow onClick={() => navigate(-1)}>← Back</BackArrow>
        <Header>
          <h2>My Cards</h2>
        </Header>

        <CardsList>
          {cards.length === 0 ? (
            <p>No cards added yet.</p>
          ) : (
            cards.map((card) => (
              <CardItem key={card._id}>
                <CardInfo>
                  <CardIcon>
                    <FaCreditCard />
                  </CardIcon>
                  <CardText>
                    <span>**** **** **** {card.cardNumber.slice(-4)}</span>
                    <small>{card.cardHolder}</small>
                    <small>Exp: {card.expiryDate}</small>
                  </CardText>
                </CardInfo>
                <DeleteButton onClick={() => handleDeleteCard(card._id)}>
                  <FaTrash />
                </DeleteButton>
              </CardItem>
            ))
          )}
        </CardsList>
      </CardsContainer>
      <ChatBot />
      <Footer />

      <ToastContainer />
    </>
  );
};

export default Cards;
