import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/supabaseClient";

const ADMIN_CODE = "AMBER2026";

export default function AdminLogin() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      setError("Login as user first");
      return;
    }

    const email = data.user.email;

    if (!email.endsWith("@ambernmusk.com")) {
      setError("Not authorized as admin");
      return;
    }

    if (code !== ADMIN_CODE) {
      setError("Invalid passcode");
      return;
    }

    localStorage.setItem("isAdmin", "true");
    localStorage.removeItem("isUser");

     navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6ecd6]">
      <div className="bg-white p-8 rounded-xl shadow w-[350px]">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Admin Access
        </h2>

        <input
          type="password"
          placeholder="Enter Passcode"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded mt-3"
        >
          Enter Dashboard
        </button>
      </div>
    </div>
  );
}
