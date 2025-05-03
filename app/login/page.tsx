"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useNotification } from "../components/Notification";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const { showNotification } = useNotification();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      showNotification("All fields are required", "error");
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        showNotification(res.error, "error");
      } else {
        showNotification("Logged in successfully...", "success");
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto flex flex-col justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <form className="space-y-2" onSubmit={handleLogin}>
        <fieldset>
          <legend className="fieldset-legend">Email</legend>
          <input
            type="email"
            value={email}
            className="input input-bordered max-w-xl w-full"
            placeholder="Enter the email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </fieldset>
        <fieldset>
          <legend className="fieldset-legend">Password</legend>
          <input
            type="password"
            value={password}
            placeholder="Enter the password"
            className="input input-bordered max-w-xl w-full"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </fieldset>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="text-center mt-2">
          Don&apos;t have an account{" "}
          <Link
            href={"/register"}
            className="text-blue-500 hover:text-blue-600"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
