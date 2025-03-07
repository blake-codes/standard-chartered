import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useEffect } from "react";

// Styled Components
const Container = styled.div`
  color: #333;
`;

const HeroSection = styled.section`
  background: url("../assets/images/about.jpg") center/cover no-repeat;
  color: white;
  text-align: center;
  padding: 120px 20px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 34, 68, 0.7); /* Dark overlay for readability */
  }

  h1,
  p {
    position: relative;
    z-index: 2;
  }

  h1 {
    font-size: 3.2rem;
    font-weight: bold;
  }

  p {
    font-size: 1.2rem;
    margin-top: 10px;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    padding: 80px 15px;

    h1 {
      font-size: 2.5rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

const Section = styled.section`
  max-width: 1100px;
  margin: 60px auto;
  padding: 30px;
  text-align: center;

  h2 {
    font-size: 2.8rem;
    color: #002244;
    margin-bottom: 15px;
    font-weight: bold;
  }

  p {
    font-size: 1.2rem;
    color: #555;
    line-height: 1.7;
    max-width: 850px;
    margin: 0 auto;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 40px;
`;

const Card = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    margin-bottom: 15px;
  }

  h3 {
    color: #004085;
    font-size: 1.6rem;
    margin-bottom: 10px;
  }

  p {
    color: #666;
    font-size: 1rem;
  }
`;

const CallToAction = styled.div`
  background: #002244;
  color: white;
  padding: 50px 20px;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 15px;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
    margin-bottom: 20px;
  }

  button {
    font-size: 1.1rem;
    font-weight: bold;
    color: white;
    background: #ff8c00;
    border: none;
    padding: 12px 30px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #e67e00;
    }
  }
`;
const StyledButton = styled.button`
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  background: #ff8c00;
  border: none;
  padding: 12px 30px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #e67e00;
  }

  a {
    text-decoration: none;
    color: white; /* Ensures link inherits button color */
    display: block;
    width: 100%;
    height: 100%;
  }
`;

// Main Component
const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        {/* Hero Section */}
        <HeroSection>
          <h1>About Us</h1>
          <p>
            Building trust, ensuring security, and delivering innovation in
            digital banking.
          </p>
        </HeroSection>

        {/* Who We Are */}
        <Section>
          <h2>Who We Are</h2>
          <p>
            We are a next-generation banking platform dedicated to empowering
            individuals and businesses with seamless, secure, and innovative
            financial solutions. Our global reach connects clients to
            sustainable growth opportunities across Asia, Africa, and the Middle
            East.
          </p>
        </Section>

        {/* Mission & Vision */}
        <Section>
          <h2>Our Mission & Vision</h2>
          <CardGrid>
            <Card>
              <img src="../assets/images/mission.jpg" alt="Mission Icon" />
              <h3>Our Mission</h3>
              <p>
                To redefine banking by providing smart, secure, and
                customer-focused financial solutions that enhance everyday life.
              </p>
            </Card>
            <Card>
              <img src="../assets/images/vision.jpg" alt="Vision Icon" />
              <h3>Our Vision</h3>
              <p>
                To be the leading digital bank, setting new standards in
                innovation, security, and customer experience.
              </p>
            </Card>
          </CardGrid>
        </Section>

        {/* Core Values */}
        <Section>
          <h2>Our Core Values</h2>
          <CardGrid>
            <Card>
              <img src="../assets/images/security.jpg" alt="Security Icon" />
              <h3>Security</h3>
              <p>
                We implement state-of-the-art security protocols to ensure the
                safety of our customers' data and transactions.
              </p>
            </Card>
            <Card>
              <img
                src="../assets/images/innovation.jpg"
                alt="Innovation Icon"
              />
              <h3>Innovation</h3>
              <p>
                Our banking solutions evolve with the latest technology, making
                financial services more accessible and efficient.
              </p>
            </Card>
            <Card>
              <img src="../assets/images/trust.jpg" alt="Trust Icon" />
              <h3>Trust</h3>
              <p>
                Transparency and reliability are the foundation of our customer
                relationships.
              </p>
            </Card>
            <Card>
              <img
                src="../assets/images/customer.jpg"
                alt="Customer-Centric Icon"
              />
              <h3>Customer-Centric</h3>
              <p>
                Every service we offer is designed to provide seamless banking
                experiences tailored to our clients' needs.
              </p>
            </Card>
          </CardGrid>
        </Section>

        {/* Call to Action */}
        <CallToAction>
          <h2>Experience a New Standard of Banking</h2>
          <p>
            Join thousands of customers who trust us for secure, fast, and
            innovative banking solutions.
          </p>
          <StyledButton>
            <Link to="/register">Get Started Today</Link>
          </StyledButton>
        </CallToAction>
      </Container>
      <Footer />
    </>
  );
};

export default AboutUs;
