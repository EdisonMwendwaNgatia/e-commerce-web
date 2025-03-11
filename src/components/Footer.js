import React, { forwardRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";



// Footer Styles
const FooterContainer = styled.footer`
  background-color: #3a6a47;
  color: white;
  padding: 3rem 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const FooterTagline = styled.p`
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: #e0e0e0;
  margin-bottom: 1rem;
`;

const FooterDescription = styled.p`
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: #c19a6b;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLinkItem = styled.li`
  margin-bottom: 0.8rem;
`;

const FooterLink = styled(Link)`
  color: #e0e0e0;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #c19a6b;
  }
`;

const ContactItem = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const ContactIcon = styled.span`
  margin-right: 0.5rem;
`;

const CopyrightBar = styled.div`
  text-align: center;
  padding: 1.5rem;
  background-color: #2c5338;
  color: #e0e0e0;
  font-size: 0.9rem;
`;

const Footer = forwardRef((props, ref) => {
  return (
    <>
      <FooterContainer ref={ref}>
        <FooterContent>
          <FooterSection>
            <FooterLogo>TIVEE</FooterLogo>
            <FooterTagline>organics</FooterTagline>
            <FooterDescription>
              Providing high-quality organic products that promote health, sustainability, and environmental consciousness.
            </FooterDescription>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Quick Links</FooterTitle>
            <FooterLinks>
              <FooterLinkItem>
                <FooterLink to="/">Home</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink to="/">Our Products</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink to="/">About Us</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink to="/">Contact Us</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink to="/terms">Terms & Conditions</FooterLink>
              </FooterLinkItem>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Contact Us</FooterTitle>
            <ContactItem>
              <ContactIcon>📍</ContactIcon>
              Nairobi, Kenya
            </ContactItem>
            <ContactItem>
              <ContactIcon>📞</ContactIcon>
              +254 700 000000
            </ContactItem>
            <ContactItem>
              <ContactIcon>✉️</ContactIcon>
              info@tiveeorganics.com
            </ContactItem>
          </FooterSection>
        </FooterContent>
      </FooterContainer>
      <CopyrightBar>
        © {new Date().getFullYear()} TIVEE Organics. All rights reserved.
      </CopyrightBar>
    </>
  );
});

export default Footer;
