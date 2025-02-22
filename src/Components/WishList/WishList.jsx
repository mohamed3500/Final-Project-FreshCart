import React, { useContext, useEffect, useState } from "react";
import style from "./WishList.module.css";
import toast, { Toaster } from "react-hot-toast";
import { BounceLoader } from "react-spinners";
import { WishListContext } from "../../Contexts/WishListContext";
import { CartContext } from "../../Contexts/CartContext";

export default function Cart() {
  let { deleteWishListItem, getLoggedUserWishList } =
    useContext(WishListContext);
  const { addProductToCart, setNumberItems } = useContext(CartContext);
  let [isLoading, setIsLoading] = useState(true);

  const [wishListItems, setwishListItems] = useState(null);

  async function addToCart(id) {
    let response = await addProductToCart(id);
    if (response.data.status == "success") {
      setNumberItems(response.data.numOfCartItems);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  async function getWishList() {
    let response = await getLoggedUserWishList();
    if (response.data.status == "success") {
      setIsLoading(false);
      setwishListItems(response.data.data);
    }
  }

  // async function addProduct(id) {
  //   let response = await addProductToWishList(id);
  //   if (response.data.status == "success") {
  //     setwishListItems(response.data.data);
  //     console.log(response.data.data);
  //     toast.success("Product Quantity Updated Successfully");
  //   } else {
  //     toast.error("Error Happened While Updating Product Quantity");
  //   }
  // }

  async function deleteItem(productId) {
    let response = await deleteWishListItem(productId);
    if (response.data.status == "success") {
      setwishListItems(response.data.data);
      getWishList();
    } else {
      toast.error("There Was an Error While Removing Product from Wishlist");
    }
  }

  // async function clearAllCart() {
  //   let response = await clearCart();
  //   console.log(response);

  //   if (response.data.message == "success") {
  //     setCartDetails(response.data.data);
  //     toast.success("Cart Cleared Successfully");
  //   } else {
  //     toast.error("There was an error while clearing the Cart");
  //   }
  // }
  useEffect(() => {
    getWishList();
  }, []);

  return (
    <>
      <Toaster />
      <div className="flex justify-between mb-4">
        <h2 className="text-emerald-800 text-3xl mx-auto font-bold">
          My Wish List
        </h2>
      </div>
      {isLoading ? (
        <BounceLoader color="#059669" />
      ) : (
        <>
          {wishListItems?.length > 0 ? (
            <>
              {wishListItems?.map((product, index) => (
                <div
                  key={index}
                  className="row border-b my-3 flex items-center p-2"
                >
                  <div className="md:w-2/12">
                    <img
                      alt={product.title}
                      className="w-100"
                      src={product.imageCover}
                    />
                  </div>
                  <div className="md:w-10/12 flex justify-between">
                    <div>
                      <h5 className="text-xl font-semibold mb-2">
                        {product.title}
                      </h5>
                      <h6 className="text-emerald-600 font-semibold mb-2 text-xl">
                        {product.price}
                      </h6>
                      <button
                        className="text-red-800 text-xl"
                        onClick={() => {
                          deleteItem(product.id);
                        }}
                      >
                        <i className="fa fa-trash" /> Remove
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn btn-lg d-block mx-auto"
                        onClick={() => addToCart(product.id)}
                      >
                        add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <h2 className="text-3xl text-red-800 font-bold text-center my-8 capitalize">
                There are No Items in the WishList
              </h2>
            </>
          )}
        </>
      )}
    </>
  );
}
