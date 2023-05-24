import React, { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker, Space } from "antd";
import moment from "moment";
import SingleFosterCenter from "../../components/FosterCenter/FosterCenter";
import { Outlet } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { useContext } from "react";

const FosterCenter = () => {
  const [fosterCenters, setFosterCenters] = useState([]);
  const [duplicateFosterCenters, setDuplicateFosterCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchKey, setSearchKey] = useState("");
  const [seletType, setSeletType] = useState("all");

  const { RangePicker } = DatePicker;
  let url = window.location.href;
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await (
          await axios.get("/api/fostercenters/getallfostercenters")
        ).data;
        setFosterCenters(res);
        setDuplicateFosterCenters(res);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetch();
  }, [url]);
  // console.log(fosterCenters);
  const filterByDate = (dates) => {
    setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
    setToDate(moment(dates[1]).format("DD-MM-YYYY"));
    // console.log(dates[0]);
    // console.log(moment(dates[1]).format("DD-MM-YYYY"));
  };
  // console.log(fromDate, toDate);
  const dayDiff = moment.duration(moment(toDate).diff(fromDate), "days");
  const totalDays = dayDiff > 0 ? dayDiff : 1;

  const serachFilter = () => {
    setFosterCenters(
      duplicateFosterCenters.filter((dublicateFosterCenter) =>
        dublicateFosterCenter.city
          .toLowerCase()
          .includes(searchKey.toLowerCase())
      )
    );
  };

  const filterByType = (event) => {
    if (event.toLowerCase() == "all") {
      setFosterCenters(duplicateFosterCenters);
    } else {
      setFosterCenters(
        duplicateFosterCenters.filter(
          (dublicateFosterCenter) =>
            dublicateFosterCenter.type.toLowerCase() == event.toLowerCase()
        )
      );
    }
  };

  return (
    <div className="container">
      <div className="row bs mt-5 align-content-center justify-content-evenly p-5">
        <div className="col-md-3">
          <Space direction="vertical" size={12}>
            <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
          </Space>
        </div>

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
      <Outlet context={{ fromDate, toDate, totalDays }} />

      <div className="row justify-content-center mt-5 ">
        {loading ? (
          <center>
            <Loader />
          </center>
        ) : fosterCenters.length > 0 ? (
          fosterCenters.map((fosterCenter) => (
            <div
              key={fosterCenter._id}
              className="bs col-md-11 mt-2 border border-1 py-4"
            >
              <SingleFosterCenter
                FosterCenter={fosterCenter}
                fromDate={fromDate}
                toDate={toDate}
              />
            </div>
          ))
        ) : (
          <Error> No foster center founds with such keyword(s) </Error>
        )}
      </div>
    </div>
  );
};

export default FosterCenter;
