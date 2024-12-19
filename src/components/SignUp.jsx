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

  const handleSignUp = async (e) => {
    e.preventDefault;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/signin");
    } catch (error) {
      setError(`Error: ${error}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Sign Up
        </h1>

        <form onSubmit={handleSignUp}>
          {/* Form Inputs */}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              onChange={handleEmail}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handlePassword}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          {/* Buttons */}
          <div className="mt-6">
            <button
              onClick={handleSignUp}
              className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
            <div className="text-center text-gray-500 my-4">or</div>
            <button className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition duration-300">
              Sign In with Gmail
            </button>
          </div>
        </form>

        {/* Already have an account */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
