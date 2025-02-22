import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dbServices from "../../appwrite/DBconfig";
import { addToCart } from "../../store/cartSlice";
import Loading from "../common/Loading";
import Container from "../container/Container";

function OrderOnlineCard() {
  const [foodData, setFoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    console.log("Fetching food data...");
    dbServices
      .getZomatoFood()
      .then((data) => {
        if (data && data.documents) {
          setFoodData(data.documents);
          console.log("Food data received:", data.documents);
        } else {
          console.error("No food data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching food data:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const addCart = (cartData) => {
    const { price, foodName, featuredImageId } = cartData;
    if (!authStatus) {
      toast.warn("Please Login to continue");
      navigate("/login");
    } else {
      dispatch(addToCart({ price, foodName, featuredImageId }));
      toast.success("Cart added Successfully");
    }
  };

  return (
    <div className="w-full bg-white">
      <Container>
        <div className="max-w-5xl mx-auto py-6 px-6 flex flex-col gap-6">
          <h3 className="text-3xl font-semibold text-gray-700">
            Order food online in India
          </h3>
          {loading ? (
            <Loading />
          ) : (
            <div className="grid md:grid-cols-3 grid-cols-1 md:gap-5 gap-2">
              {foodData.length > 0 ? (
                foodData.map((data, index) => (
                  <div
                    className={`border border-gray-50 hover:border-gray-200 overflow-hidden rounded-xl hover:shadow-xl w-full md:w-80 h-auto px-3 py-3 ${data.status === "unavailable" ? "pointer-events-none grayscale" : ""}`}
                    key={index}
                  >
                    {data.status === "unavailable" && (
                      <p className="bg-red-600 text-white inline-block px-2 py-1 rounded-full">
                        Out of Stock
                      </p>
                    )}
                    <img
                      src={dbServices.getFoodImgPreview(data.featuredImageId) || "/images/placeholder.png"}
                      alt={data.foodName}
                      className="h-52 w-full rounded-xl object-cover"
                    />
                    <div className="flex justify-between">
                      <div className="flex flex-col mt-2">
                        <h3 className="text-xl text-gray-800 font-semibold">
                          {data.foodName}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {data.resturantName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {data.resturantLocality}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center justify-center">
                          <p className="text-green-600">15% off</p>
                          <p className="text-2xl font-semibold text-gray-900 text-right">
                            ₹{data.price}
                          </p>
                        </div>
                        <div className="text-white flex gap-2">
                          <button className="border px-3 bg-green-600 rounded">-</button>
                          <button className="border px-3 bg-green-600 rounded">1</button>
                          <button
                            className="border px-3 bg-green-600 rounded"
                            onClick={() => addCart(data)}
                          >
                            +
                          </button>
                        </div>
                        <p className="text-green-600 text-right">
                          {data.deliveryTime} min
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No food items available</p>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default OrderOnlineCard;
