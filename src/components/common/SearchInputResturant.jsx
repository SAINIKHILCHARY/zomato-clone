import { MapPinIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

function SearchInputResturant() {
  const [selectedCity, setSelectedCity] = useState("Kolkata"); // ✅ Add useState here

  return (
    <>
      <div className="bg-white h-14 w-full flex gap-2 rounded-lg shadow-lg border-l-8 border-red-600">
        {/* Location Dropdown */}
        <div className="w-1/3 border-r-4 border-gray-200 border-spacing-1 relative flex items-center">
          <select
            className="h-full w-full px-8 pr-0 rounded-md outline-none bg-white cursor-pointer"
            onChange={(e) => setSelectedCity(e.target.value)}
            value={selectedCity}
          >
            <option value="Kolkata">Kolkata</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
          </select>
          <MapPinIcon className="h-7 w-7 text-red-400 absolute left-2" />
        </div>

        {/* Search Input */}
        <div className="w-2/3 relative flex items-center border-r-4 border-red-600 rounded-lg">
          <input
            type="text"
            placeholder="Search for restaurant, cuisine or a dish"
            className="h-full w-full px-8 rounded-md outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 text-gray-600 absolute right-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

export default SearchInputResturant;
