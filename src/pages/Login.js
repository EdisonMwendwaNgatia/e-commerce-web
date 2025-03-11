import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import styled, { keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Poppins', sans-serif;
`;

const ImageSection = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  display: none;
  
  @media (min-width: 768px) {
    display: block;
  }
`;

const Slide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.active ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const SlideContent = styled.div`
  position: absolute;
  bottom: 60px;
  left: 40px;
  color: white;
  max-width: 70%;
  animation: ${fadeIn} 1s ease-in-out;
`;

const SlideTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const SlideText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  animation: ${fadeIn} 0.8s ease-in-out;
`;

const Logo = styled.div`
  margin-bottom: 2rem;
  animation: ${slideIn} 0.8s ease-in-out;
`;

const LogoImage = styled.img`
  height: 60px;
  margin-bottom: 10px;
`;

const LogoText = styled.h1`
  color: #2e7d32;
  font-size: 1.8rem;
  text-align: center;
  font-weight: 700;
`;

const FormCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  animation: ${slideIn} 0.8s ease-in-out;
`;

const FormTitle = styled.h2`
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FormGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s;
  background-color: #f9f9f9;
  
  &:focus {
    border-color: #2e7d32;
    box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
    outline: none;
    background-color: white;
  }
`;

const SubmitButton = styled.button`
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 0.5rem;
  
  &:hover {
    background-color: #1b5e20;
    animation: ${pulse} 0.5s ease-in-out;
  }
`;

const ErrorMessage = styled.p`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 0.8rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  animation: ${slideIn} 0.5s ease-in-out;
`;

const SignupText = styled.p`
  margin-top: 1.5rem;
  text-align: center;
  color: #666;
  font-size: 0.95rem;
`;

const StyledLink = styled(Link)`
  color: #2e7d32;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
  
  &:hover {
    color: #1b5e20;
    text-decoration: underline;
  }
`;

const ForgotPassword = styled(StyledLink)`
  display: block;
  text-align: right;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Slide content
  const slides = [
    {
      image: "/images/organic-1.jpg", // Replace with your actual image paths
      title: "Welcome to TIVEE Organics",
      text: "Your journey to natural wellness begins here."
    },
    {
      image: "/images/organic-2.jpg",
      title: "100% Organic Products",
      text: "Carefully sourced from sustainable farms and producers."
    },
    {
      image: "/images/organic-3.jpg",
      title: "Join Our Community",
      text: "Connect with others who share your passion for organic living."
    }
  ];

  // Rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } catch (err) {
      setError(
        err.code === "auth/invalid-credential"
          ? "Invalid email or password. Please try again."
          : err.message
      );
    }
  };

  return (
    <LoginContainer>
      <ImageSection>
        {slides.map((slide, index) => (
          <Slide 
            key={index} 
            image={slide.image} 
            active={currentSlide === index}
          >
            {currentSlide === index && (
              <SlideContent>
                <SlideTitle>{slide.title}</SlideTitle>
                <SlideText>{slide.text}</SlideText>
              </SlideContent>
            )}
          </Slide>
        ))}
      </ImageSection>
      
      <FormSection>
        <Logo>
          <LogoImage src="/images/logo.jpeg" alt="TIVEE Organics" />
          <LogoText>TIVEE ORGANICS</LogoText>
        </Logo>
        
        <FormCard>
          <FormTitle>Welcome Back</FormTitle>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Input 
                type="email" 
                placeholder="Email Address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <Input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <ForgotPassword to="/forgot-password">Forgot password?</ForgotPassword>
            </FormGroup>
            
            <SubmitButton type="submit">Sign In</SubmitButton>
          </Form>
          
          <SignupText>
            Don't have an account yet? <StyledLink to="/register">Create Account</StyledLink>
          </SignupText>
        </FormCard>
      </FormSection>
    </LoginContainer>
  );
};

export default Login;