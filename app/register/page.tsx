"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      console.log(data);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };
return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-black px-4">

    {/* Orange Glow Background */}
    <div className="absolute w-[500px] h-[500px] bg-orange-500/20 blur-[120px] rounded-full top-20 left-10"></div>
    <div className="absolute w-[400px] h-[400px] bg-amber-500/20 blur-[120px] rounded-full bottom-10 right-10"></div>

    <div className="relative w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl p-8 transition-all duration-300">
      
      <h1 className="text-3xl font-semibold text-white text-center mb-2">
        Create Account
      </h1>

      <p className="text-zinc-400 text-sm text-center mb-8">
        Start your journey today.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-zinc-800/70 text-white placeholder-zinc-500 px-4 py-3 rounded-xl border border-zinc-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/40 outline-none transition-all duration-200"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-zinc-800/70 text-white placeholder-zinc-500 px-4 py-3 rounded-xl border border-zinc-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/40 outline-none transition-all duration-200"
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full bg-zinc-800/70 text-white placeholder-zinc-500 px-4 py-3 rounded-xl border border-zinc-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/40 outline-none transition-all duration-200"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white py-3 rounded-xl font-medium tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/20"
        >
          Register
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-orange-400 hover:text-orange-300 transition-colors"
        >
          Login
        </a>
      </div>
    </div>
  </div>
);
}

export default RegisterPage;