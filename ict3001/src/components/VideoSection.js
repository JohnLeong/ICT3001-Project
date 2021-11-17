import React, { useEffect, useState } from "react";
import "../App.css";

export default function VideoSection(props) {
  const [videoLink, setVideoLink] = useState("");

  useEffect(() => {
    setVideoLink(props.section.link);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setVideoLink(props.section.link);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.section]);

  return (
    <div>
      <video width="608" height="342" controls className="video">
        <source src={"/Videos/" + props.section.link} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-description">
        <p>{props.section.description}</p>
      </div>
    </div>
  );
}
