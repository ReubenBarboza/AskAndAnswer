import React, { useState } from "react";

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
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
          <div>
            <button type="submit">Submit</button>
          </div>
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
        </div>
      </form>
    </div>
  );
}

export default Login;
