import React from "react";
import { supabase } from "../config/supabaseClient";

export default function TestDBConnection() {
  const testConnection = async () => {
    try {
      // Simple query to fetch all users
      const { data, error } = await supabase.from("users").select("*");
      if (error) throw error;
      console.log("Database response:", data);
      alert("Check console for database output!");
    } catch (err) {
      console.error("Database connection error:", err.message);
      alert("Error connecting to database. Check console.");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4">Supabase DB Connection Test</h1>
      <button
        onClick={testConnection}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Test Database
      </button>
    </div>
  );
}