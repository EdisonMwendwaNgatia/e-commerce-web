import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { ref, set, onValue } from "firebase/database";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const cartRef = ref(db, `carts/${user.uid}`);
      onValue(cartRef, (snapshot) => {
        if (snapshot.exists()) {
          setCart(snapshot.val());
          localStorage.setItem("cart", JSON.stringify(snapshot.val()));
        } else {
          setCart([]);
        }
      });
    } else {
      const storedCart = localStorage.getItem("cart");
      setCart(storedCart ? JSON.parse(storedCart) : []);
    }
  }, [user]);

  const saveCartToFirebase = (updatedCart) => {
    if (user) {
      set(ref(db, `carts/${user.uid}`), updatedCart);
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const addToCart = (product) => {
    if (!user) return;
    const existingProduct = cart.find((item) => item.id === product.id);
    let updatedCart;
    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);
    saveCartToFirebase(updatedCart);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    saveCartToFirebase(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    saveCartToFirebase(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};