import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function NavBar() {

  return (
    <div className="navbar">
        <Link className="navbar-link" to="/"> Maths Academy </Link>
    </div>
  );
}
