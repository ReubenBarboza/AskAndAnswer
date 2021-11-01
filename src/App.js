import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Ask from "./components/Ask";
import Answer from "./components/Answer";
import Login from "./components/registration/Login";
import Theme from "./components/Theme";
import Form from "./components/registration/Form";
import { UsersContextProvider } from "./components/contexts/UsersContex";

function App() {
  return (
    <div className="App">
      <Theme>
        <Router>
          <UsersContextProvider>
            <div>
              <Navbar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/Ask" component={Ask} />
                <Route exact path="/Answer" component={Answer} />
                <Route exact path="/Login" component={Login} />
                <Route exact path="/Form" component={Form} />
              </Switch>
            </div>
          </UsersContextProvider>
        </Router>
      </Theme>
    </div>
  );
}

export default App;
