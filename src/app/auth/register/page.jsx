"use client";
import Image from "next/image";
import logoApp from "@/assets/images/logos/logo.png";
import illus from "@/assets/images/ilustrasi/auth-ilustrasion.png";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import React, { useState } from "react";
import { useRouter } from "next/navigation.js";
import { ROUTES } from "@/constants/routes.js";
import { useRegister } from "@/hooks/useAuth.js";
import { toast } from "sonner";

const Register = () => {
  const [data, setData] = useState({});
  const { register, isLoading, error } = useRegister();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await register(data);
      if (result?.data?.success) {
        toast.success(result?.message, { position: "top-right" });
      }
      router.push(ROUTES.HOME);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Username atau password salah",
        {
          position: "top-right",
        },
      );
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section>
      <div className="flex items-center w-full h-screen justify-between px-16 dark:bg-slate-900">
        <Image src={illus} alt="Auth ilustration" className="ml-36" />
        <div className="flex flex-col gap-6 justify-center h-full w-full max-w-141.5 items-center">
          <Image src={logoApp} alt="Astel logo" />
          <h1 className="text-primary text-center font-medium max-w-70 text-6xl">
            Create account
          </h1>
          <form className="w-full px-35" action="" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 w-full">
              <Input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <Input
                name="username"
                type="text"
                placeholder="Username"
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
              {isLoading ? "Loading..." : "Register"}
            </Button>
          </form>
          <p className=" text-sm mt-3 dark:text-slate-400">
            Already have an account?{" "}
            <a href={ROUTES.LOGIN} className="text-primary">
              Login
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
