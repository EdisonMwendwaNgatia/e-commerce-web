import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";

// Styled Components
const CartPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
  background-color: #fcfaf7;
  color: #4a4a4a;
`;

const CartHeader = styled.h2`
  color: #3a6a47;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background-color: #c19a6b;
    margin: 0.5rem auto;
  }
`;

const EmptyCartMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #6b6b6b;
  margin: 3rem 0;
`;

const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const CartItem = styled.div`
  display: flex;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  border-left: 4px solid #3a6a47;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CartItemImage = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const CartItemDetails = styled.div`
  padding: 1.5rem;
  flex: 1;
`;

const ItemName = styled.h3`
  color: #3a6a47;
  margin-top: 0;
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const ItemDescription = styled.p`
  color: #6b6b6b;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const ItemPrice = styled.p`
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const StockInfo = styled.p`
  color: ${props => props.inStock ? '#3a6a47' : '#d63031'};
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const QuantityInput = styled.input`
  width: 60px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 1rem;
  text-align: center;
  
  &:focus {
    outline: none;
    border-color: #3a6a47;
  }
`;

const RemoveButton = styled.button`
  background: transparent;
  color: #d63031;
  border: 1px solid #d63031;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
  
  &:hover {
    background-color: #d63031;
    color: white;
  }
`;

const TotalSection = styled.div`
  text-align: right;
  margin: 2rem 0;
`;

const TotalAmount = styled.h3`
  color: #3a6a47;
  font-size: 1.5rem;
  font-weight: 500;
`;

const CheckoutButton = styled.button`
  background-color: #3a6a47;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin-left: auto;
  font-weight: 500;
  
  &:hover {
    background-color: #2c5338;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(58, 106, 71, 0.2);
  }
`;

const LeafIcon = styled.span`
  position: relative;
  display: inline-block;
  margin-right: 8px;
  
  &:before {
    content: '•';
    color: #3a6a47;
    font-size: 1.5rem;
  }
`;

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) navigate("/register");
    });
    return () => unsubscribe();
  }, [navigate]);

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handler for quantity changes that validates and handles empty inputs
  const handleQuantityChange = (id, value) => {
    // Handle empty inputs or non-numeric inputs
    if (value === "" || isNaN(value)) {
      updateQuantity(id, 1); // Default to 1 if invalid
      return;
    }
    
    // Convert to number and ensure it's at least 1
    const quantity = Math.max(1, parseInt(value, 10));
    updateQuantity(id, quantity);
  };

  return (
    <>
      <Navbar />
      <CartPageContainer>
        <CartHeader>Your TIVEE Organics Cart</CartHeader>

        {cart.length === 0 ? (
          <EmptyCartMessage>Your cart is empty. Explore our organic products!</EmptyCartMessage>
        ) : (
          <CartItemsContainer>
            {cart.map((item) => (
              <CartItem key={item.id}>
                <CartItemImage src={item.image} alt={item.name} />
                <CartItemDetails>
                  <ItemName><LeafIcon />{item.name}</ItemName>
                  <ItemDescription>{item.description}</ItemDescription>
                  <ItemPrice>Price: Ksh {item.price.toLocaleString()}</ItemPrice>
                  <StockInfo inStock={item.availability}>
                    {item.availability ? "In Stock" : "Out of Stock"}
                  </StockInfo>
                  <div>
                    <QuantityInput
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      onBlur={(e) => {
                        // Ensure a valid value on blur
                        if (e.target.value === "" || isNaN(e.target.value) || parseInt(e.target.value) < 1) {
                          updateQuantity(item.id, 1);
                        }
                      }}
                    />
                    <RemoveButton onClick={() => removeFromCart(item.id)}>Remove</RemoveButton>
                  </div>
                </CartItemDetails>
              </CartItem>
            ))}
          </CartItemsContainer>
        )}

        <TotalSection>
          <TotalAmount>Total: Ksh {totalAmount.toLocaleString()}</TotalAmount>
        </TotalSection>
        
        {cart.length > 0 && (
          <CheckoutButton onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </CheckoutButton>
        )}
      </CartPageContainer>
      <Footer />
    </>
  );
};

export default Cart;