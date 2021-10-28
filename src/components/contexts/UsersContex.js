import { useState, createContext } from "react";

export const UsersContext = createContext();

export const UsersContextProvider = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const values = {
    userName,
    setUserName,
    password,
    setPassword,
    users,
    setUsers,
  };

  return (
    <UsersContext.Provider value={values}>
      {props.children}
    </UsersContext.Provider>
  );
};
