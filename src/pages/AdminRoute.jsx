import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../config/supabaseClient";

export default function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user?.email?.endsWith("@ambernmusk.com")) {
        setIsAdmin(true);
      }

      setLoading(false);
    };

    checkAdmin();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!isAdmin) return <Navigate to="/admin-login" />;

  return children;
}