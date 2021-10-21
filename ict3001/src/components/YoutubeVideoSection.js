import React from "react";
import "../App.css";

export default function YoutubeVideoSection(props) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <iframe
          className="youtube-video"
          title={props.section.link}
          src={props.section.link}
          allow='autoplay'
        ></iframe>
      </div>
      <div className="video-description">
        <p>{props.section.description}</p>
      </div>
    </div>
  );
}
