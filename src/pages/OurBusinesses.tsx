import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useEffect } from "react";

const BusinessSection = styled.section`
  padding: 3rem 5%;
  background: #f9f9f9;
  color: #333;
  margin-top: 20px;
`;

const BusinessHeading = styled.h1`
  font-size: 2.8rem;
  text-align: center;
  color: #0473ea;
  margin-bottom: 2rem;
`;

const BusinessContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;

const BusinessCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
`;

const CardImage = styled.img`
  width: 100%;
  border-radius: 12px;
  max-height: 180px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const OurBusinesses = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar />
      <BusinessSection>
        <BusinessHeading>Our Business at a Glance</BusinessHeading>
        <BusinessContent>
          <BusinessCard>
            <CardImage src="../assets/images/bank1.jpg" alt="Wealth Banking" />
            <h3>Wealth and Retail Banking</h3>
            <p>
              Personalized financial solutions tailored for wealth management,
              ensuring seamless access to banking services.
            </p>
          </BusinessCard>

          <BusinessCard>
            <CardImage src="../assets/images/bank2.jpg" alt="Investment" />
            <h3>Corporate & Investment Banking</h3>
            <p>
              From mergers to strategic investments, we connect businesses to
              new opportunities.
            </p>
          </BusinessCard>

          <BusinessCard>
            <CardImage
              src="../assets/images/banking.jpg"
              alt="Digital Solutions"
            />
            <h3>Fintech & Digital Banking</h3>
            <p>
              Innovation-driven banking solutions with AI-powered financial
              tools and mobile-first experiences.
            </p>
          </BusinessCard>

          <BusinessCard>
            <CardImage src="../assets/images/trading.jpg" alt="International" />
            <h3>Global Markets & Trading</h3>
            <p>
              A worldwide financial network offering access to diverse
              investment and trade options.
            </p>
          </BusinessCard>
        </BusinessContent>
      </BusinessSection>
      <Footer />
    </>
  );
};

export default OurBusinesses;
