import { Link } from "react-router";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
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

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/signin");
    } catch (error) {
      setError(`Error: ${error}`);
    }
  };

  return (
    <div>
      <h1>Sign Up Page</h1>
      <input type="email" placeholder="email..." onChange={handleEmail} />
      <input
        type="password"
        placeholder="password..."
        onChange={handlePassword}
      />
      <button onClick={handleSignUp}>Sign Up </button>
      {"or"}
      <button>Sign In with Gmail</button>
      {error && <p>{error}</p>}
      <p>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
