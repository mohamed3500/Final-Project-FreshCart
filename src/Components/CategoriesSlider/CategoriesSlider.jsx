import React, { use, useEffect, useState } from "react";
import style from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";
import { BounceLoader } from "react-spinners";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay: true,
    arrows: false,
  };

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {});
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h2 className="my-3 capitalize font-semibold text-gray-600">
        Shop Popular Categories
      </h2>
      {categories.length > 0 ? (
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category._id}>
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-[200px] object-cover"
              />
              <h4>{category.name}</h4>
            </div>
          ))}
        </Slider>
      ) : (
        <>
          <BounceLoader color="#059669" />
        </>
      )}
    </>
  );
}
