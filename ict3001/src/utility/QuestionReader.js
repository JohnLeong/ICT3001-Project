export const readQuestionsFromFile = async (filePath) => {
  let fileText;
  await fetch(filePath)
    .then((r) => r.text())
    .then((text) => {
      fileText = text;
    });

  let lines = fileText.split("\n");
  let questions = [];
  let question = { questionText: "", options: [], solution: "" };
  for (var i = 0; i < lines.length; ++i) {
    let line = lines[i].replace("\r", "");
    switch (line) {
      case "#Question":
        ++i;
        let questionText = "";
        while (i < lines.length && lines[i].substring(0, 1) !== "#") {
          let line2 = lines[i].replace("\r", "");
          if (line2 !== "") {
            questionText += line2 + "\n";
          }
          ++i;
        }
        question.questionText = questionText.substring(
          0,
          questionText.length - 1
        );
        --i;
        break;
      case "#Option":
      case "#Option correct":
        const correct = line === "#Option correct";
        ++i;
        let optionText = "";
        while (i < lines.length && lines[i].substring(0, 1) !== "#") {
          let line2 = lines[i].replace("\r", "");
          if (line2 !== "") {
            optionText += line2 + "\n";
          }
          ++i;
        }
        question.options.push({
          text: optionText.substring(0, optionText.length - 1),
          correct: correct,
        });
        --i;
        break;
      case "#Solution":
        ++i;
        let solutionText = "";
        while (i < lines.length && lines[i].substring(0, 1) !== "#") {
          let line2 = lines[i].replace("\r", "");
          solutionText += line2 + "\n";
          ++i;
        }
        question.solution = solutionText.substring(0, solutionText.length - 1);
        questions.push(question);
        question = { questionText: "", options: [], solution: "" };
        --i;
        break;
      default:
        break;
    }
  }
  return questions;
};
