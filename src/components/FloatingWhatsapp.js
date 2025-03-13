import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaWhatsapp } from "react-icons/fa";

// Animations
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const FloatingContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ButtonWrapper = styled.a`
  background: linear-gradient(145deg, #25d366, #128C7E);
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite;
  
  &:hover {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
    animation: none;
  }
`;

const IconWrapper = styled.div`
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Tooltip = styled.div`
  background-color: white;
  color: #333;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  margin-bottom: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.3s ease;
  font-weight: 500;
  display: ${props => props.visible ? 'block' : 'none'};
`;

const FloatingWhatsApp = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = "0740652145";
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <FloatingContainer>
      <Tooltip visible={showTooltip}>Chat with us on WhatsApp!</Tooltip>
      <ButtonWrapper 
        href={whatsappLink} 
        target="_blank" 
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Contact us on WhatsApp"
      >
        <IconWrapper>
          <FaWhatsapp />
        </IconWrapper>
      </ButtonWrapper>
    </FloatingContainer>
  );
};

export default FloatingWhatsApp;