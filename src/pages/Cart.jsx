import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Trash2, Plus, Minus, PackageIcon } from "lucide-react";

const Cart = ({ cartItems, setCartItems, user }) => {
  const navigate = useNavigate();

  // Increment quantity
  const incrementQty = (index) => {
    const updated = [...cartItems];
    updated[index].quantity = (updated[index].quantity || 1) + 1;
    setCartItems(updated);
  };

  // Decrement quantity
  const decrementQty = (index) => {
    const updated = [...cartItems];
    if ((updated[index].quantity || 1) > 1) {
      updated[index].quantity -= 1;
    }
    setCartItems(updated);
  };

  // Remove item
  const removeItem = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  const handleCheckoutClick = () => {
    if (!user) {
      alert("Please login to proceed with checkout.");
      navigate("/auth");
    } else {
      navigate("/checkout");
    }
  };

  if (cartItems.length === 0) {
    return     <div className="min-h-screen bg-[#f3e9d2] flex flex-col items-center justify-center px-4 text-center">
<div className="flex flex-col items-center gap-4">
          
          {/* Icon */}
          <PackageIcon size={60} className="text-amber-900 opacity-60"  ></PackageIcon>
          {/* Title */}
          <h2 className="text-2xl font-semibold text-amber-900">
            Your Wardrobe is Empty
          </h2>

          {/* Subtitle */}
          <p className="text-sm text-gray-500 max-w-sm">
            Save your favorite fragrances here so you can find them easily later.
          </p>

          {/* CTA */}
          <button
            onClick={() => window.location.href = "/shop"}
            className="mt-4 px-6 py-2 bg-amber-900 text-white rounded hover:bg-amber-800 transition"
          >
            Discover Scents
          </button>
        </div>
        </div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>

      {cartItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between border p-4 rounded"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div>
              <p className="text-sm text-gray-500">{item.brand}</p>
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-500">{item.size}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => decrementQty(index)} className="p-1 border rounded">
              <Minus size={16} />
            </button>
            <span>{item.quantity || 1}</span>
            <button onClick={() => incrementQty(index)} className="p-1 border rounded">
              <Plus size={16} />
            </button>

            <button onClick={() => removeItem(index)} className="ml-4 text-red-500">
              <Trash2 size={20} />
            </button>
          </div>

          <p className="font-semibold ml-4">
            ${(item.price * (item.quantity || 1)).toFixed(2)}
          </p>
        </div>
      ))}

      {/* Order Summary */}
      <div className="w-full max-w-md border p-6 rounded mx-auto">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>
            Subtotal ({cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)}{" "}
            items)
          </span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Tax</span>
          <span>${tax}</span>
        </div>
        <hr className="mb-4" />
        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total</span>
          <span>${total}</span>
        </div>

        <button
          onClick={handleCheckoutClick}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
};

export default Cart;