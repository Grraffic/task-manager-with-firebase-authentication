import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOut;
