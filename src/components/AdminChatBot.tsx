/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaHeadset, FaTimes, FaUserShield } from "react-icons/fa";
import io from "socket.io-client";

const ChatWindow = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  max-width: 90%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  height: 400px;
  z-index: 10;
  animation: ${({ isOpen }) => (isOpen ? "fadeIn 0.3s" : "fadeOut 0.3s")};

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(20px);
    }
  }

  @media (max-width: 600px) {
    bottom: 10px;
    right: 10px;
    width: 90%;
    height: 70%;
    padding: 5px;
  }
`;

const Header = styled.div`
  background-color: #4caf50;
  color: white;
  padding: 15px;
  text-align: center;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

const Loader = styled.div`
  margin: 20px auto;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4caf50;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const HeaderUserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
`;

const MessageContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin: 10px 0;
  padding: 5px;
  border-radius: 5px;
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  background-color: ${({ isUser }) => (isUser ? "#a9caec" : "#f1f1f1")};
  color: ${({ isUser }) => (isUser ? "black" : "black")};
  border-radius: 20px;
  padding: 10px;
  max-width: 80%;
  margin: 5px 0;
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  word-wrap: break-word;
  @media (max-width: 600px) {
    padding: 8px;
    max-width: 90%;
    font-size: 12px;
  }
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ccc;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-right: 10px;
  font-size: 14px;
  transition: border-color 0.3s;
  @media (max-width: 600px) {
    font-size: 12px;
    padding: 8px;
  }
`;

const SendButton = styled.button`
  padding: 12px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #539c55;
  }
  @media (max-width: 600px) {
    padding: 10px 12px;
    font-size: 16px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

// ChatBot Component
const AdminChatBot: React.FC<{
  sessionId: string;
  isOpen: boolean;
  toggleChat: () => void;
}> = ({ sessionId, isOpen, toggleChat }) => {
  const [messages, setMessages] = useState<
    { text: string; id: string; isUser: boolean }[]
  >([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(true);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const socket = useRef<any>(null);

  useEffect(() => {
    socket.current = io("https://standard-server.onrender.com");

    socket.current.on(
      "receiveMessage",
      (data: { id: string; message: string; isUser: boolean }) => {
        setMessages((prev) => {
          // Prevent duplicate messages
          if (prev.some((msg) => msg.id === data.id)) {
            return prev;
          }
          return [
            ...prev,
            { id: data.id, text: data.message, isUser: data.isUser },
          ];
        });
      }
    );
    fetchChatHistory();
    return () => {
      socket.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);
  // Fetch Chat History
  const fetchChatHistory = () => {
    axios
      .get(`https://standard-server.onrender.com/api/chat/history/${sessionId}`)
      .then((response) => {
        setMessages(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          response.data.messages.map((msg: any) => ({
            text: msg.message,
            isUser: msg.isUser,
          }))
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching chat history:", error);
        setLoading(false);
      });
  };

  // Handle Sending Message
  const handleSendMessage = () => {
    if (userInput.trim()) {
      const newMessage = {
        message: userInput,
        id: Date.now().toString(),
        sender: "admin",
        isUser: false,
        sessionId,
      };
      setMessages((prev) => [
        ...prev,
        { text: userInput, id: newMessage.id, isUser: false },
      ]);
      socket.current.emit("sendMessage", newMessage);

      setUserInput("");
    }
  };

  // Handle Key Down for Enter Key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div>
      <ChatWindow isOpen={isOpen}>
        <Header>
          <HeaderUserInfo>
            <FaUserShield />
            <UserName>Admin</UserName>
          </HeaderUserInfo>
          <CloseButton onClick={toggleChat}>
            <FaTimes />
          </CloseButton>
        </Header>
        <MessageContainer ref={messageContainerRef}>
          {loading ? ( // Show loader while fetching chat history
            <Loader />
          ) : (
            messages.map((msg, index) => (
              <MessageBubble key={index} isUser={msg.isUser}>
                {!msg.isUser && (
                  <span
                    style={{
                      marginRight: "8px",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <FaHeadset color="#4caf50" />
                  </span>
                )}
                {msg.text}
              </MessageBubble>
            ))
          )}
        </MessageContainer>
        <InputArea>
          <InputField
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />
          <SendButton onClick={handleSendMessage}>→</SendButton>
        </InputArea>
      </ChatWindow>
    </div>
  );
};

export default AdminChatBot;
