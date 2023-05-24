import React, { useState } from "react";
import Error from "../../components/Error/Error";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    const user = {
      email,
      password,
    };
    try {
      const res = await (
        await axios.post("/api/users/login", { email, password })
      ).data;
      console.log(res);
      localStorage.setItem("currentUser", JSON.stringify(res));

      if (res) {
        setLoading(false);
        navigate("/fostercenter");
      }
    } catch (error) {
      setErr(error);
      setLoading(false);
    }
  };
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-3 bs reg">
        <div>
          <center>
            {loading && <Loader />}
            <h1 className="mt-5">Login Form</h1>
          </center>
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
          </div>
          <div className="">
            <button className="btn btn-primary m-2" onClick={login}>
              Login
            </button>
          </div>
          {err && <Error>{err}</Error>}
          <p>
            Not registered? <Link to="/register"> Register</Link>
          </p>
          <p className="mb-3"></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
