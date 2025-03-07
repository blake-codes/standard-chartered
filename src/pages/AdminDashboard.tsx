import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  balance: number;
  accountStatus: string;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Fetch all users on page load
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://standard-server.onrender.com/api/users"
        ); // Replace with your API
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <Header>Admin Dashboard</Header>

        {loading && <Message>Loading users...</Message>}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {!loading && !error && (
          <>
            <SectionTitle>All Accounts</SectionTitle>
            <TableWrapper>
              {" "}
              <Table>
                <thead>
                  <tr>
                    <Th>SN</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Username</Th>
                    <Th>Balance</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <Td>{index + 1}</Td> {/* Serial Number */}
                      <Td>
                        {user.firstName} {user.lastName}
                      </Td>
                      <Td>{user.email}</Td>
                      <Td>{user.username}</Td>
                      <Td>
                        $
                        {new Intl.NumberFormat("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(user.balance)}
                      </Td>
                      <Td>
                        <StatusBadge status={user.accountStatus}>
                          {user.accountStatus}
                        </StatusBadge>
                      </Td>
                      <Td>
                        <ViewButton
                          onClick={() => navigate(`/account/${user._id}`)}
                        >
                          View
                        </ViewButton>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>
          </>
        )}
      </Container>
    </>
  );
};

export default AdminDashboard;

/* Styled Components */
const Container = styled.div`
  padding: 20px;
  background: white;
  min-height: 100vh;
  margin-top: 90px;
`;

const Header = styled.h1`
  color: #2c3e50;
`;

const SectionTitle = styled.h2`
  margin-top: 20px;
`;
const TableWrapper = styled.div`
  overflow-x: auto; /* Enables horizontal scrolling on small screens */
  width: 100%;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  background: #34495e;
  color: white;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 5px 10px;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-transform: capitalize;
  background: ${({ status }) => {
    switch (status) {
      case "active":
        return "green"; // ✅ Active (Green)
      case "pending":
        return "orange"; // ⏳ Pending (Orange)
      case "blocked":
        return "red"; // 🚫 Blocked (Red)
      case "suspended":
        return "purple"; // ⚠️ Suspended (Purple)
      default:
        return "gray"; // Unknown Status
    }
  }};
`;

const ViewButton = styled.button`
  padding: 6px 12px;
  border: none;
  background: #3498db;
  color: white;
  font-size: 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #2980b9;
  }
`;

const Message = styled.p`
  font-size: 18px;
  text-align: center;
  color: #666;
`;

const ErrorMessage = styled(Message)`
  color: red;
`;
