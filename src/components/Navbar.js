import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import styled from "styled-components";
import { useCart } from "../context/CartContext";

import logoImg from "../images/logo.jpg"; // Adjust path as needed

// Styled Components
const NavbarContainer = styled.nav`
  background-color: #fcfaf7;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
  font-family: "Poppins", sans-serif;
`;

const NavInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const BrandName = styled.span`
  color: #5c4033;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1;
`;

const TagLine = styled.span`
  color: #7a9a01;
  font-size: 0.9rem;
  font-style: italic;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const AuthCartWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: #4a4a4a;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;

  &:hover {
    color: #7a9a01;

    &:after {
      width: 100%;
    }
  }

  &:after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #7a9a01;
    transition: width 0.3s ease;
  }
`;

// Create a styled button that mimics the NavLink appearance
const NavButton = styled.button`
  color: #4a4a4a;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  padding: 0;
  font-size: inherit;

  &:hover {
    color: #7a9a01;

    &:after {
      width: 100%;
    }
  }

  &:after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #7a9a01;
    transition: width 0.3s ease;
  }
`;

const CartIcon = styled(Link)`
  position: relative;
  color: #5c4033;
  font-size: 1.5rem;
  text-decoration: none;
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #7a9a01;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
`;

const LogoutButton = styled.button`
  background: none;
  border: 2px solid #7a9a01;
  color: #7a9a01;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: #7a9a01;
    color: white;
  }
`;

const MobileAuthLink = styled(Link)`
  color: #4a4a4a;
  text-decoration: none;
  font-weight: 500;

  @media (min-width: 769px) {
    display: none;
  }
`;

const Navbar = ({ cartItemCount = 0, scrollToFooter }) => {
  const user = auth.currentUser;
  const { cart } = useCart();

  return (
    <NavbarContainer>
      <NavInner>
        <Logo to="/">
          <LogoImage src={logoImg} alt="TIVEE organics" />
          <LogoText>
            <BrandName>TIVEE</BrandName>
            <TagLine>organics</TagLine>
          </LogoText>
        </Logo>

        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">Products</NavLink>
          <NavButton onClick={scrollToFooter}>About Us</NavButton>
          <NavButton onClick={scrollToFooter}>Contact</NavButton>
        </NavLinks>

        <AuthCartWrapper>
          {user ? (
            <>
              <CartIcon to="/cart">
                🛒
                {cart.length > 0 && <CartCount>{cart.length}</CartCount>}
              </CartIcon>
              <LogoutButton onClick={() => auth.signOut()}>Logout</LogoutButton>
            </>
          ) : (
            <>
              <MobileAuthLink to="/login">Login</MobileAuthLink>
              <MobileAuthLink to="/register">Register</MobileAuthLink>
            </>
          )}
        </AuthCartWrapper>
      </NavInner>
    </NavbarContainer>
  );
};

export default Navbar;