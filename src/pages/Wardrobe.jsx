import { Heart } from "lucide-react";

export default function Wardrobe() {
  const favorites = []; 

  return (
    <div className="min-h-screen bg-[#FFFAEE] flex flex-col items-center justify-center px-4 text-center">
      
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center gap-4">
          
          {/* Icon */}
          <Heart size={60} className="text-amber-900 opacity-60" />

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
      ) : (
        <div className="w-full max-w-5xl">
          <h2 className="text-2xl font-semibold text-amber-900 mb-6 text-left">
            My Wardrobe
          </h2>

          {/* Grid for favorites */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded shadow p-4 text-left"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded mb-3"
                />

                <h3 className="text-sm font-semibold text-amber-900">
                  {item.name}
                </h3>

                <p className="text-xs text-gray-500">
                  {item.brand}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}