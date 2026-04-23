import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { supabase } from "./config/supabaseClient";

import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout"; 
import ScentQuiz from "./pages/ScentQuiz";
import FragranceNotesPage from "./pages/FragranceNotes";
import AuthPage from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Orders from "./pages/Orders";
import Shop from "./pages/Shop";
import Wardrobe from "./pages/Wardrobe";
import { ProductDetail } from "./components/ProductDetail";

import { perfumes } from "./assets/perfumes";
import ReviewsPage from "./pages/Reviews";
import ScrollToTop from "./pages/ScrollToTop";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./pages/AdminRoute"; 
import Hero from "./pages/Hero";
import TestDBConnection from "./test/TestDBConnection.test";
import Vendor from "./pages/Vendor";


function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wardrobe, setWardrobe] = useState([]);
  const [user, setUser] = useState(null);

  // Listen for Supabase auth changes
  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    // Listen for login/logout events
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    const existing = cartItems.find((i) => i.id === product.id);
    if (existing) {
      setCartItems((prev) =>
        prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: (i.quantity || 1) + 1 }
            : i
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Add product to wardrobe
  const addToWardrobe = (product) => {
    if (!wardrobe.find((i) => i.id === product.id)) {
      setWardrobe([...wardrobe, product]);
    }
  };

  return (
    <div className="font-battambang-regular min-h-screen flex flex-col">
      <Navbar cartItems={cartItems} user={user} />
          <ScrollToTop/>

      <main className="flex-grow">
        <Routes>
          <Route path="/home" element={<Home addToCart={addToCart} />} />
          <Route
            path="/shop"
            element={<Shop addToCart={addToCart} addToWardrobe={addToWardrobe} />}
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetail
                perfumes={perfumes}
                addToCart={addToCart}
                addToWardrobe={addToWardrobe}
                wardrobe={wardrobe}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                setCartItems={setCartItems}
                user={user}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cartItems={cartItems}
                setCartItems={setCartItems}
                user={user}
              />
            }
          />
          <Route path="/" element={<Hero />} />
          <Route path="/quiz" element={<ScentQuiz />} />
          <Route path="/notes" element={<FragranceNotesPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/orders" element={<Orders user={user} />} />
          <Route path="/wardrobe" element={<Wardrobe wardrobe={wardrobe} />} />
          <Route path="/reviews" element={<ReviewsPage/>}/>
  <Route path="/admin-login" element={<AdminLogin />} />
    <Route path="/vendor" element={<Vendor/>} />

  <Route path="/TestDBConnection" element={<TestDBConnection />} />

    <Route
      path="/admin"
      element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      }
    />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;