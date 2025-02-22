import React from "react";
import style from "./MainSlider.module.css";
import slide1 from "../../assets/images/slider-image-1.jpeg";
import slide2 from "../../assets/images/slider-image-2.jpeg";
import slide3 from "../../assets/images/slider-image-3.jpeg";
import slide4 from "../../assets/images/grocery-banner.png";
import slide5 from "../../assets/images/grocery-banner-2.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <>
      <div className="row my-5">
        <div className="w-3/4">
          <Slider {...settings}>
            <img
              className="w-full h-[400px] object-cover"
              src={slide1}
              alt="grocery-bag"
            />
            <img
              className="w-full h-[400px] object-cover"
              src={slide2}
              alt="wafer"
            />
            <img
              className="w-full h-[400px] object-cover"
              src={slide3}
              alt="cookies"
            />
          </Slider>
        </div>
        <div className="w-1/4">
          <img src={slide4} alt="grocery bag" className="w-full h-[200px]" />
          <img src={slide5} alt="bread" className="w-full h-[200px]" />
        </div>
      </div>
    </>
  );
}
