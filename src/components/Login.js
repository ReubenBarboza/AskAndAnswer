import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoginContainer } from "./styles/Login/LoginContainer.styled";
import { StyledButton } from "./styles/StyledButton.styled";
import { StyledDiv } from "./styles/StyledDiv.styled";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { userName, password };
    setUsers([...users, newUser]);
  };
  return (
    <LoginContainer>
      <form onSubmit={handleSubmit}>
        <StyledDiv
          height="200px"
          display="flex"
          direction="column"
          justify="space-between"
        >
          <div>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="off"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <StyledDiv display="flex" justify="center" align="center">
            <StyledButton
              padding="10px"
              margin="20px"
              type="submit"
              color="red"
            >
              Submit
            </StyledButton>
            <Link to="/Signin">
              <StyledButton padding="10px" margin="20px">
                Signin
              </StyledButton>
            </Link>
          </StyledDiv>
          <div>
            {users.map((currentUser, index) => {
              return (
                <div key={index}>
                  <p>{currentUser.userName}</p>
                  <p>{currentUser.password}</p>
                </div>
              );
            })}
          </div>
        </StyledDiv>
      </form>
    </LoginContainer>
  );
}

export default Login;
