import React, { forwardRef } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

// Animation keyframes
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;


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

const SocialIconsContainer = styled.div`
  display: flex;
  margin-top: 1.5rem;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #c19a6b;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: white;
    color: #3a6a47;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    animation: ${pulse} 1s infinite;
  }
  
  &.facebook:hover {
    background-color: #3b5998;
    color: white;
  }
  
  &.instagram:hover {
    background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
    color: white;
  }

  svg {
    width: 20px;
    height: 20px;
  }
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
            <SocialIconsContainer>
              <SocialIcon href="https://www.facebook.com/profile.php?id=100091583394483&sk=about" target="_blank" rel="noopener noreferrer" className="facebook">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://www.instagram.com/tiveeorganicske" target="_blank" rel="noopener noreferrer" className="instagram">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </SocialIcon>
            </SocialIconsContainer>
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
              Nairobi, Starmall 2nd Floor, room B8
            </ContactItem>
            <ContactItem>
              <ContactIcon>📞</ContactIcon>
              +254 708 986 101
            </ContactItem>
            <ContactItem>
              <ContactIcon>📞</ContactIcon>
              +254 740 652 145
            </ContactItem>
            <ContactItem>
              <ContactIcon>✉️</ContactIcon>
              tivee254@gmail.com
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