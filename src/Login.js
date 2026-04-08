import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "client"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // REGISTER
  const handleRegister = () => {
    if (!form.name || !form.phone || !form.password) {
      alert("Fill all fields");
      return;
    }

    localStorage.setItem("user", JSON.stringify(form));
    alert("Account Created ✅");
    setIsLogin(true);
  };

  // LOGIN (PHONE BASED)
  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      savedUser.phone === form.phone &&
      savedUser.password === form.password &&
      savedUser.role === form.role
    ) {
      alert("Login Success 🎉");

      if (form.role === "vendor") navigate("/vendor");
      else navigate("/");
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-purple-700 to-pink-500 text-white p-10">
        <h1 className="text-4xl font-bold mb-4">
          EVENT PLANNER
        </h1>
        <p className="text-lg text-center max-w-md">
          Book DJs, Catering, Venues & more easily for your events.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-center items-center bg-gray-100">

        <div className="bg-white p-8 rounded-2xl shadow-2xl w-[350px]">

          <h2 className="text-2xl font-bold text-center mb-4 text-purple-600">
            {isLogin ? "Login 🔐" : "Register 🚀"}
          </h2>

          {/* REGISTER ONLY */}
          {!isLogin && (
            <>
              <input
                name="name"
                placeholder="Full Name"
                className="w-full p-2 mb-3 border rounded"
                onChange={handleChange}
              />

              <input
                name="email"
                placeholder="Email"
                className="w-full p-2 mb-3 border rounded"
                onChange={handleChange}
              />
            </>
          )}

          {/* PHONE */}
          <input
            name="phone"
            placeholder="Mobile Number"
            className="w-full p-2 mb-3 border rounded"
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 mb-3 border rounded"
            onChange={handleChange}
          />

          {/* ROLE */}
          <select
            name="role"
            className="w-full p-2 mb-3 border rounded"
            onChange={handleChange}
          >
            <option value="client">Client</option>
            <option value="vendor">Vendor</option>
          </select>

          {/* BUTTON */}
          <button
            onClick={isLogin ? handleLogin : handleRegister}
            className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
          >
            {isLogin ? "Login" : "Register"}
          </button>

          {/* TOGGLE */}
          <p
            onClick={() => setIsLogin(!isLogin)}
            className="text-center mt-4 text-sm cursor-pointer hover:underline"
          >
            {isLogin
              ? "New user? Create account"
              : "Already have an account?"}
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;