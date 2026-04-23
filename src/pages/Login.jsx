import React, { useState } from "react";
import { supabase } from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const leftImage = isLogin ? "brownrose.png" : "elegant.png";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        alert("Login successful!");
        navigate("/orders"); 
      } else {
        const { data: authData, error: authError } =
          await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
          });

        if (authError) throw authError;

        const userId = authData.user.id;

        const { error: dbError } = await supabase.from("users").insert([
          {
            id: userId,
            full_name: formData.full_name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
          },
        ]);

        if (dbError) throw dbError;

        alert(
          "Account created successfully! Please verify your email before logging in."
        );

        setIsLogin(true);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5e6de] font-battambang-regular flex flex-col">

      <div className="h-12 bg-[#5c3a21] text-white flex items-center px-4"></div>

      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto flex justify-center py-8 px-4">
        <div className="flex flex-col md:flex-row w-full max-w-2xl shadow-xl rounded-md overflow-hidden bg-white">

          {/* Left Image Section */}
          <div
            className={`hidden md:block md:w-1/2 bg-cover bg-center ${
              isLogin ? "md:order-2" : "md:order-1"
            }`}
            style={{
              backgroundImage: `url("./${leftImage}")`,
              backgroundBlendMode: "overlay",
              backgroundColor: "rgba(245,230,222,0.5)",
              minHeight: "500px",
            }}
          >
            <div className="h-full w-full bg-gradient-to-b from-transparent to-white/20"></div>
          </div>

          {/* Right Form Section */}
          <div
            className={`w-full md:w-1/2 flex flex-col justify-center px-6 py-6 md:py-8 ${
              isLogin ? "md:order-1" : "md:order-2"
            }`}
          >
            <h2 className="text-2xl md:text-4xl font-aboreto-regular font-extrabold mb-6 text-[#5c3a21] text-left">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>

            {/* Form */}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

              {!isLogin && (
                <div className="flex flex-col">
                  <label className="mb-1 text-[#5c3a21] text-sm">Full Name</label>
                  <input
                    name="full_name"
                    type="text"
                    placeholder="John Doe"
                    onChange={handleChange}
                    className="p-3 border-b border-[#d9c5b2] bg-transparent placeholder-[#b89b87] text-sm focus:outline-none focus:border-[#a37e61]"
                  />
                </div>
              )}

              <div className="flex flex-col">
                <label className="mb-1 text-[#5c3a21] text-sm">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  onChange={handleChange}
                  className="p-3 border-b border-[#d9c5b2] bg-transparent placeholder-[#b89b87] text-sm focus:outline-none focus:border-[#a37e61]"
                />
              </div>

              {!isLogin && (
                <div className="flex flex-col">
                  <label className="mb-1 text-[#5c3a21] text-sm">Phone</label>
                  <input
                    name="phone"
                    type="text"
                    placeholder="+1 (555) 000-0000"
                    onChange={handleChange}
                    className="p-3 border-b border-[#d9c5b2] bg-transparent placeholder-[#b89b87] text-sm focus:outline-none focus:border-[#a37e61]"
                  />
                </div>
              )}

              {!isLogin && (
                <div className="flex flex-col">
                  <label className="mb-1 text-[#5c3a21] text-sm">Address</label>
                  <input
                    name="address"
                    type="text"
                    placeholder="123 Main St, City, State"
                    onChange={handleChange}
                    className="p-3 border-b border-[#d9c5b2] bg-transparent placeholder-[#b89b87] text-sm focus:outline-none focus:border-[#a37e61]"
                  />
                </div>
              )}

              <div className="flex flex-col">
                <label className="mb-1 text-[#5c3a21] text-sm">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="p-3 border-b border-[#d9c5b2] bg-transparent placeholder-[#b89b87] text-sm focus:outline-none focus:border-[#a37e61]"
                />
              </div>

              {!isLogin && (
                <div className="flex flex-col">
                  <label className="mb-1 text-[#5c3a21] text-sm">Confirm Password</label>
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    onChange={handleChange}
                    className="p-3 border-b border-[#d9c5b2] bg-transparent placeholder-[#b89b87] text-sm focus:outline-none focus:border-[#a37e61]"
                  />
                </div>
              )}

              <button className="mt-4 bg-[#5c3a21] text-white py-3 text-sm font-semibold hover:bg-[#7b5135] transition">
                {loading
                  ? isLogin
                    ? "Logging in..."
                    : "Creating..."
                  : isLogin
                  ? "Login"
                  : "Create Account"}
              </button>
            </form>

            <p className="text-center mt-4 text-xs text-[#a37e61]">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span
                className="ml-1 underline cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="h-12 bg-[#5c3a21] text-white flex items-center justify-center"></div>
    </div>
  );
}