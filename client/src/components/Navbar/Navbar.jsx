import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="navbar-brand">Navbar</div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i style={{ color: "white" }} className="fa-solid fa-bars"></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-content-center">
            <li className="nav-item">
              <NavLink
                className={(navInfo) =>
                  navInfo.isActive ? `nav-link active ` : `nav-link`
                }
                aria-current="page"
                to="fostercenter"
              >
                Foster Center
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={(navInfo) =>
                  navInfo.isActive ? `nav-link active ` : `nav-link`
                }
                to="adoption"
              >
                Adoption
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={(navInfo) =>
                  navInfo.isActive ? `nav-link active ` : `nav-link`
                }
                to="community"
              >
                Community
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={(navInfo) =>
                  navInfo.isActive ? `nav-link active ` : `nav-link`
                }
                to="petshop"
              >
                Pet Shop
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={(navInfo) =>
                  navInfo.isActive ? `nav-link active ` : `nav-link`
                }
                to="vet"
              >
                Veterinary
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={(navInfo) =>
                  navInfo.isActive ? `nav-link active ` : `nav-link`
                }
                to="faq"
              >
                FAQ
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={(navInfo) =>
                  navInfo.isActive ? `nav-link active ` : `nav-link`
                }
                to="contact"
              >
                Contact
              </NavLink>
            </li>
            {user ? (
              <>
                <li className="nav-item nav-link text-capitalize align-content-center">
                  <Link
                    to="/profile"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {user.username}
                  </Link>
                  &nbsp;
                  <button
                    onClick={logout}
                    className="btn-danger px-2 py-1 logout"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
