import React from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

export function ProductDetail({ perfumes, addToCart, addToWardrobe, wardrobe }) {
  const { id } = useParams();

  const perfume = perfumes.find((p) => String(p.id) === id);

  if (!perfume)
    return (
      <div className="p-8">
        Product not found. <Link to="Amber-Musk/shop">Back to Shop</Link>
      </div>
    );

  const isInWardrobe = wardrobe.some((item) => item.id === perfume.id);

  const handleAddToCart = () => {
    addToCart(perfume);
    toast.success(`${perfume.name} added to cart`);
  };

  const handleAddToWardrobe = () => {
    if (isInWardrobe) toast.info("Already in wardrobe");
    else {
      addToWardrobe(perfume);
      toast.success("Added to wardrobe");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Back */}
      <Link to="/shop" className="flex items-center gap-1 text-gray-500 mb-6">
        <ChevronLeft className="w-4 h-4" /> Back to Shop
      </Link>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        {/* LEFT: IMAGE */}
        <div className="bg-[#f8f5ef] rounded-xl flex items-center justify-center p-5 min-h-[500px]">
          <img
            src={perfume.image} 
            alt={perfume.name}
            className="max-h-[450px] w-full object-cover"
            onError={(e) => (e.target.src = "/pinkv.png")} // optional fallback
          />
        </div>

        {/* RIGHT: DETAILS */}
        <div>
          
          {/* Brand */}
          <div className="text-sm text-gray-500 mb-1">
            {perfume.brand}
            {perfume.vendorVerified && (
              <span className="ml-2 border px-2 py-0.5 text-xs rounded">
                Verified Vendor
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-semibold mb-3">
            {perfume.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(perfume.rating)
                    ? "text-amber-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm">{perfume.rating}</span>
            <span className="text-sm text-gray-500">
              ({perfume.reviewCount} reviews)
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4">
            {perfume.description}
          </p>

          {/* Tags */}
          <div className="flex gap-2 mb-6">
            {perfume.scentFamily.map((f) => (
              <span
                key={f}
                className="bg-black text-white text-xs px-2 py-1 rounded"
              >
                {f}
              </span>
            ))}
          </div>

          <div className="border-t my-6"></div>

          {/* Info */}
          <div className="space-y-2 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-gray-500">Size:</span>
              <span>{perfume.size}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Vendor:</span>
              <span>{perfume.brand}</span>
            </div>
          </div>

          {/* Bars */}
          <div className="mb-4">
            <p className="text-sm mb-1">Longevity</p>
            <div className="w-full h-2 bg-gray-200 rounded">
              <div className="h-2 bg-black w-[60%] rounded"></div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm mb-1">Sillage (Projection)</p>
            <div className="w-full h-2 bg-gray-200 rounded">
              <div className="h-2 bg-black w-[60%] rounded"></div>
            </div>
          </div>

          {/* Price */}
          <h2 className="text-2xl font-semibold mb-4">
            ${perfume.price}
          </h2>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={!perfume.inStock}
              className="flex-1 bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition disabled:bg-gray-300"
            >
              <ShoppingCart size={18} />
              {perfume.inStock ? "Add to Cart" : "Out of Stock"}
            </button>

            <button
              onClick={handleAddToWardrobe}
              className="w-12 h-12 border rounded-lg flex items-center justify-center"
            >
              <Heart
                className={isInWardrobe ? "text-red-500 fill-current" : ""}
              />
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            Free shipping on orders over $100
          </p>
        </div>
      </div>
    </div>
  );
}