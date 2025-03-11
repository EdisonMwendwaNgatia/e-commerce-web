import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled, { keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -500px 0; }
  100% { background-position: 500px 0; }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 3rem 0;
  background: linear-gradient(135deg, #f8f4ec 0%, #fcfaf7 50%, #f3efe5 100%);
`;

const TermsContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem;
  background: linear-gradient(to bottom, #ffffff, #fafafa);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(92, 64, 51, 0.1);
  animation: ${fadeIn} 0.8s ease-out;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #5c4033, #7a9a01, #c19a6b, #5c4033);
    background-size: 300% 100%;
    animation: ${shimmer} 6s infinite linear;
  }
`;

const PageTitle = styled.h1`
  color: #5c4033;
  font-size: 2.8rem;
  margin-bottom: 2.5rem;
  text-align: center;
  font-weight: 700;
  position: relative;
  background: linear-gradient(90deg, #5c4033, #7a9a01);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 3px;
    background: linear-gradient(90deg, #5c4033, #7a9a01);
    border-radius: 3px;
  }
`;

const Section = styled.div`
  margin-bottom: 2.5rem;
  animation: ${fadeIn} 0.5s ease-out;
  animation-fill-mode: both;
  animation-delay: ${props => props.index * 0.1}s;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
  }
`;

const SectionTitle = styled.h2`
  color: #5c4033;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 24px;
    margin-right: 12px;
    background: linear-gradient(to bottom, #7a9a01, #5c4033);
    border-radius: 4px;
    transition: transform 0.3s ease;
  }
  
  &:hover::before {
    transform: scaleY(1.2);
  }
`;

const Paragraph = styled.p`
  color: #4a4a4a;
  line-height: 1.8;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #333;
  }
`;

const LastUpdated = styled.div`
  font-style: italic;
  color: #777;
  text-align: center;
  margin-top: 4rem;
  padding: 1rem;
  border-radius: 30px;
  background: linear-gradient(to right, rgba(122, 154, 1, 0.1), rgba(92, 64, 51, 0.1));
  font-size: 0.9rem;
  animation: ${pulse} 4s infinite ease-in-out;
`;

const FloatingDecoration = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, rgba(122, 154, 1, 0.05), rgba(92, 64, 51, 0.05));
  border-radius: 50%;
  z-index: -1;
  top: ${props => props.top || '0px'};
  left: ${props => props.left || '0px'};
  right: ${props => props.right || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
  filter: blur(40px);
`;

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using our website, you agree to these terms."
    },
    {
      title: "2. Products and Services",
      content: "We offer organic products for your health and wellbeing. While we strive for accuracy, we do not guarantee error-free descriptions."
    },
    {
      title: "3. Account Registration",
      content: "To make purchases, you may need an account. You are responsible for maintaining your account credentials."
    },
    {
      title: "4. Ordering and Payment",
      content: "Orders placed are offers to purchase. Payments are secured through our payment gateways."
    },
    {
      title: "5. Shipping and Delivery",
      content: "We will ship orders to the address provided. Delivery times are estimated and not guaranteed."
    },
    {
      title: "6. Returns and Refunds",
      content: "Refer to our return policy for eligibility."
    },
    {
      title: "7. Intellectual Property",
      content: "All content on this site belongs to TIVEE Organics and cannot be reused without permission."
    },
    {
      title: "8. User Conduct",
      content: "You agree not to misuse our website."
    },
    {
      title: "9. Limitation of Liability",
      content: "We are not liable for damages arising from your use of our site."
    },
    {
      title: "10. Indemnification",
      content: "You agree to indemnify us from claims due to your use of the site."
    },
    {
      title: "11. Governing Law",
      content: "These Terms are governed by the laws of the United States."
    },
    {
      title: "12. Changes to Terms",
      content: "We may update these Terms. Continued use signifies acceptance."
    },
    {
      title: "13. Contact Information",
      content: "Email: support@tiveeorganics.com | Phone: (555) 123-4567"
    },
    {
      title: "14. Severability",
      content: "If any part of these Terms is invalid, the rest remains enforceable."
    },
    {
      title: "15. Entire Agreement",
      content: "These Terms constitute the entire agreement between you and TIVEE Organics."
    }
  ];

  return (
    <PageContainer>
      <Navbar cartItemCount={0} />
      
      <MainContent>
        <TermsContainer>
          <FloatingDecoration top="-150px" left="-150px" />
          <FloatingDecoration bottom="-100px" right="-100px" />
          
          <PageTitle>Terms and Conditions</PageTitle>
          
          <Paragraph>
            Welcome to TIVEE Organics ("we," "us," or "our"). By accessing and using our website, you agree to comply with and be bound by these Terms and Conditions ("Terms"). If you do not agree with any part of these Terms, you must not use our website.
          </Paragraph>
          
          {sections.map((section, index) => (
            <Section key={index} index={index}>
              <SectionTitle>{section.title}</SectionTitle>
              <Paragraph>{section.content}</Paragraph>
            </Section>
          ))}
          
          <LastUpdated>Last Updated: March 6, 2025</LastUpdated>
        </TermsContainer>
      </MainContent>
      
      <Footer />
    </PageContainer>
  );
};

export default Terms;