import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../AuthContext";
import AdminChatBot from "../components/AdminChatBot";
import { useNavigate } from "react-router-dom";

const BaseContainer = styled.div`
  background: #f4f7fc;
  min-height: 100vh;
  padding: 20px;
  margin-top: 60px;
  font-family: "Roboto", sans-serif;
  color: #333;
`;

const MessagesContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const MessagesTitle = styled.h1`
  font-size: 1.8rem;
  color: #222;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  background-color: #f2f2f2;
  font-weight: bold;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f5f9;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

interface LatestMessage {
  sender: string;
  message: string;
  timestamp: string;
}

interface ChatSummary {
  sessionId: string;
  chatUser: string;
  isActive: boolean;
  createdAt: string;
  latestMessage: LatestMessage | null;
}

const Messages = () => {
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { username } = useAuth();
  const chatBotRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login page if not authenticated
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(
          "https://standard-server.onrender.com/api/chat/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch chats");
        }
        const data = await response.json();
        setChats(data.chats); // Adjusted to match `chats` from the backend
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, [username]);

  const handleChatClick = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setIsOpen(true); // Set isOpen to true when the button is clicked
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <BaseContainer>
        <MessagesContainer>
          <MessagesTitle>Chat Sessions</MessagesTitle>
          {chats.length === 0 ? (
            <p>No chat yet.</p>
          ) : (
            <Table>
              <thead>
                <tr>
                  <TableHeader>Chat User</TableHeader>
                  <TableHeader>Created At</TableHeader>
                  <TableHeader>Latest Message</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>
              <tbody>
                {chats.map((chat, index) => {
                  const latestMessage = chat.latestMessage;
                  return (
                    <TableRow key={index}>
                      <TableCell>{chat.chatUser}</TableCell>
                      <TableCell>
                        {new Date(chat.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {latestMessage
                          ? latestMessage.message
                          : "No messages yet"}
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleChatClick(chat.sessionId)}
                          disabled={selectedSessionId === chat.sessionId}
                          style={{
                            background:
                              selectedSessionId === chat.sessionId
                                ? "#ccc"
                                : "#4caf50",
                            color:
                              selectedSessionId === chat.sessionId
                                ? "#666"
                                : "white",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            cursor:
                              selectedSessionId === chat.sessionId
                                ? "not-allowed"
                                : "pointer",
                          }}
                        >
                          {selectedSessionId === chat.sessionId
                            ? "Chat Open"
                            : "Open Chat"}
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </tbody>
            </Table>
          )}
        </MessagesContainer>
        {selectedSessionId && (
          <div ref={chatBotRef}>
            <AdminChatBot
              sessionId={selectedSessionId}
              isOpen={isOpen}
              toggleChat={toggleChat}
            />
          </div>
        )}
      </BaseContainer>
      <Footer />
    </>
  );
};

export default Messages;
