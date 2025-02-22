import React, { useContext, useEffect, useState } from "react";
import style from "./RecentProducts.module.css";
import axios from "axios";
import { BounceLoader } from "react-spinners";
import { data, Link } from "react-router-dom";
import { CartContext } from "../../Contexts/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { WishListContext } from "../../Contexts/WishListContext";

export default function RecentProducts() {
  let [products, setProducts] = useState([]);
  let { addProductToCart, setNumberItems, numberItems } =
    useContext(CartContext);
  const { addProductToWishList, getLoggedUserWishList, deleteWishListItem } =
    useContext(WishListContext);
  const [wLProdIds, setWLProdIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  async function getWLIds() {
    let res = await getLoggedUserWishList();
    console.log(res);
    if (res.data.status == "success") {
      // log(res.data.data);
      let ids = res.data.data.map((prod) => prod.id);
      console.log(ids);

      setWLProdIds(ids);
    }
  }

  async function heartToggler(id) {
    if (wLProdIds.includes(id)) {
      let res = await deleteWishListItem(id);
      setWLProdIds(res.data.data);
    } else {
      let res = await addProductToWishList(id);
      setWLProdIds(res.data.data);
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

  function getProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        setProducts(res.data.data);
        setNumberItems(response.data.numOfCartItems);
        // console.log(products);
        // getWLIds();
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
                  to={`productdetails/${product.id}/${product.category.name}`}
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
                  {/* {console.log(wLProdIds)} */}
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
