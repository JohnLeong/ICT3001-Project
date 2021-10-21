import React from "react";
import "../App.css";
import { RiVideoLine, RiPencilLine } from "react-icons/ri";

export default function SideBar(props) {
  const getIcon = (sectionType) => {
    switch (sectionType) {
      case "Video":
      case "YoutubeVideo":
        return <RiVideoLine />;
      case "Quiz":
        return <RiPencilLine />;
      default:
        return;
    }
  };

  return (
    <div className="sidebar">
      {props.sections.map((section, index) => {
        return (
          <span
            key={index}
            className={index === props.currentSectionIndex ? "active" : ""}
            onClick={() => {
              props.setCurrentSectionIndex(index);
            }}
          >
            {getIcon(section.type)}
            <p>{section.name}</p>
          </span>
        );
      })}
    </div>
  );
}
