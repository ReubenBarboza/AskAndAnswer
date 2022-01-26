import { useState } from "react";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
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
import Footer from "./Footer/Footer";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerDisplayName, setRegisterDisplayName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const [isModerator, setIsModerator] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <AppContainer>
      <Theme>
        <Router>
          <UsersContextProvider>
            <Navbar user={user} />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Ask" component={Ask} />
              <Route exact path="/Answers" component={Answers} />
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
                  isModerator={isModerator}
                  setIsModerator={setIsModerator}
                />
              </Route>
            </Switch>

            <Footer />
          </UsersContextProvider>
        </Router>
      </Theme>
    </AppContainer>
  );
}

export default App;
