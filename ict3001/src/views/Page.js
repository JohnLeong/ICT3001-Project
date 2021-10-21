import React from "react";
import NavBar from "../components/NavBar";

export default function Page({ title, children }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
