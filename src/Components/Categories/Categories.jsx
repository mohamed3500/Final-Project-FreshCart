import React, { useEffect, useState } from "react";
import style from "./Categories.module.css";
import axios from "axios";
import { BounceLoader } from "react-spinners";

export default function Categories() {
  // let [allCategories, setAllCategories] = useState(null);
  let [allCategories, setAllCategories] = useState(null);
  const [subCatOfCat, setSubCatOfCat] = useState(null);
  const [catName, setCatName] = useState("");
  // function getAllCategories() {
  //   axios
  //     .get(`https://ecommerce.routemisr.com/api/v1/categories`)
  //     .then((res) => {
  //       console.log(res.data.data);
  //       setAllCategories(res.data.data);
  //       console.log(allCategories);
  //     })
  //     .catch((err) => {});
  // }

  function getAllCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setAllCategories(res.data.data);
        // console.log(products);
      })
      .catch((err) => {});
  }

  function getSubOfCat(id, catName) {
    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
      )
      .then((res) => {
        setSubCatOfCat(res.data.data);
        setCatName(catName);
      })
      .catch((err) => {});
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <div className="row">
        {allCategories?.length > 0 ? (
          // console.log(allCategories)
          // allCategories.map((cat) => {
          allCategories.map((cat, index) => (
            <div className=" w-auto md:w-1/4 p-5" key={index}>
              <div
                className="card cursor-pointer"
                onClick={() => {
                  getSubOfCat(cat._id, cat.name);
                }}
              >
                <div className="card-img">
                  <img
                    alt={cat.name}
                    className="img-fluid ratio-4x3 h-[300px] w-full object-cover"
                    src={cat.image}
                  />
                </div>
                <div className="card-body">
                  <p className="text-success text-xl text-center text-emerald-600">
                    {cat.name}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          // })
          //   products.map((cat) => {
          //     <div className="col-md-4 ng-star-inserted">
          //       <div className="card">
          //         <div className="card-img">
          //           <img
          //             alt
          //             className="img-fluid ratio-4x3 w-100"
          //             style={{ height: 300 }}
          //             src={cat.image}
          //           />
          //         </div>
          //         <div className="card-body">
          //           <p className="text-success h3 text-center">{cat.name}</p>
          //         </div>
          //       </div>
          //     </div>;
          //   })
          // )
          <BounceLoader color="#059669" />
        )}
      </div>
      {subCatOfCat ? (
        <h2 className="text-4xl text-emerald-600 text-center">
          {catName} subcategories
        </h2>
      ) : null}
      <div className="row">
        {subCatOfCat
          ? subCatOfCat.map((sub, index) => (
              <>
                <div className="md:w-1/4 p-2 " key={index}>
                  <div className="card border rounded-md">
                    <p className="h3 text-center p-3 text-xl">{sub.name}</p>
                  </div>
                </div>
              </>
            ))
          : null}
      </div>
    </>
  );
}
