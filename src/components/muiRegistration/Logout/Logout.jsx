import { useEffect } from "react";
import { auth } from "../../../firebase/firebase-config";
import { signOut } from "@firebase/auth";
import { useHistory } from "react-router";

const Logout = () => {
  const history = useHistory();
  const logout = async () => {
    await signOut(auth);
  };
  useEffect(() => {
    logout();
    history.push("/");
  });
  return null;
};

export default Logout;
