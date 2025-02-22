import React, { useContext, useEffect, useState } from "react";
import style from "./Products.module.css";
import { BounceLoader } from "react-spinners";
import { Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "./../../Contexts/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { WishListContext } from "../../Contexts/WishListContext";

export default function Products() {
  let [products, setProducts] = useState([]);
  let { addProductToCart, setNumberItems, numberItems } =
    useContext(CartContext);
  const { addProductToWishList, getLoggedUserWishList, deleteWishListItem } =
    useContext(WishListContext);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const [wLProdIds, setWLProdIds] = useState([]);

  async function getWLIds() {
    let res = await getLoggedUserWishList();
    let ids = res.data.data.map((prod) => prod.id);
    setWLProdIds(ids);
  }

  async function heartToggler(id) {
    // console.log(wLProdIds.includes(id), "toggler");

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

  // async function addProduct(id) {
  //   let response = await addProductToWishList(id);
  //   if (response.data.status == "success") {
  //     console.log(response.data.data);
  //     toast.success("Product Added to WishList Successfully");
  //   } else {
  //     toast.error("Error Happened While Adding Product to WishList");
  //   }
  // }

  async function addToCart(id) {
    setCurrentId(id);
    setLoading(true);
    let response = await addProductToCart(id);
    if (response.data.status == "success") {
      setNumberItems(numberItems + 1);
      toast.success(response.data.message);
      setLoading(false);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  }

  function getProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        setProducts(res.data.data);
        // console.log(res.data.data);
      })
      .catch(() => {});
  }

  useEffect(() => {
    getProducts();
    getWLIds();
  }, []);

  return (
    <>
      <Toaster />
      <h2 className="mt-7 capitalize font-semibold text-gray-600">
        All Products
      </h2>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
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
