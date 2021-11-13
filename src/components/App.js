import { useState } from "react";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Ask from "./Ask";
import Answer from "./Answer";
import Login from "./muiRegistration/Login/Login";
import Logout from "./muiRegistration/Logout/Logout";
import Theme from "./Theme";
import SignUp from "./muiRegistration/SignUp/SignUp";
import { UsersContextProvider } from "./contexts/UsersContex";
import { AppContainer } from "./styles/AppContainer.styled";
import { auth } from "../firebase/firebase-config";
import { onAuthStateChanged } from "@firebase/auth";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <AppContainer className="App">
      <Theme>
        <Router>
          <UsersContextProvider>
            <Navbar user={user} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Ask" component={Ask} />
              <Route exact path="/Answer" component={Answer} />
              <Route exact path="/Login" component={Login} />
              <Route exact path="/Logout" component={Logout} />
              <Route exact path="/SignUp">
                <SignUp
                  registerEmail={registerEmail}
                  setRegisterEmail={setRegisterEmail}
                  registerPassword={registerPassword}
                  setRegisterPassword={setRegisterPassword}
                  registerConfirmPassword={registerConfirmPassword}
                  setRegisterConfirmPassword={setRegisterConfirmPassword}
                  user={user}
                  setUser={setUser}
                />
              </Route>
            </Switch>
          </UsersContextProvider>
        </Router>
      </Theme>
    </AppContainer>
  );
}

export default App;
