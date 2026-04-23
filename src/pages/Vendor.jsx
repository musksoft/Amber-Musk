import React from "react";
import { Wrench } from "lucide-react";

const Vendor = () => {
  return (
    <div className="min-h-screen bg-[#f6ecd6] flex items-center justify-center px-4 sm:px-6">
      <div className="flex flex-col items-center gap-4 text-center">
        
        <Wrench className="w-12 h-12 sm:w-16 sm:h-16 text-gray-700" />

        <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Coming soon!
        </p>

        <p className="text-sm sm:text-base text-gray-600">
          Stay tuned...
        </p>

      </div>
    </div>
  );
};

export default Vendor;