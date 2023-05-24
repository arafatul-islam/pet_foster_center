import React, { useEffect, useState } from "react";
import { Tabs, Tag } from "antd";
import axios from "axios";

const Admin = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [allUsers, setallUsers] = useState([]);
  const [allFosterCenters, setallFosterCenters] = useState([]);
  const [allProducts, setallProducts] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);
  const [fcName, setFcName] = useState("");
  const [fcCity, setFcCity] = useState("");
  const [fcMaxCount, setFcMaxCount] = useState(5);
  const [fcRentPerDay, setFcRentPerDay] = useState(200);
  const [fcType, setFcType] = useState("cat");
  const [fcImg1, setFcImg1] = useState("");
  const [fcImg2, setFcImg2] = useState("");
  const [fcImg3, setFcImg3] = useState("");
  const [fcDescription, setFcDescription] = useState("");
  const [pName, setPName] = useState("");
  const [pCatagory, setPCatagory] = useState("");
  const [pPrice, setPPrice] = useState("");
  const [pImg, setPImg] = useState([]);
  const [pType, setPType] = useState("");
  const [pDescription, setPDescription] = useState("");
  const [aName, setAName] = useState("");
  const [aCatagory, setaCatagory] = useState("");
  const [aBreed, setaBreed] = useState("");
  const [aImg1, setaImg1] = useState("");
  const [aImg2, setaImg2] = useState("");
  const [aDesc, setaDesc] = useState("");
  const [vdName, setvdName] = useState("");
  const [vdPhone, setvdPhone] = useState("");
  const [vdAddress, setvdAddress] = useState("");
  const [vdCity, setvdCity] = useState("");
  const [vdMap, setvdMap] = useState("");
  const [vpName, setvpName] = useState("");
  const [vpAddress, setvpAddress] = useState("");
  const [vpCity, setvpCity] = useState("");
  const [vpMap, setvpMap] = useState("");
  const [vpNumber, setvpNumber] = useState("");
  const [vpImg, setvpImg] = useState("");

  const addFosterCenter = async () => {
    const newFC = {
      name: fcName,
      city: fcCity,
      maxCount: fcMaxCount,
      rentPerDay: fcRentPerDay,
      type: fcType,
      imageUrls: [fcImg1, fcImg2, fcImg3],
      description: fcDescription,
    };

    try {
      const addFC = await (
        await axios.post("/api/fostercenters/addfostercenter", newFC)
      ).data;
      console.log(addFC);
    } catch (error) {
      console.log(error);
    }
  };

  const addproduct = async () => {
    const newProduct = {
      name: pName,
      catagory: pCatagory,
      price: pPrice,
      imageUrls: [pImg],
      type: pType,
      description: pDescription,
    };

    try {
      const addAproduct = await (
        await axios.post("/api/products/addaproduct", newProduct)
      ).data;

      setPName("");
      setPCatagory("");
      setPPrice("");
      setPImg("");
      setPType("");
      setPDescription("");
    } catch (error) {
      console.log(error);
    }
  };

  const addAnimal = async () => {
    const newAnimal = {
      name: aName,
      catagory: aCatagory,
      breed: aBreed,
      imageUrls: [aImg1, aImg2],
      description: aDesc,
    };

    try {
      const addAnimal = await (
        await axios.post("/api/adoptions/addanimal", newAnimal)
      ).data;

      setAName("");
      setaCatagory("");
      setaBreed("");
      setaImg1("");
      setaImg2("");
      setaDesc("");
    } catch (error) {
      console.log(error);
    }
  };

  const addDoctor = async () => {
    const vetDoc = {
      name: vdName,
      phone: vdPhone,
      city: vdCity,
      address: vdAddress,
      map: vdMap,
    };

    try {
      const addVetDoctor = await (
        await axios.post("/api/vetdoctors/addvetdoctor", vetDoc)
      ).data;

      setvdName("");
      setvdPhone("");
      setvdCity("");
      setvdAddress("");
      setvdMap("");
    } catch (error) {
      console.log(error);
    }
  };

  const addPharmacy = async () => {
    const vetpharmacy = {
      name: vpName,
      phone: vpNumber,
      city: vpCity,
      address: vpAddress,
      map: vpMap,
      image: vpImg,
    };

    try {
      const addVetPharmacy = await (
        await axios.post("/api/vetpharmacy/addvetpharmacy", vetpharmacy)
      ).data;

      setvpName("");
      setvpNumber("");
      setvpAddress("");
      setvpCity("");
      setvpImg("");
      setvpMap("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      const fetch = async () => {
        const bookingsRes = await (
          await axios.get("/api/bookings/getallbookings")
        ).data;
        const allFCRes = await (
          await axios.get("/api/fostercenters/getallfostercenters")
        ).data;

        const allUserRes = await (
          await axios.get("/api/users/getallusers")
        ).data;
        setallUsers(allUserRes);
        setallFosterCenters(allFCRes);
        setAllBookings(bookingsRes);
      };
      fetch();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, []);

  const onChange = (key) => {
    // console.log(key);
  };
  const items = [
    {
      key: "1",
      label: `Bookings`,
      children: (
        <>
          <div className="row justify-content-center">
            <div className="col-md-9">
              <table className="table table-bordered table-info table-hover table-striped text-capitalize">
                <thead className="bs thead-dark">
                  <tr>
                    <th>booking id: </th>
                    <th>user id: </th>
                    <th>foster center id: </th>
                    <th>foster center: </th>
                    <th>from : </th>
                    <th>to</th>
                    <th>status: </th>
                  </tr>
                </thead>
                <tbody>
                  {allBookings?.map((booking) => (
                    <>
                      <tr key={booking._id}>
                        <td>
                          <Tag color="blue">{booking?._id}</Tag>{" "}
                        </td>
                        <td>{booking?.userID}</td>{" "}
                        <td>{booking?.fosterCenterID}</td>
                        <td>{booking?.fosterCenter}</td>
                        <td>{booking?.fromDate}</td> <td>{booking?.toDate}</td>{" "}
                        <td>
                          {booking?.statue == "booked" ? (
                            <Tag color="green-inverse"> confirmed</Tag>
                          ) : (
                            <Tag color="red"> cancelled</Tag>
                          )}
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: ` Foster Center(s)`,
      children: (
        <div className="row justify-content-center">
          <div className="col-md-9">
            <table className="table table-bordered table-info table-hover table-striped text-capitalize">
              <thead className="bs thead-dark">
                <tr>
                  <th>foster center id: </th>
                  <th>name : </th>
                  <th>rent: </th>
                  <th>city: </th>
                  <th>type : </th>
                  <th>Capacity</th>
                  <th>Phone: </th>
                </tr>
              </thead>
              <tbody>
                {allFosterCenters?.map((FC) => (
                  <>
                    <tr key={FC._id}>
                      <td>
                        <Tag color="blue">{FC?._id}</Tag>{" "}
                      </td>
                      <td>{FC?.name}</td> <td>{FC?.rentPerDay}</td>
                      <td>{FC?.city}</td>
                      <td>{FC?.type}</td> <td>{FC?.maxCount}</td>{" "}
                      <td>{FC?.phone}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: `Add Foster Center(s)`,
      children: (
        <>
          <div className="row ms-4 my-3 p-5 text-capitalize">
            <div className="col-md-5">
              <label htmlFor="">Foster Center Name:</label>
              <input
                type="text"
                placeholder="Foster Center Name"
                className="p-1 "
                required
                value={fcName}
                onChange={(e) => setFcName(e.target.value)}
              />
              <label htmlFor="">city:</label>
              <input
                type="text"
                placeholder="city"
                required
                className="p-1 "
                value={fcCity}
                onChange={(e) => setFcCity(e.target.value)}
              />
              <label htmlFor="">pet capacity</label>
              <input
                type="text"
                placeholder="pet capacity"
                required
                className="p-1 "
                value={fcMaxCount}
                onChange={(e) => setFcMaxCount(e.target.value)}
              />
              <label htmlFor="">Rent Per day:</label>
              <input
                type="text"
                placeholder="Rent Per Day"
                required
                className="p-1 "
                value={fcRentPerDay}
                onChange={(e) => setFcRentPerDay(e.target.value)}
              />{" "}
              <label htmlFor="">type:</label>
              <input
                type="text"
                placeholder="Foster Center Type"
                required
                className="p-1 "
                value={fcType}
                onChange={(e) => setFcType(e.target.value)}
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="">Foster Center Image(s):</label>
              <input
                type="text"
                placeholder="Image Url-1"
                required
                className="p-1 "
                value={fcImg1}
                onChange={(e) => setFcImg1(e.target.value)}
              />
              <label htmlFor="">Image Url-2:</label>
              <input
                type="text"
                placeholder="Image Url-2"
                required
                className="p-1 "
                value={fcImg2}
                onChange={(e) => setFcImg2(e.target.value)}
              />
              <label htmlFor="">Image Url-3:</label>
              <input
                type="text"
                placeholder="Image url-3"
                required
                className="p-1 "
                value={fcImg3}
                onChange={(e) => setFcImg3(e.target.value)}
              />
              <label htmlFor="">Description:</label>
              <input
                type="text"
                placeholder="Image url-3"
                required
                className="p-1 "
                value={fcDescription}
                onChange={(e) => setFcDescription(e.target.value)}
              />

              <div className="text-end ">
                <button
                  className="btn btn-primary mt-3"
                  onClick={addFosterCenter}
                >
                  Add Foster Center
                </button>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "4",
      label: `User(s)`,
      children: (
        <>
          <div className="row justify-content-center">
            <div className="col-md-9">
              <table className="table table-bordered table-info table-hover table-striped text-capitalize">
                <thead className="bs thead-dark">
                  <tr>
                    <th>user id: </th>
                    <th>user name: </th>
                    <th>email: </th>
                    <th>Admin: </th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers?.map((user) => (
                    <>
                      <tr key={user._id}>
                        <td>
                          <Tag color="blue">{user?._id}</Tag>{" "}
                        </td>
                        <td>{user?.username}</td> <td>{user?.email}</td>
                        <td>
                          {user?.isAdmin ? (
                            <Tag color="green-inverse">Admin</Tag>
                          ) : (
                            <Tag color="red">User</Tag>
                          )}
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "5",
      label: `Add Product(s)`,
      children: (
        <>
          <div className="row ms-4 my-3 p-5 text-capitalize">
            <div className="col-md-5">
              <label htmlFor="">Product Name:</label>
              <input
                type="text"
                placeholder="Product Name"
                className="p-1 "
                value={pName}
                onChange={(e) => setPName(e.target.value)}
              />
              <label htmlFor="">Product catagory:</label>
              <input
                type="text"
                placeholder="Product Catagory"
                className="p-1 "
                value={pCatagory}
                onChange={(e) => setPCatagory(e.target.value)}
              />
              <label htmlFor="">product price</label>
              <input
                type="text"
                placeholder="Product Price"
                className="p-1 "
                value={pPrice}
                onChange={(e) => setPPrice(e.target.value)}
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="">Product Image(s):</label>
              <input
                type="text"
                placeholder="Image Url"
                className="p-1 "
                value={pImg}
                onChange={(e) => setPImg(e.target.value)}
              />
              <label htmlFor="">product description</label>
              <input
                type="text"
                placeholder="description"
                className="p-1 "
                value={pDescription}
                onChange={(e) => setPDescription(e.target.value)}
              />
              <label htmlFor="">product type</label>
              <input
                type="text"
                placeholder="type"
                className="p-1 "
                value={pType}
                onChange={(e) => setPType(e.target.value)}
              />

              <div className="text-end ">
                <button className="btn btn-primary mt-3" onClick={addproduct}>
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </>
      ),
    },

    {
      key: "6",
      label: `Add Adoption post`,
      children: (
        <>
          <div className="row ms-4 my-3 p-5 text-capitalize">
            <div className="col-md-5">
              <label htmlFor="">Animal Name:</label>
              <input
                type="text"
                placeholder="Animal Name"
                className="p-1 "
                value={aName}
                onChange={(e) => setAName(e.target.value)}
              />
              <label htmlFor="">Animal catagory:</label>
              <input
                type="text"
                placeholder="Animal Catagory"
                className="p-1 "
                value={aCatagory}
                onChange={(e) => setaCatagory(e.target.value)}
              />
              <label htmlFor="">Animal breed</label>
              <input
                type="text"
                placeholder="Animal Breed"
                className="p-1 "
                value={aBreed}
                onChange={(e) => setaBreed(e.target.value)}
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="">Animal Image-1:</label>
              <input
                type="text"
                placeholder="Image Url"
                className="p-1 "
                value={aImg1}
                onChange={(e) => setaImg1(e.target.value)}
              />
              <label htmlFor="">Animal Image-2</label>
              <input
                type="text"
                placeholder="Image URL"
                className="p-1 "
                value={aImg2}
                onChange={(e) => setaImg2(e.target.value)}
              />
              <label htmlFor="">Animal Description</label>
              <input
                type="text"
                placeholder="Description"
                className="p-1 "
                value={aDesc}
                onChange={(e) => setaDesc(e.target.value)}
              />

              <div className="text-end ">
                <button className="btn btn-primary mt-3" onClick={addAnimal}>
                  Add Animal
                </button>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "7",
      label: `Add Veterinary Doctor`,
      children: (
        <>
          <div className="row ms-4 my-3 p-5 text-capitalize">
            <div className="col-md-8">
              <label htmlFor="">Doctor Name:</label>
              <input
                type="text"
                placeholder=" Doctor Name"
                className="p-1 "
                value={vdName}
                onChange={(e) => setvdName(e.target.value)}
              />
              <label htmlFor="">Doctor Phone:</label>
              <input
                type="text"
                placeholder=" Doctor Phone"
                className="p-1 "
                value={vdPhone}
                onChange={(e) => setvdPhone(e.target.value)}
              />
              <label htmlFor="">Doctor Address</label>
              <input
                type="text"
                placeholder=" Doctor Address"
                className="p-1 "
                value={vdAddress}
                onChange={(e) => setvdAddress(e.target.value)}
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="">city:</label>
              <input
                type="text"
                placeholder="City"
                className="p-1 "
                value={vdCity}
                onChange={(e) => setvdCity(e.target.value)}
              />
              <label htmlFor="">google map link</label>
              <input
                type="text"
                placeholder="Google Map Link"
                className="p-1 "
                value={vdMap}
                onChange={(e) => setvdMap(e.target.value)}
              />

              <div className="text-end ">
                <button className="btn btn-primary mt-3" onClick={addDoctor}>
                  Add Doctor
                </button>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "8",
      label: `Add Veterinary Pharmacy`,
      children: (
        <>
          <div className="row ms-4 my-3 p-5 text-capitalize">
            <div className="col-md-5">
              <label htmlFor="">Pharmacy Name:</label>
              <input
                type="text"
                placeholder="Pharmacy  Name"
                className="p-1 "
                value={vpName}
                onChange={(e) => setvpName(e.target.value)}
              />
              <label htmlFor="">Pharmacy location:</label>
              <input
                type="text"
                placeholder=" Pharmacy Location"
                className="p-1 "
                value={vpAddress}
                onChange={(e) => setvpAddress(e.target.value)}
              />
              <label htmlFor=""> Pharmacy city</label>
              <input
                type="text"
                placeholder=" Pharmacy City"
                className="p-1 "
                value={vpCity}
                onChange={(e) => setvpCity(e.target.value)}
              />
            </div>
            <div className="col-md-5">
              <label htmlFor=""> Pharmacy Google Map:</label>
              <input
                type="text"
                placeholder="Google Map Link"
                className="p-1 "
                value={vpMap}
                onChange={(e) => setvpMap(e.target.value)}
              />
              <label htmlFor="">Pharmacy Image</label>
              <input
                type="text"
                placeholder="Image URL"
                className="p-1 "
                value={vpImg}
                onChange={(e) => setvpImg(e.target.value)}
              />
              <label htmlFor="">Pharmacy Number</label>
              <input
                type="text"
                placeholder="Image URL"
                className="p-1 "
                value={vpNumber}
                onChange={(e) => setvpNumber(e.target.value)}
              />

              <div className="text-end ">
                <button className="btn btn-primary mt-3" onClick={addPharmacy}>
                  Add Pharmacy
                </button>
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];
  return (
    <div className="mt-5 ms-2 bs">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default Admin;
