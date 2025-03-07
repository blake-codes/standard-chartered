import Navbar from "../components/NavBar";
import { useEffect } from "react";
import axios from "axios";
import HeroSection from "../components/HeroSection";
import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";
import { motion } from "framer-motion";

// Styled Components
const Section = styled(motion.section)`
  padding: 2rem;
  background: "#fff";
  color: "#525355";
  text-align: center;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SectionHeading = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: ${(props) => props.color || "#525355"};
  line-height: 1.5;
`;

const GridContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Card = styled(motion.div)`
  border-radius: 12px;
  padding: 2.5rem;
  margin: 10px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CardTwo = styled.div`
  padding: 2.5rem;
  text-align: center;
`;
const CardImage = styled.img`
  width: 100%;
  max-height: 200px; /* Limit the height for consistency */
  border-radius: 12px;
  margin-bottom: 1rem;
  object-fit: cover;
`;

const TestimonialImage = styled.img`
  width: 80px; /* Smaller size for testimonials */
  height: 80px;
  border-radius: 50%;
  border: 4px solid #2c3e50;
  object-fit: cover;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    width: 60px; /* Adjust for small screens */
    height: 60px;
  }
`;

const HeroButton = styled(motion.button)`
  font-size: 1rem;
  font-weight: bold;
  color: white;
  margin-top: 10px;
  padding: 12px 30px;
  background-color: #0473ea;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } },
};

const LearnButton = styled.button`
  font-size: 1rem;
  font-weight: bold;
  color: "#525355";
  padding: 12px 30px;
  background-color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px 25px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 8px 20px;
  }
`;
const HeroButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* Center align content */
  align-items: center;
  width: auto; /* Remove full width */
  padding: 0 10px;
  color: "#525355";
`;

const LearnBox = styled.div`
  display: flex;
  color: #0473ea;
  margin-left: 10px;
`;

const LikeNoOther = styled.section`
  background: #cdf4bf;
  color: "#525355";
  height: max-content;
  width: 100%;
  text-align: center;
`;

const FeaturedServices = () => (
  <Section initial="hidden" whileInView="visible" viewport={{ once: true }}>
    <SectionHeading variants={fadeInUp}>
      Our Featured Banking Services
    </SectionHeading>
    <GridContainer variants={fadeInUp}>
      <Card variants={fadeInUp}>
        <CardImage src="../assets/images/plans.jpg" alt="Investment Plans" />
        <h3>Smart Investment Plans</h3>
        <p>
          Grow your wealth with our expert-managed investment options, tailored
          to your financial goals.
        </p>
      </Card>
      <Card variants={fadeInUp}>
        <CardImage src="../assets/images/loans.jpg" alt="Instant Loans" />
        <h3>Instant Loans</h3>
        <p>
          Access quick loans with flexible repayment options to support your
          personal and business needs.
        </p>
      </Card>
      <Card variants={fadeInUp}>
        <CardImage src="../assets/images/wallet.jpg" alt="Digital Wallets" />
        <h3>Secure Digital Wallets</h3>
        <p>
          Send, receive, and manage money seamlessly with our secure digital
          wallet solutions.
        </p>
      </Card>
    </GridContainer>
  </Section>
);

// Innovation & Technology Section
const InnovationSection = () => (
  <Section style={{ background: "#0473ea", color: "white" }}>
    <SectionHeading color="white">
      Banking Reinvented with Innovation
    </SectionHeading>
    <GridContainer>
      <Card
        style={{
          background: "transparent",
          color: "white",
          border: "1px solid white",
        }}
      >
        <h3>AI-Powered Assistance</h3>
        <p>
          Our AI-driven customer service ensures 24/7 support, answering your
          questions in real time.
        </p>
      </Card>
      <Card
        style={{
          background: "transparent",
          color: "white",
          border: "1px solid white",
        }}
      >
        <h3>Advanced Security</h3>
        <p>
          We use biometric authentication, multi-factor security, and blockchain
          technology for enhanced protection.
        </p>
      </Card>
      <Card
        style={{
          background: "transparent",
          color: "white",
          border: "1px solid white",
        }}
      >
        <h3>Seamless Cross-Border Payments</h3>
        <p>
          Enjoy fast and low-cost international transactions powered by our
          cutting-edge fintech solutions.
        </p>
      </Card>
    </GridContainer>
  </Section>
);
const Home = () => {
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await axios.get(
          "https://standard-server.onrender.com/api/auth/healthcheck"
        );
        console.log("Healthcheck successful:", response.data);
      } catch (error) {
        console.error("Healthcheck failed:", error);
      }
    };

    checkHealth();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection />

      <Section initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <SectionHeading variants={fadeInUp}>
          Why Our Customers Trust Us
        </SectionHeading>
        <GridContainer variants={fadeInUp}>
          <Card>
            <h3>Secure and Reliable</h3>
            <p style={{ lineHeight: "1.6" }}>
              Experience peace of mind with our robust encryption protocols and
              high reliability, ensuring your money is always safe.
            </p>
          </Card>
          <Card>
            <h3>24/7 Personalized Support</h3>
            <p style={{ lineHeight: "1.6" }}>
              Our expert support team is available around the clock to guide and
              assist you with all your banking needs, whenever you need them.
            </p>
          </Card>
          <Card>
            <h3>Simplified Banking</h3>
            <p style={{ lineHeight: "1.6" }}>
              Enjoy effortless management of your finances with our intuitive
              platform, designed to streamline your banking experience.
            </p>
          </Card>
        </GridContainer>
      </Section>

      <Section>
        <GridContainer style={{ gridTemplateColumns: "1fr 1fr" }}>
          <Card>
            <CardImage
              src="../assets/images/bank1.jpg"
              alt="Wealth and Retail Banking"
            />
            <h2>Wealth and Retail Banking</h2>
            <p style={{ lineHeight: "1.6" }}>
              Tailored financial solutions for wealth management and retail
              banking services for your daily financial needs. We support our
              clients throughout their wealth journey with a range of
              opportunities across our unique international network, backed by
              convenient online platforms.
            </p>
            <LearnButton>
              <HeroButtonContainer>
                Learn how{" "}
                <LearnBox>
                  <FaChevronRight />
                </LearnBox>
              </HeroButtonContainer>
            </LearnButton>
          </Card>
          <Card>
            <CardImage
              src="../assets/images/bank2.jpg"
              alt="Corporate and Investment Banking"
            />
            <h2>Corporate and Investment Banking</h2>
            <p style={{ lineHeight: "1.6" }}>
              Strategic business solutions including mergers, acquisitions, and
              investment advisory services. We connect corporates and financial
              institutions to unlock the most exciting growth opportunities.
            </p>
            <LearnButton>
              <HeroButtonContainer>
                Learn how{" "}
                <LearnBox>
                  <FaChevronRight />
                </LearnBox>
              </HeroButtonContainer>
            </LearnButton>
          </Card>
        </GridContainer>
      </Section>
      <FeaturedServices />
      <InnovationSection />
      <Section initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <SectionHeading variants={fadeIn}>
          How We Transform Banking for Our Clients
        </SectionHeading>
        <GridContainer variants={fadeIn}>
          <Card variants={fadeInUp}>
            <TestimonialImage
              src="../assets/images/woman.jpeg"
              alt="Jessica Brooks"
            />
            <blockquote style={{ lineHeight: "1.6" }}>
              "With this bank's innovative savings plans, I’ve managed to build
              a strong financial foundation. The personalized advice has been
              transformative for my family and me."
            </blockquote>
            <h3>Olivia Bennett</h3>
            <p>Financial Advisor</p>
          </Card>
          <Card variants={fadeInUp}>
            <TestimonialImage
              src="../assets/images/man.jpg"
              alt="Michael Reynolds"
            />
            <blockquote style={{ lineHeight: "1.6" }}>
              "The mobile app makes managing my finances so much easier. I can
              transfer money, track expenses, and even invest with just a few
              clicks."
            </blockquote>
            <h3>Michael Reynolds</h3>
            <p>Software Engineer</p>
          </Card>
          <Card variants={fadeInUp}>
            <TestimonialImage
              src="../assets/images/black.jpg"
              alt="Emily Carter"
            />
            <blockquote style={{ lineHeight: "1.6" }}>
              "Their mortgage plans allowed me to purchase my dream home with
              flexible options and great customer support throughout the
              process."
            </blockquote>
            <h3>Emma Harper</h3>
            <p>Entrepreneur</p>
          </Card>
        </GridContainer>
      </Section>

      <LikeNoOther>
        <CardTwo>
          <h3>A bank like no other</h3>
          <p style={{ lineHeight: "1.6" }}>
            Find out more about our people, markets and business strategy.
          </p>
          <HeroButton>
            <HeroButtonContainer>
              About our business <FaChevronRight />
            </HeroButtonContainer>
          </HeroButton>
        </CardTwo>
      </LikeNoOther>

      <ChatBot />
      <Footer />
    </>
  );
};

export default Home;
