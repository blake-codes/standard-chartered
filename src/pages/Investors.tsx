import { useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";

// Styled Components
const Section = styled.section`
  padding: 4rem 2rem;
  background: #f9f9f9;
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const SectionHeading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
`;

const GridContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  width: 320px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardImage = styled.img`
  width: 80px;
  margin-bottom: 1rem;
`;

const HeroSection = styled.div`
  background: url("../assets/images/investment.jpg") center/cover no-repeat;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 600px;
  text-align: center;
`;

const HeroButton = styled.button`
  font-size: 1rem;
  font-weight: bold;
  color: white;
  padding: 12px 30px;
  background-color: #0473ea;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Investors = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <p>Join us in shaping the future of digital finance and banking.</p>
          <HeroButton>Explore Opportunities</HeroButton>
        </HeroContent>
      </HeroSection>

      {/* Why Invest */}
      <Section>
        <SectionHeading>Why Invest With Us?</SectionHeading>
        <GridContainer>
          <Card>
            <CardImage src="../assets/images/growth.jpg" alt="Growth" />
            <h3>Proven Track Record</h3>
            <p>
              We have a history of strong financial performance and innovation.
            </p>
          </Card>
          <Card>
            <CardImage src="../assets/images/global.jpg" alt="Global" />
            <h3>Global Expansion</h3>
            <p>Unlock opportunities worldwide as we enter new markets.</p>
          </Card>
          <Card>
            <CardImage src="../assets/images/tech.jpg" alt="Tech" />
            <h3>Innovative Technology</h3>
            <p>
              We leverage AI and blockchain for a cutting-edge fintech
              ecosystem.
            </p>
          </Card>
        </GridContainer>
      </Section>

      {/* How It Works */}
      <Section>
        <SectionHeading>How It Works</SectionHeading>
        <GridContainer>
          <Card>
            <CardImage src="../assets/images/signup.jpg" alt="Sign Up" />
            <h3>Step 1: Sign Up</h3>
            <p>Create an investor account and verify your identity.</p>
          </Card>
          <Card>
            <CardImage src="../assets/images/invest.jpg" alt="Invest" />
            <h3>Step 2: Choose an Investment</h3>
            <p>
              Browse our investment options and choose the right one for you.
            </p>
          </Card>
          <Card>
            <CardImage src="../assets/images/profit.jpg" alt="Profit" />
            <h3>Step 3: Earn & Grow</h3>
            <p>Watch your investment grow with real-time tracking.</p>
          </Card>
        </GridContainer>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionHeading>What Our Investors Say</SectionHeading>
        <GridContainer>
          <Card>
            <p>
              "One of the best investment decisions I've made. Strong leadership
              and vision!"
            </p>
            <h4>- Blake J. Harrison, Venture Capitalist</h4>
          </Card>
          <Card>
            <p>
              "Their fintech solutions give me confidence that my investment
              will grow."
            </p>
            <h4>- Sarah Johnson, Angel Investor</h4>
          </Card>
        </GridContainer>
      </Section>

      {/* FAQ Section */}
      <Section>
        <SectionHeading>Frequently Asked Questions</SectionHeading>
        <GridContainer>
          <Card>
            <h3>How much do I need to invest?</h3>
            <p>
              The minimum investment starts at $1,000, with flexible options.
            </p>
          </Card>
          <Card>
            <h3>Is my investment secure?</h3>
            <p>
              Yes! We use industry-standard security measures to protect your
              funds.
            </p>
          </Card>
          <Card>
            <h3>How do I track my investment?</h3>
            <p>You can track your investment through our online dashboard.</p>
          </Card>
        </GridContainer>
      </Section>

      <ChatBot />
      <Footer />
    </>
  );
};

export default Investors;
