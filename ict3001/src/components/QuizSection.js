import React, { useEffect, useState } from "react";
import "../App.css";
import { readQuestionsFromFile } from "../utility/QuestionReader";
import Latex from "./Latex";

export default function QuizSection(props) {
  const [lessonLoaded, setLessonLoaded] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [submitted, setSubmitted] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showFormula, setShowFormula] = useState(false);

  useEffect(() => {
    loadQuestions();
    //   const script = document.createElement("script");

    //   script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
    //   script.id = "MathJax-script";
    //   script.async = true;

    //   document.body.appendChild(script);

    //   const script2 = document.createElement("script");

    //   script2.src = "https://polyfill.io/v3/polyfill.min.js?features=es6";

    //   document.body.appendChild(script2);

    //   return () => {
    //     document.body.removeChild(script);
    //     document.body.removeChild(script2);
    //   };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLessonLoaded(0);
    setQuestions([]);
    setRevealed([]);
    setSubmitted([]);
    setSelected([]);
    loadQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.section]);

  const loadQuestions = () => {
    readQuestionsFromFile("/Data/Questions/" + props.section.link)
      .then((data) => {
        let newRevealed = [];
        let newSelected = [];
        let newSubmitted = [];
        data = [data[Math.floor(Math.random() * data.length)]];
        data.forEach((item) => {
          newRevealed.push(false);
          newSelected.push(-1);
          newSubmitted.push(false);
          for (let i = 0; i < item.options.length; ++i) {
            if (item.options[i].correct === true) {
              item.correctIndex = i;
              break;
            }
          }
        });
        setQuestions(data);
        setRevealed(newRevealed);
        setSelected(newSelected);
        setSubmitted(newSubmitted);
        setLessonLoaded(1);
        console.log(data);
      })
      .catch(() => {
        console.log("Failed to load lesson");
        setLessonLoaded(2);
      });
  };

  const renderQuiz = () => {
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

  const submitAnswer = (index) => {
    let newSubmit = [...submitted];
    newSubmit[index] = true;

    setSubmitted(newSubmit);
  };

  const revealSolution = (index) => {
    let newReveal = [...revealed];
    newReveal[index] = !newReveal[index];

    setRevealed(newReveal);
  };

  const onOptionSelected = (event, questionIndex) => {
    let newSelected = [...selected];
    newSelected[questionIndex] = parseInt(event.target.value);
    setSelected(newSelected);

    let newSubmit = [...submitted];
    newSubmit[questionIndex] = false;

    setSubmitted(newSubmit);
  };

  const getLabelColorClass = (questionIndex, optionIndex) => {
    if (!submitted[questionIndex] || optionIndex !== selected[questionIndex]) {
      return "";
    }
    if (optionIndex === questions[questionIndex].correctIndex) {
      return "correct-option";
    } else {
      return "wrong-option";
    }
  };

  const renderLoaded = () => {
    return (
      <Latex>
        <div>
          {questions.map((question, index) => {
            return (
              <div className="question-section" key={"Q" + index}>

                <div id="formulaContainer">
                <button
                    id="formulaBtn"
                    onClick={() => setShowFormula(!showFormula)}
                  >
                    {showFormula ? "Hide Formula": "Show Formula"}
                  </button>{" "} 
                  {showFormula && <img id="imgFormula" src="/Data/formula.jpg" alt="" />}
                </div>

                <p className="question-heading">Question {index + 1}</p>
                <p className="question-text">{question.questionText}</p>

                <div
                  className="question-options"
                  onChange={(e) => onOptionSelected(e, index)}
                >
                  {question.options.map((option, optionIndex) => {
                    return (
                      <label
                        className={
                          "rad-label " + getLabelColorClass(index, optionIndex)
                        }
                        key={"Option" + optionIndex}
                      >
                        <input
                          type="radio"
                          className="rad-input"
                          name={"Q" + index}
                          value={optionIndex}
                        />
                        <div className="rad-design"></div>
                        <div className="rad-text">{option.text}</div>
                      </label>
                    );
                  })}
                </div>

                <button
                  onClick={() => {
                    submitAnswer(index);
                  }}
                >
                  Submit
                </button>

                <br />

                {submitted[index] && (
                  <button
                    onClick={() => {
                      revealSolution(index);
                    }}
                  >
                    {!revealed[index] ? "Reveal solution" : "Hide solution"}
                  </button>
                )}

                {revealed[index] === true && (
                  <div className="question-solution">{question.solution}</div>
                )}
              </div>
            );
          })}
        </div>
      </Latex>
    );
  };

  return renderQuiz();
}
