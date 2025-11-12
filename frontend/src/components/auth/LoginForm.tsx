import React, { useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#F5EFEB] overflow-hidden p-10">
      <div className="flex max-w-[1100px] w-full h-[95vh] max-h-[210vh] bg-white rounded-3xl overflow-hidden shadow-2xl">
        {/* Left Side - Welcome Section */}
        <div className="flex-1 relative hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80"
            alt="Shoes"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-end items-center p-10 text-white text-left">
            <h1 className="text-5xl font-bold mb-6">Welcome Back!</h1>
            <p className="text-base leading-relaxed max-w-md">
              Mỗi tái khoản là một câu chuyện phong cách riêng.
              <br />
              Hãy đăng nhập để khám phá ưu đãi và nhận gợi ý độc
              <br />
              quyền chi dành cho bạn.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 p-8 lg:p-12 bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col justify-center">
          <h2
            className="text-6xl font-semibold text-slate-800 mt-5 mb-5 text-center"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Sign in
          </h2>

          {/* Social Login Icons */}
          <div className="flex justify-center gap-4 mb-5">
            <button
              className="w-[50px] h-[50px] rounded-full border border-slate-300 bg-white flex items-center justify-center text-[#5a7d9a] hover:bg-slate-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: "white" }}
            >
              <FaFacebookF size={19} />
            </button>
            <button
              className="w-[50px] h-[50px] rounded-full border border-slate-300 bg-white flex items-center justify-center text-[#5a7d9a] hover:bg-slate-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: "white" }}
            >
              <FaGoogle size={18} />
            </button>
            <button
              className="w-[50px] h-[50px] rounded-full border border-slate-300 bg-white flex items-center justify-center text-[#5a7d9a] hover:bg-slate-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: "white" }}
            >
              <FaLinkedinIn size={19} />
            </button>
          </div>

          <p className="text-center text-slate-500 text-sm mb-5">
            Or use your account
          </p>

          <form onSubmit={handleSubmit} className="">
            <div className="">
              <label
                htmlFor="email"
                className="block mb-2 text-slate-700 font-medium text-sm"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-full bg-white border-slate-200 placeholder:text-[#567C8D] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="password"
                className="block mb-2 text-slate-700 font-medium text-sm"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="(414) 804 - 987"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-full bg-white border-slate-200 placeholder:text-[#567C8D] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
                required
              />
            </div>

            <a
              href="/forgot-password"
              className="block text-center text-sm hover:underline transition-colors mt-6 mb-5"
              style={{ color: "#567C8D", fontFamily: "'DM Sans', sans-serif" }}
            >
              Forgot your password?
            </a>

            <button
              type="submit"
              className="block w-1/2 mx-auto"
              style={{
                backgroundColor: "#5a7d9a",
                color: "white",
                padding: "0.75rem",
                borderRadius: "9999px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#4a6d8a")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#5a7d9a")
              }
            >
              Sign in
            </button>

            <a
              href="/signup"
              className="block text-center font-medium hover:underline transition-colors mt-5 mb-5"
              style={{ color: "#567C8D" }}
            >
              Sign up
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
