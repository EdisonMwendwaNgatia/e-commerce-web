import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { ref, onValue } from "firebase/database";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useRef } from "react";
import FloatingWhatsApp from "../components/FloatingWhatsapp";

// Styled Components
const DashboardContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #f9f9f9;
`;

const HeroSection = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.currentImage});
  background-size: cover;
  background-position: center;
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
  border-radius: 8px;
  transition: background-image 1s ease-in-out;
  min-height: 300px;

   display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 1.5rem;
`;

const SearchFilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #7a9a01;
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #7a9a01;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const NoProducts = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  padding: 3rem 0;
`;

const CategoryTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const CategoryTab = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.active ? "#7a9a01" : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#7a9a01" : "#f0f0f0")};
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #5c4033;
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background-color: #7a9a01;
  }
`;

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [categories, setCategories] = useState([]);

  const SlideShowHero = ({ children }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
      "/images/logo.jpg",
      "/images/organic-2.jpg",
      "/images/organic-3.jpg",
      "/images/organic-4.jpg",
      "/images/organic-5.jpg",
      // Add more image paths as needed
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }, [images.length]);

    return (
      <HeroSection currentImage={images[currentImageIndex]}>
        {children}
      </HeroSection>
    );
  };

  const footerRef = useRef(null);

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const productsRef = ref(db, "products");
    onValue(productsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const productArray = Object.values(data);
        setProducts(productArray);

        // Extract unique categories for the tabs
        const uniqueCategories = [
          ...new Set(productArray.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      }
    });
  }, []);

  // Filtering logic
  const filteredProducts = products.filter((product) => {
    return (
      (searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterCategory === "" || product.category === filterCategory) &&
      (filterPrice === "" || product.price <= filterPrice)
    );
  });

  return (
    <DashboardContainer>
      <Navbar scrollToFooter={scrollToFooter} />

      <MainContent>
        <SlideShowHero>
          <HeroTitle>Natural Products for a Better Life</HeroTitle>
          <HeroSubtitle>
            Discover our range of organic, eco-friendly products that promote
            health, sustainability, and well-being.
          </HeroSubtitle>
        </SlideShowHero>

        <SearchFilterContainer>
          <SearchInput
            type="text"
            placeholder="Search products..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterSelect onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Lipstick">Lipstick</option>
            <option value="Foundation">Foundation</option>
            <option value="Eyeliner">Eyeliner</option>
          </FilterSelect>
          <FilterSelect onChange={(e) => setFilterPrice(e.target.value)}>
            <option value="">All Prices</option>
            <option value="1000">Under 1000</option>
            <option value="2000">Under 2000</option>
            <option value="3000">Under 3000</option>
          </FilterSelect>
        </SearchFilterContainer>

        <CategoryTabs>
          <CategoryTab
            active={filterCategory === ""}
            onClick={() => setFilterCategory("")}
          >
            All
          </CategoryTab>
          {categories.map((category) => (
            <CategoryTab
              key={category}
              active={filterCategory === category}
              onClick={() => setFilterCategory(category)}
            >
              {category}
            </CategoryTab>
          ))}
        </CategoryTabs>

        <SectionTitle>Our Products</SectionTitle>

        <ProductGrid>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <NoProducts>No products found matching your criteria.</NoProducts>
          )}
        </ProductGrid>
      </MainContent>
      <FloatingWhatsApp/>

      <Footer ref={footerRef} />
    </DashboardContainer>
  );
};

export default Dashboard;
