import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const { userLogin } = useContext(UserContext);
  const [numberItems, setNumberItems] = useState(0);
  // let headers = {
  //   token: localStorage.getItem("userToken"),
  // };

  let headers = {
    token: userLogin,
  };

  const [cartId, setCartId] = useState(0);
  function addProductToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => {
        setNumberItems(res.data.numOfCartItems);
        setCartId(res.data.data._id);
        return res;
      })
      .catch((err) => err);
  }

  function updateCartProductQuantity(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function deleteCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => {
        toast.success("Product Removed from Cart");
        return res;
      })
      .catch((err) => err);
  }

  function checkout(cartId, url, formData) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
          shippingAddress: formData,
        },
        {
          headers,
        }
      )
      .then((res) => {
        return res;
      })
      .catch((err) => err);
  }

  function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <>
      <CartContext.Provider
        value={{
          addProductToCart,
          getLoggedUserCart,
          updateCartProductQuantity,
          deleteCartItem,
          clearCart,
          checkout,
          cartId,
          setCartId,
          numberItems,
          setNumberItems,
        }}
      >
        {props.children}
      </CartContext.Provider>
    </>
  );
}
