import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Contexts/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { BounceLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    getLoggedUserCart,
    updateCartProductQuantity,
    deleteCartItem,
    clearCart,
    setNumberItems,
    numberItems,
  } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);

  const [cartDetails, setCartDetails] = useState(null);

  async function getCartItems() {
    let response = await getLoggedUserCart();
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      setIsLoading(false);
    }
  }

  async function updateProduct(id, count) {
    let response = await updateCartProductQuantity(id, count);
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      if (count == 0) {
        setNumberItems(response.data.numOfCartItems);
        toast.success("Product Removed from Cart");
      } else {
        toast.success("Product Quantity Updated Successfully");
      }
    } else {
      toast.error("Error Happened While Updating Product Quantity");
    }
  }

  async function deleteItem(productId) {
    let response = await deleteCartItem(productId);
    if (response.data.status == "success") {
      setNumberItems(response.data.numOfCartItems);
      setCartDetails(response.data.data);
    }
  }

  async function clearAllCart() {
    let response = await clearCart();

    if (response.data.message == "success") {
      setCartDetails(response.data.data);
      toast.success("Cart Cleared Successfully");
      setNumberItems(0);
    } else {
      toast.error("There was an error while clearing the Cart");
    }
  }
  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      <Toaster />

      {isLoading ? (
        <BounceLoader color="#059669" />
      ) : (
        <>
          {cartDetails?.products.length > 0 ? (
            <>
              <div className="flex justify-between">
                <h2 className="text-center text-2xl text-emerald-600 font-bold capitalize my-4">
                  Total Price: {cartDetails?.totalCartPrice}
                </h2>
                <h2 className="text-center text-2xl text-emerald-600 font-bold capitalize my-4">
                  You have {cartDetails.products.length}{" "}
                  {cartDetails.products.length == 1 ? "item" : "Items"} in the
                  cart
                </h2>
              </div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-16 py-3">
                        <span className="sr-only">Image</span>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Qty
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartDetails?.products.map((product) => (
                      <tr
                        key={product.product.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="p-4">
                          <img
                            src={product.product.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt="Apple Watch"
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.product.title}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <button
                              className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                              onClick={() =>
                                updateProduct(
                                  product.product.id,
                                  product.count - 1
                                )
                              }
                            >
                              <span className="sr-only">Quantity button</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <div>
                              <span>{product.count}</span>
                            </div>
                            <button
                              className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                              onClick={() =>
                                updateProduct(
                                  product.product.id,
                                  product.count + 1
                                )
                              }
                            >
                              <span className="sr-only">Quantity button</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.price * product.count}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                            onClick={() => deleteItem(product.product.id)}
                          >
                            Remove
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between">
                <button
                  className="bg-emerald-600 px-3 py-3 rounded-lg mt-6 text-white"
                  onClick={() => {
                    clearAllCart();
                  }}
                >
                  Clear Cart
                </button>
                <Link to={`/checkout`}>
                  <button className="bg-emerald-600 px-3 py-3 rounded-lg mt-6 text-white">
                    Checkout
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl text-red-800 font-bold text-center my-8 capitalize">
                There are No Items in the Cart
              </h2>
            </>
          )}
        </>
      )}
    </>
  );
}
