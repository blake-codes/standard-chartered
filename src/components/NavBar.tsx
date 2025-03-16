import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaChevronDown,
  FaSignOutAlt,
  FaLock,
  FaUserCog,
} from "react-icons/fa";
import { useAuth } from "../AuthContext";

interface NavProps {
  $isOpen: boolean;
  $isDropdownOpen: boolean;
}

// const SubNav = styled.div`
//   position: fixed;
//   top: 0;
//   right: 20px;
//   display: flex;
//   gap: 20px;
//   background: #2f2f2f; /* Black background */
//   padding: 8px 20px;
//   border-bottom-left-radius: 10px;
//   z-index: 110;

//   a {
//     text-decoration: none;
//     color: white; /* White text */
//     font-size: 0.9rem;

//     &:hover {
//       color: #008734;
//     }
//   }

//   @media (max-width: 1100px) {
//     display: none;
//   }
// `;

const NavBar = styled.nav<NavProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 70px;
  background: white;
  color: black;
  height: 70px;
  box-shadow: 0 2px 5px rgba(0, 0, 0.1, 0.1);
  position: fixed;
  width: calc(100% - 40px); /* Adjusted to leave space on both sides */
  margin: 0 20px;
  box-sizing: border-box;
  z-index: 100;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  @media (max-width: 1100px) {
    margin: 0 0;
    width: 100%;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
    padding: 15px 20px;
  }
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .hamburger {
    display: none;
    cursor: pointer;
    color: #0473ea;
    margin-left: 10px;

    @media (max-width: 1100px) {
      display: block;
    }
  }

  ul {
    display: flex;
    gap: 35px;
    list-style: none;

    @media (max-width: 1100px) {
      display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
      flex-direction: column;
      position: absolute;
      top: 40px;
      left: 0;
      width: 100%;
      background-color: #fff;
      padding: 1rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }
  }

  li {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #06013b;
    }

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #525355;
      font-size: medium;
      font-weight: 300;
      gap: 8px;

      &:hover {
        color: #06013b;
      }
    }
  }

  .dropdown {
    position: absolute;
    background-color: white;
    top: 60px;
    right: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    display: ${({ $isDropdownOpen }) => ($isDropdownOpen ? "block" : "none")};
    z-index: 1001;
  }

  .dropdown li {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f1f1f1;
    }
  }
`;

const Logo = styled(Link)`
  img {
    height: 60px;
    width: 90px;
    object-fit: contain;
  }
`;
const LoginContainer = styled.div`
  color: white;
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
  align-items: center;
  background-color: #008734;
  font-size: 0.9rem;
  margin-right: 20px;
  @media (max-width: 1100px) {
    right: 0;
  }
`;
const SignUpContainer = styled.div`
  background-color: white;
  color: #008734;
  display: flex;
  padding: 10px 20px;
  border: 1px solid #008734;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  cursor: pointer;
  margin-right: 20px;
  &:hover {
    background-color: #008734;
    color: white;
  }

  @media (max-width: 1100px) {
    display: none;
  }
`;
const IconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: max-content;
`;
const ButtonText = styled.div`
  margin-left: 7px;
`;
const AdminDropdown = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: small;
  font-weight: 300;
  gap: 8px;

  &:hover {
    color: #06013b;
  }
`;
const LinkWithoutUnderline = styled(Link)`
  text-decoration: none; /* Removes the underline from the link */
`;
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, username, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {/* <SubNav>
        <Link to="/contact">Contact Us</Link>
        <Link to="/locations">Locations</Link>
      </SubNav> */}
      <NavBar $isOpen={isOpen} $isDropdownOpen={isDropdownOpen}>
        <Logo to="/">
          <img src="/assets/images/Standard_logo.png" alt="Bank Logo" />
        </Logo>

        <ul>
          {isOpen && isAuthenticated && username !== "admin" && (
            <li>
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
            </li>
          )}
          {isOpen && isAuthenticated && username === "admin" && (
            <li>
              <Link to="/accounts" onClick={() => setIsOpen(false)}>
                Accounts
              </Link>
            </li>
          )}
          {isOpen && isAuthenticated && username === "admin" && (
            <li>
              <Link to="/messages" onClick={() => setIsOpen(false)}>
                Messages
              </Link>
            </li>
          )}

          {isOpen && (
            <li>
              <Link to="/business" onClick={() => setIsOpen(false)}>
                Our businesses
              </Link>
            </li>
          )}
          {isOpen && (
            <li>
              <Link to="/about-us" onClick={() => setIsOpen(false)}>
                About us
              </Link>
            </li>
          )}
          {isOpen && (
            <li>
              <Link to="/investors" onClick={() => setIsOpen(false)}>
                Investors
              </Link>
            </li>
          )}
          {isOpen && (
            <li>
              <Link to="/insights" onClick={() => setIsOpen(false)}>
                Insights
              </Link>
            </li>
          )}
          {isOpen && (
            <li>
              <Link to="/careers" onClick={() => setIsOpen(false)}>
                Careers
              </Link>
            </li>
          )}
          {isOpen && (
            <li>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <FaUser /> Open an account
              </Link>
            </li>
          )}
          {isOpen && !isAuthenticated && (
            <li>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <FaLock /> Login
              </Link>
            </li>
          )}
          {!isOpen && (
            <li>
              <Link to="/about-us" onClick={() => setIsOpen(false)}>
                About us
              </Link>
            </li>
          )}
          {!isOpen && (
            <li>
              <Link to="/business" onClick={() => setIsOpen(false)}>
                Our businesses
              </Link>
            </li>
          )}
          {!isOpen && (
            <li>
              <Link to="/investors" onClick={() => setIsOpen(false)}>
                Investors
              </Link>
            </li>
          )}

          {!isOpen && (
            <li>
              <Link to="/insights" onClick={() => setIsOpen(false)}>
                Insights
              </Link>
            </li>
          )}
          {!isOpen && (
            <li>
              <Link to="/careers" onClick={() => setIsOpen(false)}>
                Careers
              </Link>
            </li>
          )}

          {/* Styled admin dropdown */}

          {isOpen && isAuthenticated && (
            <li>
              <Link to="/settings">
                <FaUserCog /> Settings
              </Link>
            </li>
          )}

          {isOpen && isAuthenticated && (
            <li style={{ marginBottom: "40px" }}>
              <Link to="/" onClick={logout}>
                <FaSignOutAlt /> Logout
              </Link>
            </li>
          )}
        </ul>
        <IconsContainer>
          {!isAuthenticated && (
            <LinkWithoutUnderline
              to="/register"
              onClick={() => setIsDropdownOpen(false)}
            >
              {" "}
              <SignUpContainer>
                <FaUser /> <ButtonText>OPEN AN ACCOUNT</ButtonText>
              </SignUpContainer>
            </LinkWithoutUnderline>
          )}
          {!isAuthenticated && (
            <LinkWithoutUnderline
              to="/login"
              onClick={() => setIsDropdownOpen(false)}
            >
              {" "}
              <LoginContainer>
                <FaLock />
                <ButtonText>LOGIN</ButtonText>
              </LoginContainer>
            </LinkWithoutUnderline>
          )}

          {!isOpen && isAuthenticated && (
            <li onClick={toggleDropdown}>
              <AdminDropdown>
                <FaUser /> {username} <FaChevronDown />
              </AdminDropdown>
              <ul className="dropdown">
                {username !== "admin" && (
                  <li>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                )}

                {username === "admin" && (
                  <li>
                    <Link
                      to="/accounts"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Accounts
                    </Link>
                  </li>
                )}
                {username === "admin" && (
                  <li>
                    <Link
                      to="/messages"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Messages
                    </Link>
                  </li>
                )}

                <li>
                  <Link to="/" onClick={logout}>
                    <FaSignOutAlt /> Logout
                  </Link>
                </li>
              </ul>
            </li>
          )}

          <div className="hamburger" onClick={toggleMenu}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </div>
        </IconsContainer>
      </NavBar>
    </>
  );
};

export default Navbar;
