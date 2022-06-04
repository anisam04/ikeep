import React from 'react'
import { Link, useNavigate } from "react-router-dom";


export const Navbar = () => {
  let history = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    history("/login")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">iKeep</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/about">About</Link>
            </li>

          </ul>
          {!localStorage.getItem('token') ? <form className="form-inline my-2 my-lg-0">
            {/* <button className="btn btn-primary my-2 my-sm-0" type="submit">Login</button>
            <button className="btn btn-primary my-2 my-sm-0" type="submit">Sign Up</button> */}
            <Link className="btn btn-outline-secondary mx-2" to="/login" role="button">Login </Link>
            <Link className="btn btn-outline-secondary mx-2" to="/signup" role="button">Sign up </Link>
          </form> : <button className="btn btn-outline-secondary" onClick={handleLogout}>Log out</button>}
        </div>
      </nav>
    </div>
  );
}

