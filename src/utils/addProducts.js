import { db } from "../firebase/firebase";
import { ref, set } from "firebase/database";

const products = [
    {
      id: "1",
      name: "Matte Lipstick",
      description: "Long-lasting matte finish",
      price: 1200,
      category: "Lipstick",
      image: "/images/lipstick.jpg",
      availability: true
    },
    {
      id: "2",
      name: "Foundation",
      description: "Oil-free full coverage",
      price: 2500,
      category: "Foundation",
      image: "/images/foundation.jpg",
      availability: true
    },
    {
      id: "3",
      name: "Eyeliner",
      description: "Waterproof liquid eyeliner",
      price: 800,
      category: "Eyeliner",
      image: "/images/eyeliner.jpg",
      availability: true
    },
    {
      id: "4",
      name: "Mascara",
      description: "Volumizing and lengthening mascara",
      price: 1500,
      category: "Mascara",
      image: "/images/mascara.jpg",
      availability: true
    },
    {
      id: "5",
      name: "Blush",
      description: "Powder blush with natural finish",
      price: 1800,
      category: "Blush",
      image: "/images/blush.jpg",
      availability: true
    },
    {
      id: "6",
      name: "Eyeshadow Palette",
      description: "12-shade neutral eyeshadow palette",
      price: 3500,
      category: "Eyeshadow",
      image: "/images/eyeshadow.jpg",
      availability: true
    },
    {
      id: "7",
      name: "Concealer",
      description: "Creamy under-eye concealer",
      price: 1600,
      category: "Concealer",
      image: "/images/concealer.jpg",
      availability: true
    },
    {
      id: "8",
      name: "Makeup Brushes Set",
      description: "10-piece professional makeup brush set",
      price: 4000,
      category: "Brushes",
      image: "/images/brushes.jpg",
      availability: true
    },
    {
      id: "9",
      name: "Setting Powder",
      description: "Translucent setting powder",
      price: 2000,
      category: "Powder",
      image: "/images/powder.jpg",
      availability: true
    },
    {
      id: "10",
      name: "Lip Gloss",
      description: "High-shine lip gloss",
      price: 1000,
      category: "Lip Gloss",
      image: "/images/lipgloss.jpg",
      availability: true
    },
    {
      id: "11",
      name: "Highlighter",
      description: "Liquid shimmer highlighter",
      price: 1900,
      category: "Highlighter",
      image: "/images/highlighter.jpg",
      availability: true
    },
    {
      id: "12",
      name: "Brow Pencil",
      description: "Precision brow defining pencil",
      price: 900,
      category: "Brows",
      image: "/images/browpencil.jpg",
      availability: true
    },
      {
      id: "13",
      name: "Facial Cleanser",
      description: "Gentle foaming facial cleanser",
      price: 1700,
      category: "Skincare",
      image: "/images/cleanser.jpg",
      availability: true
    },
      {
      id: "14",
      name: "Moisturizer",
      description: "Hydrating daily moisturizer",
      price: 2200,
      category: "Skincare",
      image: "/images/moisturizer.jpg",
      availability: true
    },
      {
      id: "15",
      name: "Sunscreen",
      description: "SPF 50 broad spectrum sunscreen",
      price: 1400,
      category: "Skincare",
      image: "/images/sunscreen.jpg",
      availability: true
    },
      {
      id: "16",
      name: "Lip Balm",
      description: "Nourishing lip balm with shea butter",
      price: 600,
      category: "Lip Care",
      image: "/images/lipbalm.jpg",
      availability: true
    },
      {
      id: "17",
      name: "Makeup Remover",
      description: "Gentle oil-based makeup remover",
      price: 1300,
      category: "Skincare",
      image: "/images/remover.jpg",
      availability: true
    },
      {
      id: "18",
      name: "Nail Polish",
      description: "Long-wear nail polish in vibrant red",
      price: 700,
      category: "Nails",
      image: "/images/nailpolish.jpg",
      availability: true
    },
      {
      id: "19",
      name: "Perfume",
      description: "Floral and fruity women's perfume",
      price: 4500,
      category: "Fragrance",
      image: "/images/perfume.jpg",
      availability: true
    },
      {
      id: "20",
      name: "Hair Mask",
      description: "Deep conditioning hair mask",
      price: 2800,
      category: "Hair Care",
      image: "/images/hairmask.jpg",
      availability: true
    }
  ];

const addProductsToFirebase = () => {
  products.forEach((product) => {
    set(ref(db, "products/" + product.id), product)
      .then(() => console.log(`Added: ${product.name}`))
      .catch((error) => console.error("Error adding product:", error));
  });
};

export default addProductsToFirebase;
