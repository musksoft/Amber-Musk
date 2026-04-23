import React from "react";
import { perfumes } from "../assets/perfumes";
import { ProductCard } from "../components/ProductCard";
import { Link } from "react-router-dom";

const featuresData = [
  {
    title: "Personalized Recommendations",
    description: "AI-powered scent matching based on your preferences",
    icon: "/ai_ic.png",
  },
  {
    title: "Verified Vendors",
    description: "All sellers go through our strict verification process",
    icon: "/badge_ic.png",
  },
  {
    title: "Community Reviews",
    description: "Real feedback from verified fragrance enthusiasts",
    icon: "/community_ic.png",
  },
  {
    title: "Latest Trends",
    description: "Stay updated with the newest fragrance releases",
    icon: "/trend_ic.png",
  },
];

const Home = ({ addToCart }) => {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-[#7C3D0D] w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-10 md:h-[400px]">
        
        <div className="flex flex-col justify-center md:max-w-[800px] space-y-6 text-center md:text-left">
          <h1 className="text-white text-3xl md:text-[40px] font-aboreto-regular leading-tight">
            DISCOVER YOUR SIGNATURE
            <br />
            SCENT
          </h1>

          <p className="text-[#ffead9] text-lg md:text-[15px] max-w-md mx-auto md:mx-0">
            Begin your fragrance journey with us. Explore exquisite scents,
            uncover your personal favorites, and let your signature scent tell
            your story.
          </p>

          <div>
            <Link to="/quiz">
              <button className="bg-[#F7C59F] text-[#7C3D0D] font-semibold rounded-md px-6 py-3 shadow-md hover:bg-[#e6b887] transition">
                Take Scent Quiz
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-[450px] mt-8 md:mt-0 flex justify-center md:justify-end">
          <img
            src="/img6.png"
            alt="Perfume Bottle"
            className="w-[80%] md:w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* About Section */}
      <div className="bg-[#FFF2E6] w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-10 md:h-[500px]">
        
        <div className="flex flex-col text-center md:text-left md:max-w-[750px] space-y-6">
          <h1 className="text-amber-900 text-3xl md:text-[40px] font-aboreto-regular leading-tight">
            About Us
          </h1>

          <p className="leading-tight">
            Welcome to our world of fragrance—where every scent tells a story...
            <br /><br />
            At Amber&Musk, we believe that perfume is more than just a finishing
            touch—it’s a form of self-expression, a signature that lingers long
            after you’ve left the room.
            <br /><br />
            Our collections are inspired by the harmony between tradition and
            modernity, where rich, timeless notes meet contemporary creativity.
          </p>
        </div>

        <div className="w-full md:w-[300px] mt-8 md:mt-0 flex justify-center md:justify-end">
          <img
            src="/about.png"
            alt="Perfume Bottle"
            className="w-[70%] md:w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-[#f6e2d3]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {featuresData.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition text-center"
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="h-12 w-12 mx-auto mb-4 object-contain"
                />
                <h3 className="text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfume Collection */}
      <section className="py-16 bg-[#fbd9b7]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-aboreto-regular text-[#7C3D0D] mb-10 text-center">
            Explore Our Perfume Collection
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {perfumes.map((perfume) => (
              <ProductCard
                key={perfume.id}
                perfume={perfume}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section>
        <div className="flex flex-col items-center justify-center bg-gradient-to-l from-[#b66121] via-[#eebe97] to-[#b66121] text-center px-6 py-10 md:h-[270px]">
          
          <h1 className="font-aboreto-regular text-3xl md:text-5xl text-[#fdf5ef] mb-4">
            Join Our Fragrance Community
          </h1>

          <p className="text-white max-w-xl mb-6">
            Share your scent journey and discover what others are loving.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-3">
            <Link to="/reviews">
              <button className="bg-[#F7C59F] text-[#7C3D0D] font-semibold px-6 py-3 rounded-md shadow-md hover:bg-gradient-to-r hover:from-[#F7C59F] hover:to-[#b66121] transition-all">
                Read Reviews
              </button>
            </Link>

            <button className="bg-[#F7C59F] text-[#7C3D0D] font-semibold px-6 py-3 rounded-md shadow-md hover:bg-gradient-to-r hover:from-[#F7C59F] hover:to-[#b66121] transition-all">
              Explore Notes
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;