import { useState } from "react";
import { Link } from "react-router";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "../firebase";
import { useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";

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

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/Todos");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Sign In
        </h1>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSignIn}>
          {/* Input Fields */}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              onChange={handleEmail}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handlePassword}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={handleSignIn}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Sign In
            </button>
            <div className="text-center text-gray-500">or</div>
            <button
              onClick={handleGmail}
              className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300"
            >
              <FcGoogle size={24} />
              <span>Sign In with Google</span>
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
