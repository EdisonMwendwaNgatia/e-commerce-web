import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { auth } from "../firebase/firebase";
import styled from "styled-components";

// Styled Components
const Card = styled.div`
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 1rem;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  color: #5c4033;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  flex-grow: 1;
`;

const Price = styled.p`
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const StockStatus = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: ${(props) => (props.inStock ? "#7a9a01" : "#d9534f")};
`;

const AddToCartButton = styled.button`
  background-color: #7a9a01;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #5a7501;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Notification = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: fit-content;
  background-color: #7a9a01;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-align: center;
  animation: fadeIn 0.3s, fadeOut 0.3s 1.7s;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-10px); }
  }
`;

const ProductBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${props => props.organic ? "#7a9a01" : "#ff6b6b"};
  color: white;
  font-size: 0.7rem;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-weight: 600;
  text-transform: uppercase;
`;

const CardContainer = styled.div`
  position: relative;
`;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [notification, setNotification] = useState("");

  const handleAddToCart = () => {
    if (!user) {
      navigate("/register");
      return;
    }

    addToCart(product);
    setNotification("Product added to cart!");

    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  return (
    <CardContainer>
      <Card>
        <ProductImage src={product.image} alt={product.name} />
        {product.organic && <ProductBadge organic>Organic</ProductBadge>}
        {product.new && <ProductBadge>New</ProductBadge>}
        <ProductName>{product.name}</ProductName>
        <Description>{product.description.substring(0, 50)}...</Description>
        <Price>Ksh {product.price}</Price>
        <StockStatus inStock={product.availability}>
          {product.availability ? "In Stock" : "Out of Stock"}
        </StockStatus>
        <AddToCartButton 
          onClick={handleAddToCart} 
          disabled={!product.availability}
        >
          Add to Cart
        </AddToCartButton>
      </Card>
      {notification && <Notification>{notification}</Notification>}
    </CardContainer>
  );
};

export default ProductCard;