import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import QuizSection from "../components/QuizSection";
import SideBar from "../components/SideBar";
import VideoSection from "../components/VideoSection";
import YoutubeVideoSection from "../components/YoutubeVideoSection";
import Page from "./Page";

export default function LessonPage() {
  const { lessonName } = useParams();
  const [lessonLoaded, setLessonLoaded] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    // const script = document.createElement("script");

    // script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
    // script.id = "MathJax-script";
    // script.async = true;

    // document.body.appendChild(script);

    // const script2 = document.createElement("script");

    // script2.src = "https://polyfill.io/v3/polyfill.min.js?features=es6";

    // document.body.appendChild(script2);

    loadLesson();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadLesson = () => {
    fetch("/Data/Lessons/" + lessonName + ".json")
      .then((r) => r.json())
      .then((data) => {
        setSections(data.sections);
        setLessonLoaded(1);
      })
      .catch(() => {
        console.log("Failed to load lesson");
        setLessonLoaded(2);
      });
  };

  const renderLesson = () => {
    switch (lessonLoaded) {
      case 0:
        return renderLoading();
      case 1:
        return renderLoaded();
      case 2:
        return renderLoadFailed();
      default:
        return renderLoading();
    }
  };

  const renderLoading = () => {
    return <div>Loading lesson...</div>;
  };

  const renderLoadFailed = () => {
    return <div>Failed to load lesson!</div>;
  };

  const renderLoaded = () => {
    const section = sections[currentSectionIndex];
    switch (section.type) {
      case "YoutubeVideo":
        return <YoutubeVideoSection section={section} />;
      case "Video":
        return <VideoSection section={section} />;
      case "Quiz":
        return <QuizSection section={section} />;
      default:
        return <div>Unknown section type</div>;
    }
  };

  return (
    <Page title="Lesson">
      <SideBar
        sections={sections}
        currentSectionIndex={currentSectionIndex}
        setCurrentSectionIndex={setCurrentSectionIndex}
      />
      <div className="content">{renderLesson()}</div>
    </Page>
  );
}
