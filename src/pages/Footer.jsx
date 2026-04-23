import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#ffefe2] via-[#eebe97] to-[#944c15] py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo Column */}
        <div>
          <div className="text-[30px] pl-10 font-giomori font-semibold text-amber-950">
            Amber&Musk
          </div>{" "}
        </div>

        {/* Shop Column */}
        <div>
          <h3 className="text-lg font-semibold text-amber-700 mb-4">Shop</h3>
          <ul className="space-y-2">
            <li className="text-amber-900 cursor-pointer">All Fragrances</li>
            <li className="text-amber-900 cursor-pointer">Trending Now</li>
          <li className="text-amber-900 cursor-pointer">
  <Link to="/reviews">Reviews</Link>
</li>
            <li className="text-amber-900 cursor-pointer">Best Seller</li>
          </ul>
        </div>

        {/* Discover Column */}
        <div>
          <h3 className="text-lg font-semibold text-amber-700  mb-4">
            Discover
          </h3>
          <ul className="space-y-2">
            <li className="text-amber-900 cursor-pointer">About Us</li>
            <li className="text-amber-900 cursor-pointer">Our Story</li>
            <li className="text-amber-900 cursor-pointer">Blog</li>
            <li className="text-amber-900 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Vendors Column */}
        <div>
          <h3 className="text-lg font-semibold text-amber-700  mb-4">
           <Link to="/vendor">For Vendors</Link> 
          </h3>
          <ul className="space-y-2">
            <li className="text-amber-900 cursor-pointer">Sell With Us</li>
            <li className="text-amber-900 cursor-pointer">Vendor Login</li>
            <li className="text-amber-900 cursor-pointer">Vendor Support</li>
            <li className="text-amber-900 cursor-pointer">
              Terms & Conditions
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}

      <div className="mt-10  pt-6 text-center ">
        <p className="text-white font-semibold text-xl font-battambang-regular">
          Curated Fragrances and Personalised Scent Recommendations for Every
          Ocassion
        </p>
        <p className="text-white pt-5 -pb-10 text-sm">
          Designed by Muskan Nisar © Amber&Musk | All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
