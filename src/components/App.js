import { useState } from "react";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Ask from "./Ask/Ask";
import Answers from "././Answers/Answers";
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
  const [registerDisplayName, setRegisterDisplayName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
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
              <Route exact path="/Answer" component={Answers} />
              <Route exact path="/Login">
                <Login
                  loginEmail={loginEmail}
                  setLoginEmail={setLoginEmail}
                  loginPassword={loginPassword}
                  setLoginPassword={setLoginPassword}
                />
              </Route>
              <Route exact path="/Logout" component={Logout} />
              <Route exact path="/SignUp">
                <SignUp
                  registerEmail={registerEmail}
                  setRegisterEmail={setRegisterEmail}
                  registerPassword={registerPassword}
                  setRegisterPassword={setRegisterPassword}
                  registerDisplayName={registerDisplayName}
                  setRegisterDisplayName={setRegisterDisplayName}
                  user={user}
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
