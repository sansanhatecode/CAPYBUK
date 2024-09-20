"use client";
import React, { useState } from "react";
import "./loginForm.css";
import Image from "next/image";

const LoginForm = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await console.log(email, password);
  };

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await console.log(name, email, password);
  };
  return (
    <div className="flex justify-center items-center flex-col h-[100vh]">
      <Image
        src="/assets/img/login.png"
        alt="cute capybara"
        width="300"
        height="300"
        className="fixed bottom-0 right-20 z-10 h-auto"
        priority
      ></Image>
      <div className={`container ${isSignIn ? `active` : ``}`}>
        <div className="form-container sign-up">
          <form>
            <h1 className="heading-1">Create Account</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span className="font-bold">or use your email for registeration</span>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
            />
            <div className="password">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              />
              {showPassword && password && (
                <i
                  className="fa-solid fa-eye absolute top-[50%] translate-y-[-50%] right-3 text-[#807d7ddc]"
                  onClick={() => {
                    setShowPassword(false);
                  }}
                ></i>
              )}
              {!showPassword && password && (
                <i
                  className="fa-solid fa-eye-slash absolute top-[50%] translate-y-[-50%] right-3 text-[#807d7ddc]"
                  onClick={() => {
                    setShowPassword(true);
                  }}
                ></i>
              )}
            </div>

            <button onClick={(e) => handleSignUp(e)}>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form>
            <h1 className="heading-1">Sign In</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span className="font-bold">or use your email and password</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div className="password">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              />
              {showPassword && password && (
                <i
                  className="fa-solid fa-eye absolute top-[50%] translate-y-[-50%] right-3 text-[#807d7ddc]"
                  onClick={() => {
                    setShowPassword(false);
                  }}
                ></i>
              )}
              {!showPassword && password && (
                <i
                  className="fa-solid fa-eye-slash absolute top-[50%] translate-y-[-50%] right-3 text-[#807d7ddc]"
                  onClick={() => {
                    setShowPassword(true);
                  }}
                ></i>
              )}
            </div>
            <a href="/forget-password" className="hover:text-black hover:underline italic">
              Forget Your Password?
            </a>
            <button onClick={(e) => handleSignIn(e)}>Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1 className="heading-1 text-white">Welcome Back!</h1>
              <p className="text-brown-xlight font-bold">
                Enter your personal details to use all of site features
              </p>
              <button
                className="hide"
                onClick={() => {
                  setIsSignIn(false);
                  setName("");
                  setEmail("");
                  setPassword("");
                }}
              >
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1 className="heading-1 text-white">Hello, Friend!</h1>
              <p className="text-brown-xlight font-bold">
                Register with your personal details to use all of site features
              </p>
              <button
                className="hide"
                onClick={() => {
                  setIsSignIn(true);
                  setName("");
                  setEmail("");
                  setPassword("");
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
