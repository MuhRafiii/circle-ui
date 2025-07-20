import { api } from "@/services/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { identifier, password });

      const token = res.data.data.token;
      localStorage.setItem("token", token);

      login(true);
      navigate("/");
    } catch (err: any) {
      console.error("Login error", err);
      setErrorMsg(err.response?.data?.message || "user atau password salah");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white dark:bg-zinc-900 p-6 rounded-lg shadow space-y-4"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-start text-green-500">
            circle
          </h1>
          <h2 className="text-xl font-semibold text-start">Login to Circle</h2>
        </div>

        <div className="space-y-2">
          <Input
            className="placeholder:text-sm"
            id="identifier"
            type="identifier"
            placeholder="Email/Username"
            value={identifier}
            autoComplete="identifier"
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />

          <Input
            className="placeholder:text-sm"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            autoComplete="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMsg && (
          <p className="text-red-500 text-sm text-center">{errorMsg}</p>
        )}

        <div className="space-y-2">
          <p className="text-sm text-end">
            <Link
              to="/register"
              className="hover:underline hover:text-green-500"
            >
              Forgot Password?
            </Link>
          </p>
          <Button
            type="submit"
            className="w-full rounded-full bg-green-500 text-white hover:bg-green-600"
          >
            Login
          </Button>
          <p className="text-sm text-start">
            Don't have an account yet?{" "}
            <Link to="/register" className="text-green-500 hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
