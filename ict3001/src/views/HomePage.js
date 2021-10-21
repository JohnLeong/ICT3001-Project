import React from "react";
import { Link } from "react-router-dom";
import Page from "./Page";

export default function HomePage() {
  // Declare a new state variable, which we'll call "count"
  const lessons = [
    {
      name: "Algebra",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget lacus quis felis condimentum",
      link: "/algebra",
    },
    {
      name: "Recursion",
      description:
        "Recursion is recursion is recursion is recursion is recursion is recursion is recursion is recursion is recursion is recursion is recursion is",
      link: "/algebra",
    },
    {
      name: "Algebra2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget lacus quis felis condimentum",
      link: "/algebra",
    },
    {
      name: "Algebra3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget lacus quis felis condimentum",
      link: "/algebra",
    },
  ];

  return (
    <Page>
      {
        lessons.map((item) => {
          return (<div><Link to={"/lesson" + item.link}>{item.name}</Link><p>{item.description}</p></div>)
        })
      }
    </Page>
  );
}
