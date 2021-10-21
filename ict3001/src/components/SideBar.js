import React from "react";
import "../App.css";

export default function SideBar(props) {
  return (
    <div className="sidebar">
      {props.sections.map((section, index) => (
        <p key={index} className={(index === props.currentSectionIndex ? 'active': '') } onClick={() => {props.setCurrentSectionIndex(index)}}>{section.name}</p>
      ))}
    </div>
  );
}