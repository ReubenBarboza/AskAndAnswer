import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContainer } from "./styles/Login/LoginContainer.styled";
import { StyledButton } from "./styles/StyledButton.styled";
import { StyledDiv } from "./styles/StyledDiv.styled";
import { UsersContext } from "./contexts/UsersContex";

function Login() {
  const { userName, setUserName, password, setPassword, users, setUsers } =
    useContext(UsersContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { userName, password };
    setUsers([...users, newUser]);
  };
  return (
    <LoginContainer>
      <form onSubmit={handleSubmit}>
        <StyledDiv
          height="400px"
          border="1px solid black"
          bRadius="25px"
          padding="20px"
          display="flex"
          direction="column"
          justify="space-evenly"
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
