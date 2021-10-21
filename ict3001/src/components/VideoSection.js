import React from "react";
import "../App.css";

export default function VideoSection(props) {
  return (
    <video width="608" height="342" controls>
      <source src={props.section.videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
