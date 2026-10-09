import React, { useState } from "react";
import loginImg from "../assets/images/login.jpg";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-2xl font-bold text-gray-800">Loading...</p>
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const success = await login(email, password);

    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex">
      <div className="relative w-1/2 h-full flex items-center justify-center">
        <p className="absolute tracking-widest top-[30%] text-6xl font-bold text-white font-cinzel text-shadow-current">
          Welcome
        </p>
        <img
          src={loginImg}
          alt="Login"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 h-full flex items-center justify-center">
        <div className=" p-8 rounded-lg flex flex-col items-center justify-center w-full h-2/3">
          <h2 className="text-6xl font-bold text-gray-800 mb-9">Login</h2>
          <form
            className="w-1/2 h-1/2 flex flex-col items-center justify-center "
            onSubmit={handleLogin}
          >
            <div className="mb-4 w-full">
              <input
                className=" p-4 appearance-none border-bottom border-black border-b-2  w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6 w-full">
              <input
                className=" p-4 appearance-none border-bottom border-black border-b-2  w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-20 rounded-2xl focus:outline-none focus:shadow-outline cursor-pointer"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="absolute bottom-0  h-2/6 w-1/2 right-0 flex items-center justify-center">
            <p className="absolute mb-4 p-4 bottom-0 text-gray-600 font-bold w-full text-center bg-amber-100">
              Try with credentials: admin@mediflow.com - Mediflow123!
            </p>
            <p className="absolute mb-4 p-4 top-0 text-red-500 font-bold w-full text-center ">
              {error}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
