import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import Ask from "./Ask/Ask";
import SearchAsk from "./Ask/SearchAsk/SearchAsk";
import Answers from "././Answers/Answers";
import Login from "./muiRegistration/Login/Login";
import Logout from "./muiRegistration/Logout/Logout";
import Theme from "./Theme";
import SignUp from "./muiRegistration/SignUp/SignUp";
import { UsersContextProvider } from "./contexts/UsersContex";
import { AppContainer } from "./styles/AppContainer.styled";
import { auth, db } from "../firebase/firebase-config";
import { onAuthStateChanged } from "@firebase/auth";
import Footer from "./Footer/Footer";

import { doc, getDoc } from "firebase/firestore";
import About from "./About";
import ModerateQuestions from "./Moderate/ModerateQuestions/ModerateQuestions";
import ModerateAnswers from "./Moderate/ModerateAnswers/ModerateAnswers";

function App() {
  const [user, setUser] = useState({});
  const [isUserModerator, setIsUserModerator] = useState(null);
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  useEffect(
    () => async () => {
      try {
        if (auth.currentUser) {
          const userRef = doc(db, "users", auth.currentUser.uid);
          console.log("moderator async ran");
          const currentUserData = await getDoc(userRef);
          setIsUserModerator(currentUserData.data().isModerator);
        } else {
          console.log("user logged out");
        }
      } catch (e) {
        console.log(e);
      }
    },
    [user]
  );

  return (
    <AppContainer>
      <Theme>
        <Router>
          <UsersContextProvider>
            <Navbar user={user} isUserModerator={isUserModerator} />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Ask">
                <Ask />
              </Route>
              <Route exact path="/SearchAsk" component={SearchAsk} />

              <Route exact path="/Answers" component={Answers} />
              <Route exact path="/Login">
                <Login />
              </Route>
              <Route exact path="/Logout" component={Logout} />
              <Route exact path="/SignUp">
                <SignUp />
              </Route>
              <Route exact path="/ModerateQuestions">
                <ModerateQuestions />
              </Route>
              <Route exact path="/ModerateAnswers">
                <ModerateAnswers />
              </Route>
              <Route exact path="/About">
                <About />
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
