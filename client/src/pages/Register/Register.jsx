import React from "react";
import { useState } from "react";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";
import Success from "../../components/Success/Success";

import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPass, setCPass] = useState("");
  const [err, setErr] = useState();
  const [loading, setLoading] = useState();
  const [msg, setMsg] = useState();
  const [show, setShow] = useState(false);

  const registerUser = async () => {
    setLoading(true);
    if (password === cPass) {
      const user = {
        username,
        email,
        password,
        cPass,
      };
      try {
        const res = (await axios.post("/api/users/register", user)).data;
        if (res) {
          setLoading(false);
          setMsg(true);

          setUsername("");
          setEmail("");
          setPassword("");
          setCPass("");
        }
      } catch (error) {
        setErr(error);
        setLoading(false);
      }
    } else {
      setErr("password did not match!");
      setLoading(false);
    }
  };
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-3 bs reg">
        <div>
          <center>
            <h1 className="mt-5">Registration Form</h1>
            {loading && <Loader />}
          </center>
          <div>
            <input
              type="text"
              className="w-100 px-1 py-2 m-1 btn-reg"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              className="w-100 px-1 py-2 m-1 btn-reg"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              className="w-100 px-1 py-2 m-1 btn-reg"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>{" "}
          <div>
            <input
              type="password"
              className="w-100 px-1 py-2 m-1 btn-reg"
              placeholder="confirm password"
              value={cPass}
              onChange={(e) => setCPass(e.target.value)}
              required
            />
          </div>
          <div className="">
            <button className="btn btn-primary my-2" onClick={registerUser}>
              Register
            </button>
          </div>
          <p>
            already registered? please <Link to="/login">login</Link>!
          </p>
          {err && <Error>{err}</Error>}
          {msg && <Success> Registration Completed! </Success>}
          <p className="mb-5"></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
