import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import { Package, MapPin, CreditCard } from "lucide-react";

export default function Orders({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select(`id, total, status, created_at, order_items(*)`)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setOrders([]);
      } else {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6ecd6] text-center px-4">
        <h2 className="text-xl font-semibold text-amber-900 mb-2">
          Please Log In
        </h2>
        <button
          onClick={() => (window.location.href = "/auth")}
          className="px-6 py-2 bg-amber-900 text-white rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6ecd6]">
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6ecd6] px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <h1 className="text-2xl sm:text-4xl font-bold text-black mb-2">
          Hi! {user?.email?.split("@")[0]}
        </h1>

        <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">
          My Orders
        </h2>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <Package size={60} className="text-amber-900 opacity-60" />
            <p>No orders yet</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-5 sm:mb-6 border"
            >

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5 sm:mb-6">

                <div className="break-all">
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-semibold text-xs sm:text-sm">
                    {order.id}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-semibold text-sm">
                    {new Date(order.created_at).toDateString()}
                  </p>
                </div>

                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm w-fit">
                  {order.status}
                </span>
              </div>

              <hr className="mb-5 sm:mb-6" />

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Items */}
                <div>
                  <h3 className="font-semibold mb-3">Items</h3>

                  {order.order_items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm mb-2 gap-2"
                    >
                      <span className="break-words">
                        {item.name} (x{item.quantity})
                      </span>
                      <span className="whitespace-nowrap">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  ))}

                  {/* Address */}
                  <div className="mt-5 sm:mt-6">
                    <h3 className="flex items-center gap-2 font-semibold mb-2">
                      <MapPin size={16} /> Shipping Address
                    </h3>
                    <p className="text-sm text-gray-600 break-all">
                      {user?.email}
                    </p>
                  </div>
                </div>

                {/* Payment */}
                <div>
                  <h3 className="flex items-center gap-2 font-semibold mb-3">
                    <CreditCard size={16} /> Payment & Total
                  </h3>

                  <div className="flex justify-between text-sm mb-1">
                    <span>Subtotal</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm mb-1">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>

                  <div className="flex justify-between text-sm mb-3">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>

                  <hr />

                  <div className="flex justify-between font-bold mt-3 text-lg">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}