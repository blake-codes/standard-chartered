import styled from "styled-components";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"; // Import icons from react-icons

const FooterStyled = styled.footer`
  padding: 20px;
  text-align: center;
  background-color: #0473ea;
  color: #fff;
  

  p {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .social-icons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;

    a {
      color: #fff;
      font-size: 1.5rem;
      transition: color 0.3s;

      &:hover {
        color: #f39c12;
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterStyled>
      <p>
        © {new Date().getFullYear()} Standard Chartered 2025.. All Rights
        Reserved.
      </p>

      <div className="social-icons">
        <a
          href="http://www.facebook.com/standardchartered"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://twitter.com/standardchartered"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </a>
        <a
          href="http://instagram.com/standardchartered"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
      </div>
    </FooterStyled>
  );
};

export default Footer;
