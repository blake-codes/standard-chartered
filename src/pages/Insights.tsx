import { useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";

// Global Colors
const colors = {
  primary: "#0473EA",
  secondary: "#181818",
  light: "#F5F5F5",
  dark: "#121212",
  textDark: "#333",
  textLight: "#fff",
};

// Styled Components
const HeroSection = styled.section`
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
      120deg,
      rgba(0, 0, 0, 0.7),
      rgba(4, 115, 234, 0.7)
    ),
    url("../assets/images/insights-hero.jpg") center/cover no-repeat;
  color: ${colors.textLight};
  text-align: center;
  padding: 2rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    backdrop-filter: blur(5px);
  }
`;

const HeroContent = styled.div`
  position: relative;
  max-width: 700px;
  text-align: center;
  z-index: 2;

  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
`;

const Button = styled.button`
  padding: 14px 32px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background: ${colors.primary};
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(4, 115, 234, 0.4);
  }
`;

const Section = styled.section<{ bg?: string }>`
  padding: 5rem 2rem;
  background: ${(props) => props.bg || colors.light};
  text-align: center;

  h2 {
    font-size: 2.8rem;
    color: ${colors.textDark};
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  padding-top: 2rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    opacity: 0.8;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

const Insights = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <h1>Stay Ahead with Expert Insights</h1>
          <p>
            Access the latest market trends, analysis, and reports from top
            experts.
          </p>
          <Button>Get Started</Button>
        </HeroContent>
      </HeroSection>

      {/* Latest News */}
      <Section>
        <h2>Latest Insights & News</h2>
        <GridContainer>
          <Card>
            <CardImage src="../assets/images/news.jpg" alt="News" />
            <h3>Market Trends 2024</h3>
            <p>
              Explore how emerging technologies are shaping the future of
              finance.
            </p>
          </Card>
          <Card>
            <CardImage src="../assets/images/tech.jpg" alt="Technology" />
            <h3>AI & Fintech</h3>
            <p>
              The impact of artificial intelligence in modern banking solutions.
            </p>
          </Card>
          <Card>
            <CardImage src="../assets/images/invest.jpg" alt="Investing" />
            <h3>Investment Strategies</h3>
            <p>
              Discover the best investment opportunities for long-term success.
            </p>
          </Card>
        </GridContainer>
      </Section>

      {/* Expert Analysis */}
      <Section bg={colors.secondary}>
        <h2 style={{ color: colors.textLight }}>Expert Opinions</h2>
        <GridContainer>
          <Card style={{ color: colors.textLight }}>
            <p>
              "The future of digital finance is decentralized and data-driven."
            </p>
            <h4>- Dr. John Carter, Economist</h4>
          </Card>
          <Card style={{ color: colors.textLight }}>
            <p>
              "Investing in AI-based solutions will be the defining factor of
              success in fintech."
            </p>
            <h4>- Lisa Adams, Fintech Expert</h4>
          </Card>
        </GridContainer>
      </Section>

      {/* Case Studies */}
      <Section>
        <h2>Case Studies & Success Stories</h2>
        <GridContainer>
          <Card>
            <CardImage src="../assets/images/startup.jpg" alt="Startup" />
            <h3>How We Scaled a Fintech Startup</h3>
            <p>Insights into exponential growth in the finance sector.</p>
          </Card>
          <Card>
            <CardImage src="../assets/images/crypto.jpg" alt="Crypto" />
            <h3>Crypto Adoption in Banking</h3>
            <p>Real-world examples of blockchain integration.</p>
          </Card>
        </GridContainer>
      </Section>

      {/* Newsletter */}
      <Section style={{ background: colors.dark, color: colors.textLight }}>
        <h2>Subscribe for Weekly Insights</h2>
        <p>Stay updated with the latest financial trends and strategies.</p>
        <Button>Subscribe Now</Button>
      </Section>

      <ChatBot />
      <Footer />
    </>
  );
};

export default Insights;
