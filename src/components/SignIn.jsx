import { useState } from "react";
import { Link } from "react-router";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "../firebase";
import { useNavigate } from "react-router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(`error: ${error}`);
    }
  };

  const handleGmail = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      setError(`error: ${error}`);
    }
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <input type="email" placeholder="email..." onChange={handleEmail} />
      <input
        type="password"
        placeholder="password..."
        onChange={handlePassword}
      />
      <button onClick={handleSignIn}>Sign In</button>
      {"or"}
      <button onClick={handleGmail}>Sign In with Gmail</button>
      {error && <p>{error}</p>}
      <p>
        Don&apos;t have an Account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
