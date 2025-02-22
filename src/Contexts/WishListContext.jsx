import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "./UserContext";

export let WishListContext = createContext();

export default function WishListContextProvider(props) {
  const { userLogin } = useContext(UserContext);

  // let headers = {
  //   token: localStorage.getItem("userToken"),
  // };

  let headers = {
    token: userLogin,
  };

  function addProductToWishList(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: productId,
        },
        { headers }
      )
      .then((res) => {
        toast.success("Product Added To WishList");
        return res;
      })
      .catch((err) => err);
  }

  function getLoggedUserWishList() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => err);
  }

  //   function updateCartProductQuantity(productId, newCount) {
  //     return axios
  //       .put(
  //         `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
  //         { count: newCount },
  //         { headers }
  //       )
  //       .then((res) => res)
  //       .catch((err) => err);
  //   }

  function deleteWishListItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((res) => {
        toast.success("Product Removed from WishList");
        return res;
      })
      .catch((err) => err);
  }

  //   function clearCart() {
  //     return axios
  //       .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
  //         headers,
  //       })
  //       .then((res) => res)
  //       .catch((err) => err);
  //   }

  return (
    <>
      <WishListContext.Provider
        value={{
          addProductToWishList,
          deleteWishListItem,
          getLoggedUserWishList,
        }}
      >
        {props.children}
      </WishListContext.Provider>
    </>
  );
}
