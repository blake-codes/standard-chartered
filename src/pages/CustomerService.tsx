import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

import ContactSection from "../components/ContactSection";

const BaseContainer = styled.div`
  background: #f4f7fc;
  min-height: 100vh;
  padding: 20px;
  margin-top: 10px;
  font-family: "Roboto", sans-serif;
  color: #333;
  @media (max-width: 768px) {
    margin-top: 40px;
  }
`;

const DashboardContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const CustomerService = () => {
  return (
    <>
      <Navbar />

      <BaseContainer>
        <DashboardContainer>
          <ContactSection />
        </DashboardContainer>
      </BaseContainer>
      <Footer />
    </>
  );
};

export default CustomerService;
