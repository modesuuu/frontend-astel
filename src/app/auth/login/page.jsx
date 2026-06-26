"use client";
import Image from "next/image";
import logoApp from "@/assets/images/logos/logo.png";
import illus from "@/assets/images/ilustrasi/auth-ilustrasion.png";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import React, { useState } from "react";
import { ROUTES } from "@/constants/routes.js";
import { useLogin } from "@/hooks/useAuth.js";
import { useRouter } from "next/navigation.js";

const Login = () => {
  const [data, setData] = useState({});
  const { login, isLoading, error } = useLogin();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(data);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <section>
      <div className="flex items-center w-full h-screen justify-between px-16">
        <Image src={illus} alt="Auth ilustration" className="ml-36" />
        <div className="flex flex-col gap-6 justify-center h-full w-full max-w-141.5 items-center">
          <Image src={logoApp} alt="Astel logo" />
          <h1 className="text-primary text-center font-medium max-w-70 text-6xl">
            Welcome Back
          </h1>
          <form className="w-full px-35" onSubmit={handleSubmit} action="">
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-col gap-3 w-full">
              <Input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
              />
              <PasswordInput
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              className={
                isLoading ? "opacity-50 cursor-not-allowed mt-6" : "mt-6"
              }
              disabled={isLoading}
            >
              {isLoading ? "Tunggu bentar nyed...!" : "Login"}
            </Button>
          </form>
          <p className=" text-sm mt-3">
            Don't have an account?{" "}
            <a href={ROUTES.REGISTER} className="text-primary">
              Register
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
