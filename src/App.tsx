import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import SingleTodo from "./components/SingleTodo";
import Main from "./components/Main";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

const App: React.FC = () => {
  return (
    <Router>
      <div >
        <Navbar />
        
        <div >
          <Switch>
          <Route exact path='/' >
              <Home/>
          </Route>
          <Route  path='/main' >
             <Main />
          </Route>
          </Switch>
        </div>
      </div>
      </Router>
  );
};

export default App;
