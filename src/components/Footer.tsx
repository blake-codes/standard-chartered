import styled from "styled-components";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const FooterStyled = styled.footer`
  background-color: #464646;
  color: #fff;
  padding: 40px 20px;
  text-align: center;

  .footer-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 1100px;
    margin: 0 auto;
    align-items: center;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    gap: 10px;

    a {
      color: #fff;
      font-size: 1rem;
      text-decoration: none;
      transition: color 0.3s ease-in-out;

      &:hover {
        color: #0473ea;
      }
    }
  }

  .social-icons {
    display: flex;
    justify-content: center;
    gap: 1rem;

    a {
      color: #fff;
      font-size: 1.8rem;
      transition: color 0.3s ease-in-out;

      &:hover {
        color: #0473ea;
      }
    }
  }

  .membership-logos {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;

    img {
      width: 120px;
      height: 60px;
      object-fit: contain; /* Ensures images keep their aspect ratio */
      filter: grayscale(80%);
      transition: filter 0.3s ease-in-out, transform 0.2s ease-in-out;

      &:hover {
        filter: grayscale(0%);
        transform: scale(1.05);
      }
    }
  }

  .footer-bottom {
    margin-top: 20px;
    font-size: 0.9rem;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    .footer-container {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .membership-logos {
      flex-direction: column;
      align-items: center;
    }
  }
`;

const Footer = () => {
  return (
    <FooterStyled>
      <div className="footer-container">
        {/* Navigation Links */}
        <div className="footer-links">
          <a href="/">Privacy Policy</a>
          <a href="/about">Terms of use</a>
          <a href="/services">Contact us</a>
          <a href="/">Locations & Hours</a>
        </div>

        {/* Social Media Icons */}
        <div className="social-icons">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>

        {/* Membership Logos */}
        <div className="membership-logos">
          <img src="/assets/images/local.png" alt="Local" />
          <img src="/assets/images/lender.png" alt="Lender" />
          <img src="/assets/images/fcid.png" alt="FCID" />
        </div>
      </div>

      <p className="footer-bottom">
        © {new Date().getFullYear()} Standard Chartered. All Rights Reserved.
      </p>
    </FooterStyled>
  );
};

export default Footer;
