import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import Page from "./Page";
import "../App.css";

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
    <Page id="topTitle" title="Maths Academy">
      <div id="leftBar">Maths Academy</div>
      {
        
        lessons.map((item) => {
          return (<div id="containerA"><Link to={"/lesson" + item.link}><p id ="topicName">{item.name}</p></Link><p id ="topicDesc">{item.description}</p></div>)
        })
      }
    </Page>
  );
}
