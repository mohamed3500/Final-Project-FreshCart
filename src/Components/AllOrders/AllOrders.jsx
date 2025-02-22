import React, { useContext, useEffect, useState } from "react";
import style from "./AllOrders.module.css";
import axios from "axios";
import { UserContext } from "../../Contexts/UserContext";
import { CartContext } from "../../Contexts/CartContext";
import { jwtDecode } from "jwt-decode";
import { BounceLoader } from "react-spinners";

export default function AllOrders() {
  let [userOrders, setUserOrders] = useState([]);
  let { userLogin } = useContext(UserContext);
  const userToken = localStorage.getItem("userToken");
  const [isLoading, setIsLoading] = useState(true);

  function getUserOrders() {
    let { id } = jwtDecode(userToken);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      .then((res) => {
        setUserOrders(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        return err;
      });
  }

  useEffect(() => {
    // setCartId(localStorage.getItem("cartId"));
    getUserOrders();
  }, []);

  return (
    <>
      {isLoading ? (
        <BounceLoader color="#059669" />
      ) : (
        <>
          {" "}
          {userOrders?.length > 0 ? (
            <>
              <h2 className="my-7 capitalize font-semibold text-gray-600">
                All Orders
              </h2>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Order Id
                      </th>
                      <th scope="col" className="px-6 py-3">
                        is Delivered?
                      </th>
                      <th scope="col" className="px-6 py-3">
                        is Paid?
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Number of Cart Items
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Total Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {order.id}
                        </th>
                        <td className="px-6 py-4">
                          {order.isDelivered ? "Yes" : "No"}
                        </td>
                        <td className="px-6 py-4">
                          {order.isPaid ? "Yes" : "No"}
                        </td>
                        <td className="px-6 py-4">{order.cartItems.length}</td>
                        <td className="px-6 py-4">{order.totalOrderPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <h2 className="text-3xl text-red-800 font-bold text-center my-8 capitalize">
              No Orders to Show
            </h2>
          )}
        </>
      )}
    </>
  );
}
