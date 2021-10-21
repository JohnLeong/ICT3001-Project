import React, { useEffect } from "react";
import NavBar from "../components/NavBar";

export default function Page({ title, children }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div>
      <NavBar />
      <div className="main-content">{children}</div>
    </div>
  );
}
