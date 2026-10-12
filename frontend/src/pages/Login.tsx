import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import loginImg from "../assets/images/login.jpg";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const success = await login(email.trim(), password);

      if (success) {
        navigate("/dashboard");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch {
      setError("Unable to sign in right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full bg-[#F8F5ED]">
      {/* Left image panel */}
      <section className="relative hidden min-h-screen w-1/2 overflow-hidden md:flex">
        <img
          src={loginImg}
          alt="Welcoming clinic interior"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay improves text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#172D2E]/75 via-black/10 to-black/20" />

        <div className="relative z-10 flex w-full flex-col justify-between p-10 lg:p-14">
          <p className="text-2xl font-bold tracking-wide text-white">
            Mediflow
          </p>

          <div className="mb-8">
            <h1 className="font-cinzel text-4xl font-bold tracking-widest text-white drop-shadow-lg lg:text-6xl">
              Welcome
            </h1>

            <p className="mt-4 max-w-md text-base leading-relaxed text-white/90 lg:text-lg">
              Better care begins with a smoother workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Right form panel */}
      <section className="flex min-h-screen w-full items-center justify-center px-6 py-10 md:w-1/2 md:px-10 lg:px-16">
        <div className="w-full max-w-[400px]">
          {/* Mobile branding; image remains visible on desktop */}
          <p className="mb-10 text-center text-xl font-bold tracking-wide text-[#3C6E71] md:hidden">
            Mediflow
          </p>

          <div className="mb-8">
            <h2 className="text-4xl font-bold tracking-tight text-[#212529] lg:text-5xl">
              Sign in
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-[#5B6268]">
              Welcome back. Sign in to manage your clinic.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#212529]"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full rounded-lg border border-[#D8D2C6] bg-white px-4 py-3 text-[#212529] outline-none transition focus:border-[#3C6E71] focus:ring-2 focus:ring-[#3C6E71]/20 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#212529]"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full rounded-lg border border-[#D8D2C6] bg-white px-4 py-3 text-[#212529] outline-none transition focus:border-[#3C6E71] focus:ring-2 focus:ring-[#3C6E71]/20 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !email.trim() || !password}
              className="w-full rounded-lg bg-[#3C6E71] px-5 py-3.5 font-semibold text-white transition hover:bg-[#31595C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3C6E71] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Demo account information */}
          <div className="mt-8 border-t border-[#E5E0D5] pt-5">
            <button
              type="button"
              onClick={() => setShowDemoCredentials((current) => !current)}
              className="text-sm font-semibold text-[#3C6E71] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3C6E71]"
              aria-expanded={showDemoCredentials}
            >
              {showDemoCredentials ? "Hide" : "View"} demo credentials
            </button>

            {showDemoCredentials && (
              <div className="mt-3 rounded-lg border border-[#E5E0D5] bg-white p-4 text-sm text-[#5B6268]">
                <p>
                  <span className="font-semibold text-[#212529]">Email:</span>{" "}
                  admin@mediflow.com
                </p>

                <p className="mt-2">
                  <span className="font-semibold text-[#212529]">
                    Password:
                  </span>{" "}
                  Mediflow123!
                </p>
              </div>
            )}

            <p className="mt-5 text-xs leading-relaxed text-[#7A8085]">
              Clinic management, made simpler.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
