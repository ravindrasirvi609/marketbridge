"use client";
import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post("/api/auth/forgotPassword", { email });
      setMessage(response.data.message);
    } catch (err: any) {
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEEEEE] flex items-center justify-center">
      <Head>
        <title>Forgot Password - MarketBridge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-[#1C658C] mb-8">
          Forgot Your Password?
        </h1>
        <p className="text-sm text-center text-[#1C658C] mb-8">
          Enter your email address below, and we&apos;ll send you instructions
          on how to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#1C658C]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-[#D8D2CB] rounded-lg focus:outline-none focus:border-[#398AB9] focus:ring-1 focus:ring-[#398AB9]"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#1C658C] text-white py-2 rounded-lg font-semibold hover:bg-[#398AB9] transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Instructions"}
          </button>
        </form>
        {message && (
          <p className="text-green-600 text-center mt-4">{message}</p>
        )}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        <p className="text-center text-sm text-[#1C658C] mt-6">
          Remembered your password?{" "}
          <Link href="/login" className="text-[#398AB9] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
