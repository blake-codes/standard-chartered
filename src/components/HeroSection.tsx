import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import { GiWaterDrop } from "react-icons/gi";

const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const HeroImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const HeroImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
`;

const HeroContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  color: white;
  padding: 2rem;
  max-width: 600px;
  width: 100%;

  @media (max-width: 1050px) {
    margin-top: 30px;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: -80px;
  }

  @media (max-width: 660px) {
    padding: 1rem;
    margin-top: 30px;
  }
`;

const HeroHeading = styled(motion.h1)`
  font-size: 3rem;
  font-weight: bold;
  color: white;
  line-height: 1.2;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 1rem;
  letter-spacing: 1px;
  display: inline-flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const WaterDropIcon = styled(GiWaterDrop)`
  color: #0473ea;
  font-size: 4rem;
  transform: rotate(90deg);

  @media (max-width: 768px) {
    font-size: 3rem;
  }
  @media (max-width: 680px) {
    display: none;
  }
`;

const WaterDropIconTwo = styled(GiWaterDrop)`
  color: #3aea04;
  font-size: 4rem;
  transform: rotate(270deg);

  @media (max-width: 680px) {
    display: none;
  }
`;

const HeroParagraph = styled(motion.p)`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 2rem;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const HeroButton = styled(motion.button)`
  background-color: #0473ea;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 12px 30px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #06013b;
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 10px;
`;

const HeroSection = () => {
  const [imageSrc, setImageSrc] = useState("../assets/images/hero2.jpg");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setImageSrc("../assets/images/hero1.jpg");
      } else {
        setImageSrc("../assets/images/hero2.jpg");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  return (
    <HeroContainer>
      <HeroImageWrapper>
        <HeroImage src={imageSrc} alt="Hero Background" />
        <HeroOverlay />
      </HeroImageWrapper>
      <HeroContent>
        <HeroHeading
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <WaterDropIcon />
          From here, possibilities are everywhere
          <WaterDropIconTwo />
        </HeroHeading>
        <HeroParagraph
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          We’re here to connect your potential to possibilities in the world’s
          most dynamic markets.
        </HeroParagraph>
        <HeroButton
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
        >
          <HeroButtonContainer>
            Learn how <FaChevronRight />
          </HeroButtonContainer>
        </HeroButton>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
