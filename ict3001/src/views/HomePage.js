import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import Page from "./Page";

export default function HomePage() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    loadLessons();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadLessons = () => {
    fetch("/Data/lessons.json")
      .then((r) => r.json())
      .then((data) => {
        setLessons(data);
      })
      .catch(() => {
        console.log("Failed to load lessons");
      });
  };

  return (
    <Page title="Maths Academy">
      {
        lessons.map((item) => {
          return (<div><Link to={"/lesson" + item.link}>{item.name}</Link><p>{item.description}</p></div>)
        })
      }
    </Page>
  );
}
