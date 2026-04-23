import React, { useState } from "react";
import { supabase } from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      const userId = data.user.id;

      const { data: existingUser } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (!existingUser) {
        await supabase.from("users").insert({
          id: userId,
          full_name: "", // optional, user can update later
          email: formData.email,
          phone: "",
          address: "",
        });
      }

      alert("Login successful!");
      navigate("/"); // redirect to home
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f5e6de]">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-[#5c3a21]">Welcome Back</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="p-3 border-b"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="p-3 border-b"
          required
        />
        <button
          type="submit"
          className="bg-[#5c3a21] text-white py-3 mt-4"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}