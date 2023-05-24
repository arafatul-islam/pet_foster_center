import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import { useOutletContext } from "react-router-dom";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";

const Booking = () => {
  const { fcid } = useParams();
  const [fosterCenter, setFosterCenter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  const { fromDate, toDate, totalDays } = useOutletContext();
  let url = window.location.href;
  const defaultImg =
    "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2060&q=80";


  useEffect(() => {
    const fetch = async () => {
      try {
        const res = (
          await axios.post("/api/fostercenters/getafostercenterbyid", {
            fostercenterid: fcid,
          })
        ).data;
        setFosterCenter(res);
        setLoading(false);
      } catch (error) {
        setErr(true);
        setLoading(false);
      }
    };

    fetch();
  }, [url]);
  const {
    _id,
    name,
    maxCount,
    rentPerDay,
    imageUrls,
    city,
    currentBookings,
    type,
    description,
  } = fosterCenter;

  const bookFosterCenter = async () => {};

  const onToken = async (token) => {
    console.log(token);
    setTotalAmount(totalDays * rentPerDay);
    const bookingDetails = {
      fosterCenter,
      userID: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromDate,
      toDate,
      totalDays,
      totalAmount,
      token,
    };

    try {
      setLoading(true);
      const res = await axios.post("/api/bookings/bookingfc", bookingDetails);
      setLoading(false);
    } catch (error) {}
  };
  return (
    <>
      {loading ? (
        <center>
          <Loader />
        </center>
      ) : fosterCenter ? (
        <div className="mt-5">
          <div className="row justify-content-center bs m-5 p-3">
            <div className="col-md-6">
              <h1 className="text-capitalize">{name}</h1>
              <img
                src={imageUrls[0] || defaultImg}
                alt={name}
                className="bigimg"
              />
            </div>
            <div className="col-md-6">
              <div className="text-end">
                <h1>
                  Foster Center Details: &nbsp;
                  <button
                    onClick={() => navigate("/fostercenter")}
                    className="btn btn-warning"
                  >
                    {" "}
                    Go Back
                  </button>
                </h1>
                <hr />
                <b className="text-capitalize">
                  <p>city: {city}</p>
                  <p>pet capacity: {maxCount}</p>
                  <p>type: {type}</p>
                  <p>rent per day: {rentPerDay}</p>
                  <p>from date: {fromDate}</p>
                  <p>to date: {toDate}</p>
                  <p>total day(s): {totalDays} </p>
                  <p>total amount: {rentPerDay * totalDays} </p>
                  <p>
                    <small> {description}</small>
                  </p>
                </b>

                <StripeCheckout
                  amount={totalAmount * 100}
                  token={onToken}
                  currency="INR"
                  stripeKey="pk_test_51MTRIPELpjaYtWLLGhJUj8zIWqZTXGbEyteipYKEvFFGsXdFLmgu6fB6XsrNKXlcKqR8k49Ax9Lj3GE6U8agsU1o00PDHPY320"
                >
                  <button className="btn btn-primary me-2" >
                    Pay Now
                  </button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error>something went wrong. please try later!</Error>
      )}
    </>
  );
};

export default Booking;
