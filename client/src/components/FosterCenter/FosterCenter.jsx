import axios from "axios";
import moment from "moment";
import React from "react";
import { useRef } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";

const SingleFosterCenter = ({ FosterCenter, fromDate, toDate }) => {
  const dayDiff = moment.duration(moment(toDate).diff(fromDate), "days");
  const totalDays = dayDiff > 0 ? dayDiff : 1;

  return (
    <div className="row">
      <div className="col-md-4">
        <img
          src={FosterCenter?.imageUrls[2]}
          alt={FosterCenter?.name}
          className="smallimg"
        />
      </div>
      <div className="col-md-6 text-capitalize ">
        <h1 className="">{FosterCenter?.name}</h1>
        <p>{FosterCenter?.city}</p>
        <p>max pet:{FosterCenter?.maxCount}</p>
        <p>type:{FosterCenter?.type}</p>
        <p>{FosterCenter?.description}</p>
        <div className="d-flex flex-end ">
          <Link to={`${FosterCenter?._id}`}>
            <button className="btn btn-primary m-1 text-capitalize">
              view details
            </button>
          </Link>
          {fromDate && toDate && (
            <Link to={`${FosterCenter?._id}`}>
              <button className="btn btn-primary m-1 text-capitalize">
                book now
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleFosterCenter;
