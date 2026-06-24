"use client";
import Image from "next/image";
import logoApp from "@/assets/images/logos/logo.png";
import illus from "@/assets/images/ilustrasi/auth-ilustrasion.png";
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import React, { useState } from "react";

const Register = () => {
    const [password, setPassword] = useState("");
    
  return (
    <section>
        <link href="https://cdn.boxicons.com/3.0.8/fonts/basic/boxicons.min.css" rel="stylesheet"></link>
        <link href="https://cdn.boxicons.com/3.0.8/fonts/filled/boxicons-filled.min.css" rel="stylesheet"></link>
        <link href="https://cdn.boxicons.com/3.0.8/fonts/brands/boxicons-brands.min.css" rel="stylesheet"></link>
        <div className="flex items-center w-full h-screen justify-between px-16">
            <Image src={illus} alt="Auth ilustration" className="ml-36"/>
            <div className="flex flex-col gap-6 justify-center h-full w-full max-w-141.5 items-center">
                <Image src={logoApp} alt="Astel logo" />
                <h1 className="text-primary text-center font-medium max-w-70 text-6xl">Create account</h1>
                <form className="w-full px-35" action="">
                    <div className="flex flex-col gap-3 w-full">
                        <Input type="email" placeholder="Email" />
                        <Input type="text" placeholder="Username" />
                        <PasswordInput placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <Button type="submit" onClick={""} className="mt-6">
                        Create account
                    </Button>
                </form>
                <p className=" text-sm mt-3">Already have an account? <a href="/auth/login" className="text-primary">Login</a></p>
            </div>
        </div>
    </section>
  )
}

export default Register;