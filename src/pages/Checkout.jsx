import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/supabaseClient";

const Checkout = ({ cartItems, setCartItems, user }) => {
  const navigate = useNavigate();

  if (!user) {
    navigate("/auth");
    return null;
  }

  const [paymentMethod, setPaymentMethod] = useState("online");
  const [cardDetails, setCardDetails] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  const handleInputChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (paymentMethod === "online") {
      if (!cardDetails.name.trim()) newErrors.name = "Name on card is required";
      if (!/^\d{16}$/.test(cardDetails.cardNumber.replace(/\s+/g, "")))
        newErrors.cardNumber = "Enter a valid 16-digit card number";
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry))
        newErrors.expiry = "Enter expiry date in MM/YY format";
      if (!/^\d{3}$/.test(cardDetails.cvv))
        newErrors.cvv = "Enter a valid 3-digit CVV";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      //  Insert order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([{ user_id: user.id, total }])
        .select()
        .single();

      if (orderError) throw orderError;

      //  Insert order items
      const orderItemsData = cartItems.map((item) => ({
        order_id: order.id,
        product_id: parseInt(item.id), // ensure integer for DB
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItemsData);

      if (itemsError) throw itemsError;

      alert(`Order placed successfully! Total Paid: $${total}`);

      setCartItems([]); // clear cart
      navigate("/orders");
    } catch (error) {
      console.error(error);
      alert("Failed to place order: " + error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Order summary */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cartItems.map((item, i) => (
          <div key={i} className="flex justify-between mb-2">
            <span>
              {item.name} (x{item.quantity || 1})
            </span>
            <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
          </div>
        ))}
        <hr className="my-4" />
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      {/* Payment form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="font-semibold mb-2 block">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="online">Online Payment</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>

        {paymentMethod === "online" && (
          <>
            <div>
              <label className="block mb-1 font-semibold">Name on Card</label>
              <input
                type="text"
                name="name"
                value={cardDetails.name}
                onChange={handleInputChange}
                className={`w-full border px-3 py-2 rounded ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block mb-1 font-semibold">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
                maxLength={19}
                placeholder="1234 5678 9012 3456"
                className={`w-full border px-3 py-2 rounded ${
                  errors.cardNumber ? "border-red-500" : ""
                }`}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
              )}
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-1 font-semibold">Expiry (MM/YY)</label>
                <input
                  type="text"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  className={`w-full border px-3 py-2 rounded ${
                    errors.expiry ? "border-red-500" : ""
                  }`}
                />
                {errors.expiry && (
                  <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                )}
              </div>

              <div className="flex-1">
                <label className="block mb-1 font-semibold">CVV</label>
                <input
                  type="password"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                  maxLength={3}
                  className={`w-full border px-3 py-2 rounded ${
                    errors.cvv ? "border-red-500" : ""
                  }`}
                />
                {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;