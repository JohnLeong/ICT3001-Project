import React, { useEffect, useState, useRef } from "react";
import "../App.css";

export default function VideoSection(props) {
  const [videoLink, setVideoLink] = useState("");
  const videoRef = useRef();

  useEffect(() => {
    setVideoLink(props.section.link);
    if (videoRef.current) {
      videoRef.current.load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setVideoLink(props.section.link);
    if (videoRef.current) {
      videoRef.current.load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.section]);

  return (
    <div>
      <video width="608" height="342" controls className="video" ref={videoRef}>
        <source src={"/Videos/" + videoLink} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-description">
        <p>{props.section.description}</p>
      </div>
    </div>
  );
}
