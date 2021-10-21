import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

/* Import pages */
import HomePage from "./views/HomePage";
import LessonPage from "./views/LessonPage";

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/Lesson/:lessonId" component={LessonPage} />
        </Switch>
    </Router>
  );
}

export default App;
