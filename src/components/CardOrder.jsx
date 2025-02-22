import React from "react";
import { Link } from "react-router-dom";
import Container from "./container/Container";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

// Localities Data for Multiple Cities (Including Updated Kolkata)
const localitiesData = {
  Kolkata: [
    { name: "Salt Lake", places: 200 },
    { name: "Park Street", places: 150 },
    { name: "New Town", places: 180 },
    { name: "Gariahat", places: 120 },
  ],
  Delhi: [
    { name: "Connaught Place", places: 300 },
    { name: "Karol Bagh", places: 250 },
    { name: "Saket", places: 275 },
    { name: "Lajpat Nagar", places: 240 },
  ],
  Mumbai: [
    { name: "Bandra", places: 320 },
    { name: "Juhu", places: 290 },
    { name: "Andheri", places: 350 },
    { name: "Colaba", places: 280 },
  ],
  Bangalore: [
    { name: "Indiranagar", places: 230 },
    { name: "Koramangala", places: 260 },
  ],
  Chennai: [
    { name: "T. Nagar", places: 210 },
    { name: "Adyar", places: 190 },
  ],
  Ahmedabad: [
    { name: "Bodakdev", places: 345 },
    { name: "Satellite", places: 336 },
    { name: "Gurukul", places: 83 },
    { name: "Navrangpura", places: 302 },
    { name: "Vastrapur", places: 217 },
    { name: "Thaltej", places: 222 },
    { name: "Prahlad Nagar", places: 181 },
    { name: "C G Road", places: 94 },
  ],
};

function CardOrder() {
  return (
    <Container>
      <div className="flex justify-center items-center flex-col">
        {/* Order Online Card */}
        <div className="bg-white md:w-2/5 w-full h-auto rounded-lg overflow-hidden border hover:scale-110 duration-150">
          <Link to="/order">
            <div>
              <div>
                <img
                  src="/images/Online-Food.png"
                  alt="Online-Food"
                  className="w-full h-36 pb-2"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl">Order Online</h2>
                <p className="text-gray-500">Stay home and order to your doorstep</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Popular Localities Section */}
        <div className="mt-14 bg-gray-100 w-full px-4 py-6 flex flex-col justify-center items-center rounded-lg">
          <h2 className="md:text-4xl text-lg text-center text-gray-800 mb-8">
            Popular localities in and around India
          </h2>

          {/* Loop through cities and display localities */}
          {Object.entries(localitiesData).map(([city, localities]) => (
            <div key={city} className="bg-white md:w-2/5 w-full h-auto rounded-lg overflow-hidden border mb-4">
              <div className="p-4">
                <h2 className="text-xl font-semibold">{city}</h2>
                {localities.map((locality, index) => (
                  <Link to={`/order?city=${city}&locality=${locality.name}`} key={index}>
                    <div className="flex justify-between items-center py-2 border-b hover:bg-gray-100 px-2 rounded-md">
                      <p className="text-gray-600">{locality.name} - {locality.places} places</p>
                      <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default CardOrder;
