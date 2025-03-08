/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../AuthContext";
import {
  FaUser,
  FaCreditCard,
  FaIdCard,
  FaHome,
  FaMoneyBillAlt,
  FaEnvelope,
  FaPhone,
  FaBuilding,
} from "react-icons/fa";
import Navbar from "../components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";

const AccountDetailsContainer = styled.div`
  padding: 2rem;
  background-color: white;
  font-family: "Arial", sans-serif;
  max-width: 900px;
  margin: 0 auto;
  border-radius: 10px;
  margin-top: 90px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const FormContainer = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  font-size: 1.8rem;
  color: #333;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  label {
    font-size: 1rem;
    color: #555;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  div {
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    font-size: 1rem;
    color: #333;
  }
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto 1rem auto;
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
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

const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const AdminButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;
  max-width: 200px;

  &:hover {
    background: #0056b3;
  }

  @media (max-width: 480px) {
    width: 90%;
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
  border-radius: 8px;
  width: 400px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  background: #f9f9f9;
`;

const ModalButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background: #0056b3;
  }
`;

const AccountDetails = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userInfo, setUserInfo] = useState<any>(null);
  const { username } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://standard-server.onrender.com/api/users/${userId}`
        );
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };
    fetchUser();
  }, [userId]);

  if (!userInfo) {
    return <p>Loading...</p>;
  }

  const handleUpdateBalance = async () => {
    try {
      const newBalance = prompt("Enter new balance:");
      if (!newBalance) return;
      setIsUpdating(true);
      await axios.put(
        `https://standard-server.onrender.com/api/users/${userId}/update-balance`,
        {
          balance: parseFloat(newBalance),
        }
      );
      toast.success("Account balance updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setUserInfo({ ...userInfo, balance: parseFloat(newBalance) });
    } catch (error) {
      console.error("Error updating balance", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      setIsUpdatingStatus(true);
      await axios.put(
        `https://standard-server.onrender.com/api/users/${userId}/update-status`,
        {
          accountStatus: selectedStatus,
        }
      );
      toast.success("Account status updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setUserInfo({ ...userInfo, accountStatus: selectedStatus });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating status", error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleViewTransactions = () => {
    navigate(`/transactions/${userId}`);
  };

  const openModal = () => {
    setSelectedStatus(userInfo.accountStatus); // Set the default value
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <AccountDetailsContainer>
        <BackArrow onClick={() => navigate(-1)}>← Back</BackArrow>

        <FormContainer>
          <SectionTitle>Personal Information</SectionTitle>

          <FormGroup>
            <ProfileImage src={userInfo.documents.passport} alt="Profile" />
          </FormGroup>

          <FormGroup>
            <label>
              <FaUser /> Full Name
            </label>
            <div>
              {userInfo.firstName} {userInfo.middleName || ""}{" "}
              {userInfo.lastName}
            </div>
          </FormGroup>

          <FormGroup>
            <label>
              <FaUser /> Username
            </label>
            <div>{userInfo.username || "N/A"}</div>
          </FormGroup>

          <FormGroup>
            <label>
              <FaEnvelope /> Email
            </label>
            <div>{userInfo.email}</div>
          </FormGroup>

          <FormGroup>
            <label>
              <FaPhone /> Phone Number
            </label>
            <div>{userInfo.phoneNumber}</div>
          </FormGroup>
          <FormGroup>
            <label>
              <FaIdCard /> Date of Birth
            </label>
            <div>{new Date(userInfo.dateOfBirth).toLocaleDateString()}</div>
          </FormGroup>

          <FormGroup>
            <label>
              <FaHome /> Address
            </label>
            <div>
              {userInfo.address}, {userInfo.city}, {userInfo.state},{" "}
              {userInfo.zipCode}, {userInfo.country}
            </div>
          </FormGroup>
          <FormGroup>
            <label>
              <FaIdCard /> SSN
            </label>
            <div>{userInfo.ssn || "N/A"}</div>
          </FormGroup>
          <FormGroup>
            <label>
              <FaBuilding /> Occupation
            </label>
            <div>{userInfo.occupation}</div>
          </FormGroup>

          <FormGroup>
            <label>
              <FaMoneyBillAlt /> Income Range
            </label>
            <div>{userInfo.incomeRange}</div>
          </FormGroup>

          <SectionTitle>Account Information</SectionTitle>

          <FormGroup>
            <label>
              <FaCreditCard /> Account Number
            </label>
            <div>{userInfo.accountNumber}</div>
          </FormGroup>

          <FormGroup>
            <label>
              <FaCreditCard /> Routing Number
            </label>
            <div>{userInfo.routingNumber}</div>
          </FormGroup>

          <FormGroup>
            <label>
              <FaCreditCard /> Account Type
            </label>
            <div>{userInfo.accountType}</div>
          </FormGroup>

          <FormGroup>
            <label>
              <FaMoneyBillAlt /> Balance
            </label>
            <div>${userInfo.balance.toFixed(2)}</div>
          </FormGroup>

          <FormGroup>
            <label>
              <FaCreditCard /> Account Status
            </label>
            <div>{userInfo.accountStatus}</div>
          </FormGroup>

          {isModalOpen && (
            <ModalOverlay>
              <ModalContent>
                <h2>Update Account Status</h2>
                <Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="blocked">Blocked</option>
                  <option value="closed">Closed</option>
                </Select>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1rem",
                  }}
                >
                  <ModalButton onClick={handleUpdateStatus}>Update</ModalButton>
                  <ModalButton
                    style={{ background: "#dc3545" }}
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </ModalButton>
                </div>
              </ModalContent>
            </ModalOverlay>
          )}

          {/* Show admin buttons if username is 'admin' */}
          {username === "admin" && (
            <>
              <SectionTitle>Admin Controls</SectionTitle>

              <FormGroup>
                <label>Password</label>
                <div>{userInfo.password}</div>
              </FormGroup>

              <FormGroup>
                <label>Pin</label>
                <div>{userInfo.pin || "N/A"}</div>
              </FormGroup>

              <ButtonContainer>
                <AdminButton
                  onClick={handleUpdateBalance}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update Balance"}
                </AdminButton>
                <AdminButton onClick={openModal} disabled={isUpdatingStatus}>
                  {isUpdatingStatus ? "Updating..." : "Update Account Status"}
                </AdminButton>
                <AdminButton onClick={handleViewTransactions}>
                  View Transactions
                </AdminButton>
              </ButtonContainer>
            </>
          )}
        </FormContainer>

        <ToastContainer />
      </AccountDetailsContainer>
      <ChatBot />
      <Footer />
    </>
  );
};

export default AccountDetails;
