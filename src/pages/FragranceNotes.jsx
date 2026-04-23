import React, { useState, useEffect } from "react";

const perfumeImages = ["./new.png", "./img2.png", "./img3.png", "./orange.png"];

const noteImages = {
  Citrus: "./orange.png",
  Green: "./img2.png",
  Water: "./img3.png",
  Aromatic: "./img2.png",

  "Soft Floral": "./img3.png",
  Floral: "./img2.png",
  Fruity: "./orange.png",

  "Mossy Woods": "./woody.png",
  Woods: "./woody.png",
  "Dry Woods": "./woody.png",

  "Soft Amber": "./amber.png",
  Amber: "./amber.png",
  "Woody Amber": "./amber.png",
};

const fragranceNotes = [
  {
    name: "Top Notes",
    description:
      "Top notes are the first impression of a fragrance. They are light, fresh, and evaporate quickly.",
    examples: [
      "Citrus",
      "Bergamot",
      "Mint",
      "Lemon",
      "Grapefruit",
      "Green Apple",
    ],
  },
  {
    name: "Heart Notes",
    description:
      "Heart notes form the core and personality of the fragrance. They unfold after the top notes dissipate.",
    examples: [
      "Rose",
      "Jasmine",
      "Lavender",
      "Geranium",
      "Ylang-Ylang",
      "Violet",
    ],
  },
  {
    name: "Base Notes",
    description:
      "Base notes provide depth and longevity to the fragrance. They are rich and linger the longest.",
    examples: [
      "Vanilla",
      "Musk",
      "Sandalwood",
      "Amber",
      "Patchouli",
      "Cedarwood",
    ],
  },
  {
    name: "Citrus Notes",
    description: "Citrus notes add freshness and brightness to fragrances.",
    examples: ["Orange", "Lime", "Mandarin", "Grapefruit", "Bergamot"],
  },
  {
    name: "Woody Notes",
    description:
      "Woody notes bring warmth and richness, often associated with earth and nature.",
    examples: ["Cedar", "Oakmoss", "Vetiver", "Sandalwood", "Guaiac Wood"],
  },
  {
    name: "Floral Notes",
    description:
      "Floral notes offer softness and romance with a variety of blooms.",
    examples: ["Rose", "Jasmine", "Lavender", "Tuberose", "Peony", "Gardenia"],
  },
  {
    name: "Spicy Notes",
    description: "Spicy notes give fragrances a warm, vibrant kick.",
    examples: ["Cinnamon", "Clove", "Pepper", "Nutmeg", "Cardamom"],
  },
];

const noteColors = {
  "Top Notes": "from-yellow-400 to-orange-500",
  "Heart Notes": "from-pink-400 to-rose-500",
  "Base Notes": "from-amber-700 to-brown-900",
  "Citrus Notes": "from-yellow-300 to-yellow-500",
  "Woody Notes": "from-emerald-700 to-green-900",
  "Floral Notes": "from-pink-300 to-pink-600",
  "Spicy Notes": "from-red-600 to-red-900",
};

export default function FragranceNotesPage() {
  const [index, setIndex] = useState(0);
  const [activeNote, setActiveNote] = useState("Top Notes");

  // Auto rotate carousel (top section)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % perfumeImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* 🔥 TOP SECTION (Gradient only here) */}
      <div className="bg-gradient-to-tr from-[#90521d] via-[#edbc92] to-amber-800 text-white px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}
          <div className="grid gap-10 items-center mb-10">
            <div>
              <h1 className="text-[50px] font-aboreto-regular text-center font-bold bg-gradient-to-r from-[#f1d5a0] to-[#fff3d6] bg-clip-text text-transparent">
                Fragrance Notes Explorer
              </h1>
              <p className="text-gray-300 font-battambang-regular text-center mt-4 text-base">
                Discover the building blocks of your favorite scents
              </p>
            </div>
          </div>

          {/* CAROUSEL */}
       <div className="relative w-full h-[260px] sm:h-[300px] md:h-[320px] mb-12 flex items-center justify-center overflow-hidden">

  {perfumeImages.map((img, i) => {
    const position = (i - index + perfumeImages.length) % perfumeImages.length;

    return (
      <img
        key={i}
        src={img}
        alt="perfume"
        className={`absolute object-cover rounded-xl shadow-2xl transition-all duration-700
        
        /* ✅ Responsive sizing */
        w-32 h-44
        sm:w-40 sm:h-56
        md:w-52 md:h-72

        ${
          position === 0
            ? "z-30 scale-110 opacity-100"
            : ""
        }

        ${
          position === 1
            ? "z-20 translate-x-10 sm:translate-x-14 md:translate-x-16 rotate-6 opacity-70 scale-95"
            : ""
        }

        ${
          position === 2
            ? "z-10 -translate-x-10 sm:-translate-x-14 md:-translate-x-16 -rotate-6 opacity-70 scale-95"
            : ""
        }

        hover:scale-110 hover:z-40
        `}
      />
    );
  })}
</div>
        </div>
      </div>

      <div className="bg-[#f8f6f2] text-black px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-semibold mb-16 text-center text-amber-900 tracking-wide">
            Fragrance Families
          </h2>

          {/* GRID */}
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                family: "Fresh",
                items: ["Citrus", "Green", "Water", "Aromatic"],
              },
              {
                family: "Floral",
                items: ["Soft Floral", "Floral", "Fruity"],
              },
              {
                family: "Woody",
                items: ["Mossy Woods", "Woods", "Dry Woods"],
              },
              {
                family: "Amber",
                items: ["Soft Amber", "Amber", "Woody Amber"],
              },
            ].map((group) => (
              <div key={group.family}>
                {/* Family Title */}
                <h3 className="text-xl font-semibold mb-6 text-amber-800 tracking-wide">
                  {group.family}
                </h3>

                {/* Sub Notes */}
                <div className="flex flex-col gap-3">
                  {group.items.map((item) => (
                    <button
                      key={item}
                      onClick={() => setActiveNote(item)}
                      className={`text-left px-4 py-3 border-b transition-all duration-300
                  ${
                    activeNote === item
                      ? "border-amber-800 text-amber-900 font-semibold"
                      : "border-gray-300 text-gray-600 hover:text-amber-700"
                  }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* DETAIL PANEL */}
          <div className="mt-16 max-w-3xl mx-auto text-center">
            {activeNote && (
              <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500">
                {/* 🔥 IMAGE */}
                <div className="h-56 w-full overflow-hidden">
                  <img
                    src={noteImages[activeNote] || "./new.png"}
                    alt={activeNote}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                </div>

                {/* TEXT CONTENT */}
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-amber-900 mb-4">
                    {activeNote}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {fragranceNotes.find((n) =>
                      n.examples.some((ex) =>
                        ex.toLowerCase().includes(activeNote.toLowerCase()),
                      ),
                    )?.description ||
                      "This fragrance note contributes to the overall character and balance of a scent."}
                  </p>

                  <div className="flex justify-center flex-wrap gap-3">
                    {(
                      fragranceNotes.find((n) =>
                        n.examples.some((ex) =>
                          ex.toLowerCase().includes(activeNote.toLowerCase()),
                        ),
                      )?.examples || []
                    ).map((ex, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 text-sm bg-amber-100 text-amber-800 rounded-full"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center gap-6 mt-20">
            {perfumeImages.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-32 h-40 object-cover rounded-lg opacity-80 hover:opacity-100 hover:scale-110 transition"
              />
            ))}
          </div> */}
    </div>
  );
}
