import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

// Theme Colors - Refined for a Professional Look
const colors = {
  background: "#F8FAFD", // Soft off-white
  text: "#102A43", // Deep navy (better readability)
  accent: "#2B6CB0", // Elegant royal blue
  cardBg: "#FFFFFF", // White
  border: "#CBD5E1", // Light gray-blue
  shadow: "rgba(43, 108, 176, 0.15)", // Subtle blue shadow
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const PageContainer = styled.div`
  background: ${colors.background};
  color: ${colors.text};
`;

const Hero = styled.section`
  height: 80vh;
  background: url("../assets/images/career.jpg") center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5); /* Darker overlay for better contrast */
  }

  div {
    position: relative;
    z-index: 2;
    max-width: 700px;
    animation: ${fadeIn} 1s ease-in-out;

    h1 {
      font-size: 3rem;
      font-weight: 700;
      color: ${colors.accent};
    }

    p {
      font-size: 1.2rem;
      margin-top: 1rem;
      color: #e2e8f0; /* Soft grayish-white for better visibility */
    }
  }
`;

// Job Section - Responsive Grid
const JobSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 4rem 2rem;
`;

const JobCard = styled.div`
  background: ${colors.cardBg};
  border: 1px solid ${colors.border};
  padding: 2rem;
  border-radius: 10px;
  transition: 0.3s ease;
  box-shadow: 0px 5px 15px ${colors.shadow};
  text-align: center;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px ${colors.shadow};
  }

  h3 {
    font-size: 1.5rem;
    color: ${colors.accent};
    margin-bottom: 8px;
  }

  p {
    font-size: 1rem;
    opacity: 0.8;
  }
`;

// Culture Section
const CultureSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 3rem;
  padding: 5rem 2rem;

  div {
    flex: 1;
    min-width: 300px;
  }

  img {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0px 6px 12px ${colors.shadow};
  }
`;

// Call to Action
const CTASection = styled.section`
  text-align: center;
  padding: 4rem 2rem;
`;

const CTAButton = styled.button`
  padding: 12px 35px;
  font-size: 1.1rem;
  font-weight: bold;
  background: ${colors.accent};
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(43, 108, 176, 0.4); /* Stronger hover effect */
  }
`;

// Job Data
const jobs = [
  {
    title: "Retail Banking Associate",
    location: "New York, NY",
    desc: "Assist customers with banking services, accounts, and financial products.",
  },
  {
    title: "Wealth Management Advisor",
    location: "San Francisco, CA",
    desc: "Guide high-net-worth clients in investment strategies and wealth preservation.",
  },
  {
    title: "Loan Officer",
    location: "Chicago, IL",
    desc: "Evaluate, process, and approve loan applications for individuals and businesses.",
  },
  {
    title: "Financial Analyst",
    location: "Remote",
    desc: "Analyze financial data and market trends to support strategic decision-making.",
  },
  {
    title: "Risk & Compliance Officer",
    location: "Toronto, Canada",
    desc: "Ensure the bank complies with financial regulations and manages operational risks.",
  },
  {
    title: "Customer Relations Manager",
    location: "Dubai, UAE",
    desc: "Develop and maintain relationships with corporate and individual clients.",
  },
  {
    title: "Investment Banker",
    location: "Hong Kong",
    desc: "Advise corporate clients on mergers, acquisitions, and capital raising strategies.",
  },
];

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <PageContainer>
        {/* Hero Section */}
        <Hero>
          <div>
            <h1>Build the Future with Us</h1>
            <p>Join a team that innovates, collaborates, and grows together.</p>
          </div>
        </Hero>

        {/* Job Openings - Responsive Grid */}
        <JobSection>
          {jobs.map((job, index) => (
            <JobCard key={index}>
              <h3>{job.title}</h3>
              <p>{job.location}</p>
              <p>{job.desc}</p>
            </JobCard>
          ))}
        </JobSection>

        {/* Culture Section */}
        <CultureSection>
          <div>
            <h2>Our Culture</h2>
            <p>We believe in creativity, growth, and empowering our people.</p>
          </div>
          <div>
            <img src="../assets/images/culture.jpg" alt="Company Culture" />
          </div>
        </CultureSection>

        {/* Call to Action */}
        <CTASection>
          <h2>Ready to Start?</h2>
          <p>Take the next step in your career and grow with us.</p>
          <CTAButton>Apply Now</CTAButton>
        </CTASection>
      </PageContainer>
      <Footer />
    </>
  );
};

export default Careers;
