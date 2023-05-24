import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Tabs } from "antd";
import Loader from "../../components/Loader/Loader";

const VetDoctor = () => {
  var url = window.location.href;
  const [loading, setLoading] = useState();
  const [allVetDoc, setAllVetDoc] = useState([]);
  const [allPharmacy, setAllPharmacy] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await (
          await axios.get("/api/vetdoctors/getallvetdoctors")
        ).data;

        const pharamacyRes = await (
          await axios.get("/api/vetpharmacy/getallvetpharmacy")
        ).data;
        setAllPharmacy(pharamacyRes);
        setAllVetDoc(res);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, [url]);

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: `Vet Doctor`,
      children: (
        <div className="container">
          <div className="row justify-content-center">
            <h2>Vet & Animal Doctors List & Contacts in Bangladesh</h2>
            <div className="col-md-12">
              <table className="table table-info table-hover text-capitalize">
                <thead>
                  <tr>
                    <th>Doctor Name</th>
                    <th>Phone Number</th>
                    <th>Clinic/Address</th>
                    <th>City</th>
                    <th>Google Map</th>
                  </tr>
                </thead>

                <tbody>
                  {allVetDoc?.map((doctor) => {
                    return (
                      <tr>
                        <td>{doctor?.name}</td>
                        <td>{doctor?.phone}</td>
                        <td>{doctor?.address}</td>
                        <td>{doctor?.city}</td>
                        <td>
                          <a href={doctor?.map} target="_blank">
                            {doctor?.map}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: `Vet Pharmacy`,
      children: (
        <div className="container">
          <div className="row justify-content-center">
            <h2>Vet Pharmacy List & Contacts in Bangladesh</h2>
            <div className="col-md-12">
              <table className="table table-info table-hover text-capitalize">
                <thead>
                  <tr>
                    <th>Pharmacy Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Google Map</th>
                    <th>Image</th>
                  </tr>
                </thead>

                <tbody>
                  {allPharmacy?.map((vetpharmacy) => {
                    return (
                      <tr>
                        <td>{vetpharmacy?.name}</td>
                        <td>{vetpharmacy?.phone}</td>
                        <td>{vetpharmacy?.address}</td>
                        <td>{vetpharmacy?.city}</td>
                        <td>
                          <a href={vetpharmacy?.map} target="_blank">
                            {vetpharmacy?.map}
                          </a>
                        </td>
                        <td>
                          <img
                            src={vetpharmacy?.image}
                            alt={vetpharmacy?.name}
                            style={{ width: "180px" }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="row m-5">
      {loading ? (
        <div className="row justify-content-center align-content-center ">
          <center>
            <Loader />
          </center>
        </div>
      ) : (
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      )}
    </div>
  );
};

export default VetDoctor;
