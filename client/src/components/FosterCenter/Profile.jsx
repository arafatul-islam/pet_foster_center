import React, { useEffect, useState } from "react";
import { Tabs, Tag } from "antd";
import axios from "axios";
import Loader from "../Loader/Loader";

const Profile = () => {
  const [bookedFosterCenter, setBookedFosterCenter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [allBookings, setAllBookings] = useState([]);
  const onChange = (key) => {
    // console.log(key);
  };

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const cancelBooking = async (bookingID, fosterCenterID) => {
    try {
      const res = await (
        await axios.post("/api/bookings/cancelbooking", {
          bookingID,
          fosterCenterID,
        })
      ).data;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      const fetch = async () => {
        const res = await (
          await axios.post("/api/bookings/getbookingsbyuserid", {
            userID: user._id,
          })
        ).data;

        setBookedFosterCenter(res);
      };
      fetch();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, []);

  const items = [
    {
      key: "1",
      label: `Profile`,
      children: (
        <div className="row mt-3 ms-5">
          <div className="col-md-4 bs ">
            <h2>Profile</h2>
            <br />
            <h5 className="text-capitalize">
              <p>username: {user?.username}</p>
              <p>email: {user?.email}</p>
              <p>Admin: {user?.isAdmin ? "yes" : "no"}</p>
            </h5>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: `Booked Foster Center(s)`,
      children: (
        <div className="row mt-3 ms-5">
          <div className="col-md-4 bs ">
            <h2>Booking(s)</h2>
            <br />
            {loading && <Loader />}
            {bookedFosterCenter?.length > 0 &&
              bookedFosterCenter?.map((booking) => {
                return (
                  <div>
                    <h1>Foster Center: {booking?.fosterCenter}</h1>
                    <h1>Foster Center ID: {booking?.fosterCenterID}</h1>
                    <h1>
                      Status: &nbsp;
                      {booking?.status == "booked" ? (
                        <>
                          <Tag color="green"> Booked</Tag>{" "}
                        </>
                      ) : (
                        <>
                          <Tag color="red">Canceled</Tag>
                        </>
                      )}
                    </h1>
                    <h1>Total Amount: {booking?.totalAmount}</h1>
                    <h1>Total Days: {booking?.totalDays}</h1>
                    <h1>Transaction ID: {booking?.transactionID}</h1>
                    <div className="row justify-content-center">
                      <button
                        className="btn btn-primary col-md-5 mb-3 mt-2"
                        onClick={() =>
                          cancelBooking(booking?._id, booking?.fosterCenterID)
                        }
                        disabled={booking?.status == "cancelled"}
                        style={{ cursor: "pointer" }}
                      >
                        cancel booking
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: `Tab 3`,
      children: `Content of Tab Pane 3`,
    },
  ];

  return (
    <div className=" mx-2 my-3 bs">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};
export default Profile;
