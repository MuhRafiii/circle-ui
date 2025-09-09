import { useAuth } from "@/hooks/useAuth";
import { api } from "@/services/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", {
        username,
        name,
        email,
        password,
      });

      const user = res.data.data;
      localStorage.setItem("token", user.token);

      login({
        id: user.user_id,
        username: user.username,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        following: user.following,
        followers: user.followers,
        token: user.token,
      });
      navigate("/");
    } catch (err: any) {
      console.error("Register error", err);
      if (
        err.response?.data?.message ===
          "Invalid register, email already used" ||
        err.response?.data?.message ===
          "Invalid register, username already exists"
      ) {
        setErrorMsg(err.response.data.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm bg-white dark:bg-zinc-900 p-6 rounded-lg shadow space-y-4"
        encType="multipart/form-data"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-start text-green-500">
            circle
          </h1>
          <h2 className="text-xl font-semibold text-start">
            Create account Circle
          </h2>
        </div>

        <div className="space-y-2">
          <Input
            className="text-sm"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            required
          />

          <Input
            className="text-sm"
            id="name"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            className="text-sm"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            className="text-sm"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMsg && (
          <p className="text-red-500 text-sm text-center">{errorMsg}</p>
        )}

        <Button
          type="submit"
          className="w-full bg-green-500 text-white hover:bg-green-600 rounded-full"
        >
          Create
        </Button>
        <p className="text-sm text-start">
          Already have account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
