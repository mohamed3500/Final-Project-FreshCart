import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BounceLoader } from "react-spinners";
import Slider from "react-slick";
import index from "./../../../node_modules/resize-observer-polyfill/dist/ResizeObserver.es";
import { CartContext } from "../../Contexts/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { WishListContext } from "../../Contexts/WishListContext";

export default function ProductDetails() {
  let { id, category } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [product, setProduct] = useState(null);
  let { addProductToCart, setNumberItems, numberItems } =
    useContext(CartContext);
  const { addProductToWishList, getLoggedUserWishList, deleteWishListItem } =
    useContext(WishListContext);
  const [wLProdIds, setWLProdIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  async function getWLIds() {
    let res = await getLoggedUserWishList();
    let ids = res.data.data.map((prod) => prod.id);
    setWLProdIds(ids);
  }

  async function heartToggler(id) {
    if (wLProdIds.includes(id)) {
      let res = await deleteWishListItem(id);
      setWLProdIds(res.data.data);
      // getWLIds();
    } else {
      let res = await addProductToWishList(id);
      setWLProdIds(res.data.data);
      // getWLIds();
    }
  }

  async function addProduct(id) {
    let response = await addProductToWishList(id);
    if (response.data.status == "success") {
    } else {
      toast.error("Error Happened While Adding Product to WishList");
    }
  }

  async function addToCart(id) {
    setCurrentId(id);
    setLoading(true);
    let response = await addProductToCart(id);
    if (response.data.status == "success") {
      setNumberItems(response.data.numOfCartItems);

      toast.success(response.data.message);
      setLoading(false);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {});
  }

  function getAllProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let related = res.data.data.filter(
          (product) => product.category.name == category
        );
        setRelatedProducts(related);
      })
      .catch((err) => {});
  }

  useEffect(() => {
    getProduct(id);
    getAllProducts();
    getWLIds();
  }, [id, category]);

  return (
    <>
      <Toaster />
      {product ? (
        <div className="row items-center">
          <div className="w-1/4">
            <Slider {...settings}>
              {product?.images.map((src, index) => (
                <img
                  src={src}
                  alt={`product image ${index}`}
                  className="w-full"
                  key={index}
                />
              ))}
            </Slider>
          </div>
          <div className="w-3/4">
            <h3 className="font-semibold capitalize text-2xl">
              {product?.title}
            </h3>
            <h4 className="text-gray-700 my-4">{product?.description}</h4>
            <h4 className="">{product?.category.name}</h4>
            <div className="flex justify-between my-5">
              <span>{product?.price} EGP</span>
              <span>
                <i className="fas fa-star text-yellow-500"></i>
                {product?.ratingsAverage}
              </span>
            </div>
            {/* <button className="btn" onClick={() => addToCart(product.id)}>
              Add to Cart
            </button> */}
            <div className="flex justify-between">
              <button className="btn" onClick={() => addToCart(product.id)}>
                {loading && currentId == product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Add to Cart"
                )}
              </button>
              <i
                className={`fa-solid fa-heart text-xl cursor-pointer ${
                  wLProdIds.includes(product.id) ? "text-red-900" : ""
                }`}
                onClick={() => {
                  heartToggler(product.id);
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <BounceLoader color="#059669" />
      )}
      <h2 className="mt-8 text-2xl">Related Products</h2>
      <div className="row">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <div className="w-1/6" key={product.id}>
              <div className="product my-2 p-2">
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full"
                  />
                  <h3 className="text-emerald-600">{product.category.name}</h3>
                  <h3 className="font-semibold mb-1">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="fas fa-star text-yellow-500"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <div className="flex justify-between">
                  <button className="btn" onClick={() => addToCart(product.id)}>
                    {loading && currentId == product.id ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                  <i
                    className={`fa-solid fa-heart text-xl cursor-pointer ${
                      wLProdIds.includes(product.id) ? "text-red-900" : ""
                    }`}
                    onClick={() => {
                      heartToggler(product.id);
                    }}
                  />
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
