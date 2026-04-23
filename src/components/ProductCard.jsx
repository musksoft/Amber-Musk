import React from "react";
import { ShoppingCart, Heart, Star, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function ProductCard({ perfume, addToCart }) {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(perfume);
    navigate("/cart");
  };

  return (
    <div className="group border-amber-700 border-[1.5px] rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/product/${perfume.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100 flex items-center justify-center">
          {perfume.trending && (
            <div className="absolute top-2 left-2 bg-amber-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
              <TrendingUp /> <span>Trending</span>
            </div>
          )}
          {!perfume.inStock && (
            <div className="absolute top-2 right-2 bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs">
              Out of Stock
            </div>
          )}
          <img
            src={perfume.image}
            alt={perfume.name}
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="h-8 w-8 flex items-center justify-center text-gray-500 border rounded-full cursor-pointer">
              <Heart size={16} />
            </div>
          </div>
        </div>
      </Link>

      <div className="p-4 bg-[#fef3de]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-gray-500">{perfume.brand}</span>
          {perfume.vendorVerified && (
            <div className="text-xs h-4 px-1 border rounded">Verified</div>
          )}
        </div>

        <h3 className="font-medium mb-1 truncate">{perfume.name}</h3>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            <Star size={14} className="text-yellow-400" />
            <span className="text-sm ml-1">{perfume.rating}</span>
          </div>
          <span className="text-xs text-gray-500">
            ({perfume.reviewCount} reviews)
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {perfume.scentFamily.slice(0, 2).map((family) => (
            <div key={family} className="text-xs px-2 py-1 bg-gray-200 rounded">
              {family}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold">${perfume.price}</span>
            <span className="text-xs text-gray-500 ml-1">{perfume.size}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1 px-3 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
          >
            <ShoppingCart size={16} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}