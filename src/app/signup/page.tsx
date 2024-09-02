import Head from "next/head";

export default function Signup() {
  return (
    <div className="min-h-screen bg-[#EEEEEE] flex items-center justify-center">
      <Head>
        <title>Sign Up - MarketBridge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-[#1C658C] mb-8">
          Create Your Account
        </h1>
        <form>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#1C658C]"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 mt-1 border border-[#D8D2CB] rounded-lg focus:outline-none focus:border-[#398AB9] focus:ring-1 focus:ring-[#398AB9]"
              placeholder="Enter your full name"
              required
            />
          </div>
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
              className="w-full px-4 py-2 mt-1 border border-[#D8D2CB] rounded-lg focus:outline-none focus:border-[#398AB9] focus:ring-1 focus:ring-[#398AB9]"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#1C658C]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 border border-[#D8D2CB] rounded-lg focus:outline-none focus:border-[#398AB9] focus:ring-1 focus:ring-[#398AB9]"
              placeholder="Create a password"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-[#1C658C]"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full px-4 py-2 mt-1 border border-[#D8D2CB] rounded-lg focus:outline-none focus:border-[#398AB9] focus:ring-1 focus:ring-[#398AB9]"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#1C658C] text-white py-2 rounded-lg font-semibold hover:bg-[#398AB9] transition-colors"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-[#1C658C] mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#398AB9] hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
