import React, { useState } from "react";
import { useParams } from "react-router";
import Page from "./Page";

export default function LessonPage() {
  const [lessonLoaded, setLessonLoaded] = useState(0);
  const { lessonId } = useParams();

  const loadLesson = () => {};

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
    return(<div>Loading lesson...</div>);
  };

  const renderLoadFailed = () => {};

  const renderLoaded = () => {
    return(<div>Failed to load lesson!</div>);
  };

  return (<Page>{renderLesson()}</Page>);
}
