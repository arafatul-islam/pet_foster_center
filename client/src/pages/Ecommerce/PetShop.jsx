import { Space, Tag } from "antd";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";

const PetShop = () => {
  const [searchKey, setSearchKey] = useState("");
  const [seletType, setSeletType] = useState("all");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [prod, setProd] = useState({});
  const [duplicateProducts, setDuplicateProducts] = useState([]);
  const [error, setError] = useState([]);
  const url = window.location.href;
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await (
          await axios.get("/api/products/getallproducts")
        ).data;
        console.log(res);
        setProducts(res);
        setDuplicateProducts(res);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetch();
  }, [url]);

  const serachFilter = () => {
    setProducts(
      duplicateProducts.filter((dublicateProduct) =>
        dublicateProduct?.name.toLowerCase().includes(searchKey?.toLowerCase())
      )
    );
  };

  const filterByType = (event) => {
    if (event.toLowerCase() == "all") {
      setProducts(duplicateProducts);
    } else {
      setProducts(
        duplicateProducts.filter(
          (dublicateProduct) =>
            dublicateProduct.type.toLowerCase() == event.toLowerCase()
        )
      );
    }
  };

  const onToken = async (token) => {
    console.log(token);

    const productDetails = {
      productName: prod.name,
      proudctID: prod._id,
      userID: JSON.parse(localStorage.getItem("currentUser"))._id,
      price: prod.price,
    };

    try {
      setLoading(true);
      const res = await axios.post("/api/products/buyproducts", productDetails);
      setLoading(false);
    } catch (error) {}
  };

  return (
    <div className="container">
      <div className="row bs mt-5 align-content-center justify-content-evenly p-5">
        <div className="col-md-3"></div>

        <div className="col-md-4">
          <input
            type="text"
            placeholder="search city"
            className="text-capitalize"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyUp={serachFilter}
          />
        </div>

        <div
          className="col-md-3"
          value={seletType}
          onChange={(e) => filterByType(e.target.value)}
        >
          <select name="" id="" className="text-capitalize">
            <option value="all" className="text-capitalize">
              all
            </option>
            <option value="cat" className="text-capitalize">
              cat
            </option>
            <option value="dog" className="text-capitalize">
              dog
            </option>
            <option value="rabbit" className="text-capitalize">
              rabbit
            </option>
            <option value="others" className="text-capitalize">
              others
            </option>
            op
          </select>
        </div>
      </div>
      <p id="outlet"></p>

      <div className="row justify-content-center mt-5 ">
        {loading ? (
          <center>
            <Loader />
          </center>
        ) : products?.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bs col-md-11 mt-2 border border-1 py-4 d-flex justify-content-between"
            >
              <div className="col-md-5">
                <img src={product?.imageUrls[0]} className="smallimg" alt="" />
              </div>
              <div className="col-md-6">
                <h4>{product?.name}</h4>
                <p>
                  <small>
                    category: &nbsp;
                    <Tag color="geekblue"> {product?.catagory}</Tag>
                  </small>
                </p>
                <p>{product?.description}</p>
                <p> &#2547; &nbsp;{product?.price}</p>
                <p>type: {product?.type}</p>
                <StripeCheckout
                  amount={product?.price * 100}
                  token={onToken}
                  currency="INR"
                  shippingAddress=""
                  stripeKey="pk_test_51MTRIPELpjaYtWLLGhJUj8zIWqZTXGbEyteipYKEvFFGsXdFLmgu6fB6XsrNKXlcKqR8k49Ax9Lj3GE6U8agsU1o00PDHPY320"
                >
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => {
                      setProd(product);
                    }}
                  >
                    Pay Now
                  </button>
                </StripeCheckout>
              </div>
            </div>
          ))
        ) : (
          <Error> No foster center founds with such keyword(s) </Error>
        )}
      </div>
    </div>
  );
};

export default PetShop;
