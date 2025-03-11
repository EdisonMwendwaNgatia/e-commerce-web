import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { ref, set, push } from "firebase/database";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logoImg from "../images/logo.jpg"; // Adjust path as needed

// Styled Components
const PageContainer = styled.div`
  font-family: "Poppins", sans-serif;
  color: #4a4a4a;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// Navbar Styles
const NavbarContainer = styled.nav`
  background-color: #fcfaf7;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
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

const LogoImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #3a6a47;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const BrandName = styled.span`
  color: #3a6a47;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1;
`;

const TagLine = styled.span`
  color: #c19a6b;
  font-size: 0.9rem;
  font-family: "Playfair Display", serif;
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

const NavLink = styled(Link)`
  color: #4a4a4a;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;

  &:hover {
    color: #3a6a47;

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
    background-color: #3a6a47;
    transition: width 0.3s ease;
  }
`;

const CartIcon = styled(Link)`
  position: relative;
  color: #3a6a47;
  font-size: 1.5rem;
  text-decoration: none;
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #c19a6b;
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

// Checkout Page Styles
const CheckoutContainer = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fcfaf7;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  flex: 1;
`;

const CheckoutHeader = styled.h2`
  color: #3a6a47;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
  position: relative;

  &:after {
    content: "";
    display: block;
    width: 60px;
    height: 3px;
    background-color: #c19a6b;
    margin: 0.5rem auto;
  }
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartSummary = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  height: fit-content;
`;

const SummaryHeader = styled.h3`
  color: #3a6a47;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f0f0f0;
`;

const ItemsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const CartItem = styled.li`
  padding: 0.8rem 0;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.span`
  display: flex;
  align-items: center;

  &:before {
    content: "•";
    color: #3a6a47;
    margin-right: 8px;
    font-size: 1.5rem;
  }
`;

const ItemPrice = styled.span`
  font-weight: 500;
`;

const TotalAmount = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 2px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 1.2rem;

  span:last-child {
    color: #3a6a47;
  }
`;

const CheckoutForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4a4a4a;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3a6a47;
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3a6a47;
  }
`;

const PaymentInstructions = styled.div`
  background-color: #f8f8f8;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #3a6a47;
  margin: 1.5rem 0;
`;

const InstructionsTitle = styled.h3`
  color: #3a6a47;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const InstructionsList = styled.ol`
  padding-left: 1.2rem;
  margin: 0;

  li {
    margin-bottom: 0.5rem;
    line-height: 1.5;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const TermsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #3a6a47;
`;

const TermsLink = styled(Link)`
  color: #3a6a47;
  text-decoration: underline;
`;

const OrderButton = styled.button`
  background-color: #3a6a47;
  color: white;
  border: none;
  padding: 1rem;
  font-size: 1.1rem;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    background-color: #2c5338;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(58, 106, 71, 0.2);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
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
  font-family: "Playfair Display", serif;
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
    content: "";
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

// Navbar Component
const Navbar = () => {
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
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <CartIcon to="/cart">
            🛒
            {cart.length > 0 && <CartCount>{cart.length}</CartCount>}
          </CartIcon>
        </NavLinks>
      </NavInner>
    </NavbarContainer>
  );
};

// Footer Component
const Footer = () => {
  return (
    <>
      <FooterContainer>
        <FooterContent>
          <FooterSection>
            <FooterLogo>TIVEE</FooterLogo>
            <FooterTagline>organics</FooterTagline>
            <FooterDescription>
              Providing high-quality organic products that promote health,
              sustainability, and environmental consciousness.
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
};

// Main Checkout Component
const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [form, setForm] = useState({
    location: "",
    email: "",
    phone: "",
    fullName: "",
    mpesaConfirmation: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const locations = [
    "Karen",
    "Langata",
    "Lavington",
    "Gigiri",
    "Muthaiga",
    "Brookside",
    "Spring Valley",
    "Loresho",
    "Kilimani",
    "Kileleshwa",
    "Hurlingham",
    "Runda",
    "Kitisuru",
    "Nyari",
    "Kyuna",
    "Lower Kabete",
    "Westlands",
    "Highridge",
    "Kangemi",
    "Kawangware",
    "Dagoretti",
    "Buruburu",
    "Eastleigh",
    "Embakasi",
    "Donholm",
    "Githurai",
    "Huruma",
    "Kahawa West",
    "Kayole",
    "Kibera",
    "Madaraka Estate",
    "Mathare",
    "Ngara",
    "Pangani",
    "Parklands",
    "Ruai",
    "South B",
    "South C",
    "Umoja",
    "Upper Hill",
  ];

  useEffect(() => {
    if (!user) {
      navigate("/register"); // Redirect if not logged in
    }
    setTotalAmount(
      cart.reduce((total, item) => total + item.price * item.quantity, 0)
    );
  }, [user, cart, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const allFieldsFilled = Object.values(form).every(
    (value) => value.trim() !== ""
  );
  const isOrderButtonDisabled = !(allFieldsFilled && agreed && cart.length > 0);

  const handleOrder = () => {
    if (isOrderButtonDisabled) return; // Prevent ordering if conditions are not met

    // Save order to Firebase
    const orderRef = push(ref(db, `orders/${user.uid}`));
    set(orderRef, {
      ...form,
      cart,
      totalAmount,
      userId: user.uid,
      timestamp: Date.now(),
    });

    // Open Gmail with order details
    const orderDetails = `
      Full Name: ${form.fullName}
      Email: ${form.email}
      Phone: ${form.phone}
      Location: ${form.location}
      Mpesa Confirmation: ${form.mpesaConfirmation}
      Total Amount: Ksh ${totalAmount}
      Items:
      ${cart
        .map(
          (item) =>
            `- ${item.name} (x${item.quantity}) - Ksh ${
              item.price * item.quantity
            }`
        )
        .join("\n")}
    `;

    const mailto = `mailto:ryanedinson@gmail.com?subject=New Order&body=${encodeURIComponent(
      orderDetails
    )}`;
    window.location.href = mailto;
  };

  return (
    <PageContainer>
      <Navbar />

      <CheckoutContainer>
        <CheckoutHeader>Complete Your Order</CheckoutHeader>

        <CheckoutGrid>
          <CheckoutForm>
            <FormGroup>
              <Label>Delivery Location:</Label>
              <Select
                name="location"
                value={form.location}
                onChange={handleChange}
                required
              >
                <option value="">Select Location</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Email Address:</Label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Phone Number:</Label>
              <Input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Full Name:</Label>
              <Input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>M-Pesa Confirmation Code:</Label>
              <Input
                type="text"
                name="mpesaConfirmation"
                value={form.mpesaConfirmation}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <PaymentInstructions>
              <InstructionsTitle>M-Pesa Payment Instructions</InstructionsTitle>
              <InstructionsList>
                <li>
                  Access M-Pesa Menu: Open the SIM toolkit or the M-Pesa
                  application on your phone.
                </li>
                <li>Select "Lipa na M-Pesa".</li>
                <li>Select "Pay Bill".</li>
                <li>
                  Enter Business Number (Paybill Number): Use the number
                  provided by the business.
                </li>
                <li>
                  Enter Account Number: Use the reference number provided.
                </li>
                <li>Enter the amount: Ksh {totalAmount}</li>
                <li>Enter your M-Pesa PIN to authorize the transaction.</li>
                <li>Confirm transaction details and submit.</li>
                <li>Receive confirmation SMS from M-Pesa.</li>
                <li>Keep the confirmation message for your records.</li>
              </InstructionsList>
            </PaymentInstructions>

            <TermsWrapper>
              <CheckboxInput
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                id="terms-checkbox"
              />
              <Label htmlFor="terms-checkbox">
                I agree to the{" "}
                <TermsLink to="/terms">Terms and Conditions</TermsLink>
              </Label>
            </TermsWrapper>

            <OrderButton onClick={handleOrder} disabled={isOrderButtonDisabled}>
              Place Order
            </OrderButton>
          </CheckoutForm>

          <CartSummary>
            <SummaryHeader>Order Summary</SummaryHeader>

            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ItemsList>
                {cart.map((item) => (
                  <CartItem key={item.id}>
                    <ItemName>
                      {item.name} (x{item.quantity})
                    </ItemName>
                    <ItemPrice>Ksh {item.price * item.quantity}</ItemPrice>
                  </CartItem>
                ))}
              </ItemsList>
            )}

            <TotalAmount>
              <span>Total:</span>
              <span>Ksh {totalAmount}</span>
            </TotalAmount>
          </CartSummary>
        </CheckoutGrid>
      </CheckoutContainer>

      <Footer />
    </PageContainer>
  );
};

export default Checkout;
