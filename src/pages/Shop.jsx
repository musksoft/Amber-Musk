import React, { useEffect, useState } from "react";
import { perfumes as staticPerfumes, scentFamilies } from "../assets/perfumes";
import { ProductCard } from "../components/ProductCard";
import { supabase } from "../config/supabaseClient";

export default function Shop({ addToCart }) {
  const [perfumes, setPerfumes] = useState([]); // combined dynamic + static
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedFamilies, setSelectedFamilies] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 300]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.error(error);
    }

    // Transform DB data to match static product format
    const dynamicPerfumes = (data || []).map((p) => ({
      id: `db-${p.id}`, // prefix to avoid key collision with static
      name: p.name,
      brand: p.brand,
      price: p.price,
      size: p.size,
      image: p.image,
      description: p.description,
      gender: p.gender,
      scentFamily: [...(p.top_notes || []), ...(p.heart_notes || [])],
      rating: 4.5,
      reviewCount: 10,
      vendorVerified: true,
      inStock: p.in_stock,
      trending: p.trending,
    }));

    // Merge static + dynamic
    setPerfumes([...staticPerfumes, ...dynamicPerfumes]);
  };

  // Handle gender filter
  const handleGenderChange = (gender) => setSelectedGender(gender);

  // Handle scent family toggle
  const toggleFamily = (family) =>
    setSelectedFamilies((prev) =>
      prev.includes(family)
        ? prev.filter((f) => f !== family)
        : [...prev, family]
    );

  // Filter logic
  const filteredPerfumes = perfumes.filter((perfume) => {
    const matchGender = selectedGender === "All" || perfume.gender === selectedGender;
    const matchFamily =
      selectedFamilies.length === 0 ||
      selectedFamilies.some((family) => perfume.scentFamily.includes(family));
    const matchPrice = perfume.price >= priceRange[0] && perfume.price <= priceRange[1];
    return matchGender && matchFamily && matchPrice;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-64 border rounded-lg p-4 h-fit bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        {/* Gender */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Gender</h3>
          <div className="flex flex-wrap gap-2">
            {["All", "Feminine", "Masculine", "Unisex"].map((gender) => (
              <label key={gender} className="flex items-center gap-2 mb-1">
                <input
                  type="radio"
                  checked={selectedGender === gender}
                  onChange={() => handleGenderChange(gender)}
                />
                {gender}
              </label>
            ))}
          </div>
        </div>

        {/* Scent Families */}
        <div className="mb-6 max-h-48 overflow-y-auto">
          <h3 className="font-medium mb-2">Scent Families</h3>
          <div className="flex flex-col gap-1">
            {scentFamilies.map((family) => (
              <label key={family} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedFamilies.includes(family)}
                  onChange={() => toggleFamily(family)}
                />
                {family}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-2">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </h3>
          <input
            type="range"
            min={0}
            max={300}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-full"
          />
        </div>
      </aside>

      {/* Product Grid */}
      <div className="flex-1 mt-6 lg:mt-0">
        {filteredPerfumes.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No perfumes match your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPerfumes.map((perfume) => (
              <ProductCard
                key={perfume.id}
                perfume={perfume}
                addToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}