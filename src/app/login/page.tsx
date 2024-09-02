import Head from "next/head";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#EEEEEE] flex items-center justify-center">
      <Head>
        <title>Login - MarketBridge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-[#1C658C] mb-8">
          Login to MarketBridge
        </h1>
        <form>
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
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <input
                type="checkbox"
                id="remember"
                className="text-[#398AB9] focus:ring-[#398AB9]"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-[#1C658C]">
                Remember me
              </label>
            </div>
            <a
              href="/forgot-password"
              className="text-sm text-[#398AB9] hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-[#1C658C] text-white py-2 rounded-lg font-semibold hover:bg-[#398AB9] transition-colors"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-[#1C658C] mt-6">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-[#398AB9] hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
