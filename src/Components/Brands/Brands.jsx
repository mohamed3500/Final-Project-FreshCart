import React, { useEffect, useState } from "react";
import style from "./Brands.module.css";
import axios, { all } from "axios";
import { BounceLoader } from "react-spinners";

export default function Brands() {
  const [allBrands, setAllBrands] = useState(null);

  function getAllBrands() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => {
        setAllBrands(res.data.data);
      })
      .catch((err) => {});
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <>
      <h1 className="text-emerald-600 text-3xl font-bold text-center">
        All Brands
      </h1>
      <div className="row">
        {allBrands ? (
          allBrands.map((brand, index) => (
            <div key={index} className="md:w-1/4 ng-star-inserted">
              <div className="card border rounded-md m-2">
                <div className="card-img">
                  <img alt={brand.name} className="mx-auto" src={brand.image} />
                </div>
                <div className="card-body">
                  <p className="text-center">{brand.name}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <BounceLoader color="#059669" />
        )}
      </div>
    </>
  );
}
