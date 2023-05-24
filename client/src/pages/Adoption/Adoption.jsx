import { Tag } from "antd";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";

const Adoption = () => {
  const url = window.location.href;
  // const [seletType, setSeletType] = useState("all");
  const [allAnimals, setAllAnimals] = useState([]);
  const [duplicateAnimals, setduplicateAnimals] = useState([]);
  // const [loading, setLoading] = useState();
  const [fosterCenters, setFosterCenters] = useState([]);
  const [duplicateFosterCenters, setDuplicateFosterCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchKey, setSearchKey] = useState("");
  const [seletType, setSeletType] = useState("all");
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await (await axios.get("/api/adoptions/getallanimals")).data;
      setLoading(false);
      setAllAnimals(res);
      setduplicateAnimals(res);
    };

    fetch();
  }, [url]);

  const adoption = (id) => {
    try {
    } catch (error) {}
  };

  // const serachFilter = () => {
  //   setProducts(
  //     duplicateProducts.filter((dublicateProduct) =>
  //       dublicateProduct?.name.toLowerCase().includes(searchKey?.toLowerCase())
  //     )
  //   );
  // };

  const filterByType = (event) => {
    if (event.toLowerCase() == "all") {
      setAllAnimals(duplicateAnimals);
    } else {
      setAllAnimals(
        duplicateAnimals.filter(
          (dupAn) => dupAn.type.toLowerCase() == event.toLowerCase()
        )
      );
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-5 ">
        {" "}
        <center>
          <Tag color="geekblue">
            <h1>Adoption Center</h1>
          </Tag>
        </center>{" "}
        {loading ? (
          <center>
            <Loader />
          </center>
        ) : (
          allAnimals?.length > 0 &&
          allAnimals?.map((animal) => (
            <div key={animal?._id} className="bs row mt-2 border border-1 py-4">
              <div className="col-md-4">
                <img
                  src={animal?.imageUrls[0]}
                  alt={animal?.name}
                  className="smallimg"
                />
              </div>
              <div className="col-md-6 text-capitalize">
                <h5>
                  <p> pet name: {animal?.name}</p>
                  <p>breed: {animal?.breed}</p>
                  <p>catagory: {animal?.catagory}</p>
                  <p>
                    {" "}
                    Adoption:{" "}
                    {animal?.adopt == "adopt" ? (
                      <Tag color="gold-inverse">adopt</Tag>
                    ) : (
                      <Tag color="cyan">available </Tag>
                    )}{" "}
                  </p>

                  <div
                    className="text-start
                  "
                  >
                    <button
                      onClick={() => adoption(animal?._id)}
                      className="btn btn-primary"
                    >
                      Adopt
                    </button>
                  </div>
                </h5>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Adoption;




{/* <div className="row bs mt-5 align-content-center justify-content-evenly p-5"> */}
{/* <div className="col-md-4"> */}
{/* <input
    type="text"
    placeholder="search animals"
    className="text-capitalize"
  /> */}
{/* </div> */}

{/* <div
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
</div> */}