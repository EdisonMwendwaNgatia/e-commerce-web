import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
const RegisterContainer = styled.div`
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

const PasswordStrength = styled.div`
  height: 4px;
  margin-top: 8px;
  border-radius: 2px;
  background-color: ${props => {
    if (!props.value) return "#e0e0e0";
    if (props.value.length < 6) return "#f44336";
    if (props.value.length < 10) return "#ff9800";
    return "#4caf50";
  }};
  width: 100%;
  transition: background-color 0.3s;
`;

const PasswordNote = styled.span`
  display: block;
  font-size: 0.75rem;
  color: #666;
  margin-top: 4px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #555;
  cursor: pointer;
`;

const Checkbox = styled.input`
  margin-right: 8px;
  cursor: pointer;
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
  opacity: ${props => (props.disabled ? 0.7 : 1)};
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
  
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

const LoginText = styled.p`
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

const PrivacyLink = styled(StyledLink)`
  display: inline;
`;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Validate form
  const isFormValid = () => {
    return (
      email.trim() !== "" &&
      password.trim() !== "" &&
      password === confirmPassword &&
      password.length >= 6 &&
      termsAccepted
    );
  };

  // Slide content
  const slides = [
    {
      image: "/images/organic-1.jpg", // Replace with your actual image paths
      title: "Join Our Organic Community",
      text: "Be part of a movement that values health, sustainability, and natural living."
    },
    {
      image: "/images/organic-2.jpg",
      title: "Member Benefits",
      text: "Enjoy exclusive discounts, early access to new products, and personalized recommendations."
    },
    {
      image: "/images/organic-3.jpg",
      title: "Live Organically",
      text: "Start your journey to a healthier lifestyle with our premium organic products."
    }
  ];

  // Rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please use a different email or login instead.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Please use at least 6 characters.");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <RegisterContainer>
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
          <FormTitle>Create Your Account</FormTitle>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Form onSubmit={handleRegister}>
            <FormGroup>
              <Input 
                type="text" 
                placeholder="Full Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </FormGroup>
            
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
                placeholder="Create Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <PasswordStrength value={password} />
              <PasswordNote>
                {!password && "Password should be at least 6 characters"}
                {password && password.length < 6 && "Password too weak"}
                {password && password.length >= 6 && password.length < 10 && "Password strength: Medium"}
                {password && password.length >= 10 && "Password strength: Strong"}
              </PasswordNote>
            </FormGroup>
            
            <FormGroup>
              <Input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
              />
            </FormGroup>
            
            <CheckboxGroup>
              <CheckboxLabel>
                <Checkbox 
                  type="checkbox" 
                  checked={termsAccepted} 
                  onChange={(e) => setTermsAccepted(e.target.checked)} 
                  required 
                />
                I agree to the <PrivacyLink to="/terms">Terms of Service</PrivacyLink> and <PrivacyLink to="/privacy">Privacy Policy</PrivacyLink>
              </CheckboxLabel>
            </CheckboxGroup>
            
            <SubmitButton 
              type="submit" 
              disabled={!isFormValid()}
            >
              Create Account
            </SubmitButton>
          </Form>
          
          <LoginText>
            Already have an account? <StyledLink to="/login">Sign In</StyledLink>
          </LoginText>
        </FormCard>
      </FormSection>
    </RegisterContainer>
  );
};

export default Register;