"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === confirmPassword) {
      setError("password does not match");
    }
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Registration failed");
      }

      router.push("/login");
    } catch (error) {
      console.error(error);
      setError("Failed to register");
    }
  };
  return (
    <div className="max-w-md mx-auto flex flex-col justify-center min-h-screen">
      <h1 className="text-xl text-center text-white font-bold">Sign Up</h1>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <fieldset>
          <legend className="fieldset-legend">Email</legend>
          <input
            type="text"
            placeholder="Enter the email"
            className="input input-bordered w-full max-w-xl"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            value={email}
            required
          />
          {error && <p></p>}
        </fieldset>
        <fieldset>
          <legend className="fieldset-legend"> Password</legend>
          <input
            type="password"
            placeholder="Enter password"
            className="input input-bordered w-full max-w-xl"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            value={password}
          />
        </fieldset>
        <fieldset>
          <legend className="fieldset-legend">Confirm Password</legend>
          <input
            type="password"
            placeholder="Enter password"
            className="input input-bordered w-full max-w-xl"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
            value={confirmPassword}
          />
        </fieldset>
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 mt-4"
        >
          Sign Up
        </button>
      </form>
      <p className="text-center">
        Already have an account{" "}
        <Link
          href={"/login"}
          className="text-sm text-blue-500 hover:text-blue-600 "
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
