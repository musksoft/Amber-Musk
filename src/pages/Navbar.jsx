import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { supabase } from "../config/supabaseClient";

const Navbar = ({ cartItems }) => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef();

 useEffect(() => {
  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };

  getUser();

  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      setUser(session?.user || null);
    }
  );

  return () => {
    listener.subscription.unsubscribe();
  };
}, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 w-full bg-[#FFFAEE] shadow-md z-50">
      <div className="max-w-6xl mx-auto flex items-center px-6 py-4">
        
        {/* LEFT: Brand */}
        <div className="flex-1 text-[30px] font-semibold text-amber-900">
          <Link to="/" className="font-giomori">
            Amber&Musk
          </Link>
        </div>

        {/* CENTER: Nav Links */}
        <div className="hidden md:flex flex-1 justify-center gap-6">
          <Link to="/home" className="hover:text-amber-700">Home</Link>
          <Link to="/quiz" className="hover:text-amber-700">Scent Quiz</Link>
          <Link to="/shop" className="hover:text-amber-700">Shop</Link>
          <Link to="/notes" className="hover:text-amber-700">Fragrance Notes</Link>
        </div>

        <div className="flex-1 flex justify-end items-center gap-5">

          {/* Cart */}
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart size={28} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="cursor-pointer flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation(); // ✅ prevents instant close

                if (!user) {
                  navigate("/auth");
                } else {
                  setDropdownOpen(!dropdownOpen);
                }
              }}
            >
              <User size={28} />
          
            </div>

            {/* Dropdown */}
            {dropdownOpen && user && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border z-50"
                onClick={(e) => e.stopPropagation()} 
              >
                <div className="px-4 py-2 border-b font-semibold text-gray-700">
                  {user.email.split("@")[0]}
                </div>

                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/orders");
                  }}
                >
                  My Orders
                </div>

              

                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                  onClick={async () => {
                    await supabase.auth.signOut();
                    setUser(null);
                    setDropdownOpen(false);
                    navigate("/home");
                  }}
                >
                  Logout
                </div>
              </div>
            )}
          </div>

          {/*  (mobile) */}
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={28} />
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-[250px] bg-[#FFFAEE] shadow-lg transform transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-amber-900 font-semibold">Menu</span>
          <X className="cursor-pointer" onClick={() => setMenuOpen(false)} />
        </div>

        <div className="flex flex-col gap-6 p-6">
          <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/quiz" onClick={() => setMenuOpen(false)}>Scent Quiz</Link>
          <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/notes" onClick={() => setMenuOpen(false)}>Fragrance Notes</Link>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;