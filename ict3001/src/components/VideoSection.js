import React from "react";
import "../App.css";

export default function VideoSection(props) {
  return (
    <div>
      <video width="608" height="342" controls className="video">
        <source src={"Videos/" + props.section.link} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-description">
        <p>{props.section.description}</p>
      </div>
    </div>
  );
}
