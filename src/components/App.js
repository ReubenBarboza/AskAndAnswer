import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Ask from "./Ask";
import Answer from "./Answer";
import Login from "./muiRegistration/Login";
import Theme from "./Theme";
import Form from "./registration/Form";
import { UsersContextProvider } from "./contexts/UsersContex";
import { AppContainer } from "./styles/AppContainer.styled";

function App() {
  return (
    <AppContainer className="App">
      <Theme>
        <Router>
          <UsersContextProvider>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Ask" component={Ask} />
              <Route exact path="/Answer" component={Answer} />
              <Route exact path="/Login" component={Login} />
              <Route exact path="/Form" component={Form} />
            </Switch>
          </UsersContextProvider>
        </Router>
      </Theme>
    </AppContainer>
  );
}

export default App;
