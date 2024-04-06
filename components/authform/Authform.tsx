"use client";

import React from "react";
import Input from "../common/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { BsPerson, BsEnvelope, BsLock } from "react-icons/bs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserValidation,loginUserValidation } from "@/libs/utils/validationSchemas";
import Image from "next/image";
import Link from "next/link";
import AnimationWrapper from "../common/AnimationWrapper";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import axios, { AxiosError } from "axios";

interface authFormProps {
  type: "login" | "register";
}

const Authform = ({ type }: authFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next')

  const registerDefaultData = { email: "", password: "", fullname: "" };
  const loginDefaultData = { email: "", password: "" };

  const { register, handleSubmit, formState: { errors }} = useForm<FieldValues>({
    resolver: zodResolver(type === "register" ? createUserValidation : loginUserValidation),
    defaultValues: type === "register" ? registerDefaultData : loginDefaultData,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    
    if (type === "register") {
      try {
        const { email, fullname, password } = data;
        const userData = { email: email, fullname: fullname, password: password }
        const response = await axios.post('/api/createUser', userData)
        if (response.status === 200) {
          toast.success("User successfully created");
          router.push("/sign-in");
        }
      } catch (error) {
        if(error instanceof AxiosError) {
          if (error?.response?.status === 400) {
            toast.error(error.response.data);
          }
          if (error?.response?.status === 500) {
            toast.error(error.response.data);
          }
        }
      }
    }

    if (type === "login") {
      signIn("credentials", { ...data, redirect: false }).then((callback) => {
        if (callback?.ok) {
          toast.success("Succesfull Logged In");
          router.refresh();
          router.push(next ? next : "/");
        }

        if (callback?.error) {
          toast.error(callback.error);
        }
      });
    }
  };

  const socialSign = () => {
    signIn("google", {redirect: false}).then((callback) => {
      if (callback?.ok) {
        router.push(next ? next : "/");
    }});
  };

  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <form
          className="w-[80%] max-w-[400px]"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h1 className="font-bold text-4xl capitalize text-center mb-16 dark:text-white">
            {type === "login" ? "Welcome back!" : "Create account"}
          </h1>

          { type === "register" && (
            <Input
              type="text"
              placeholder="Full Name"
              id="fullname"
              icon={BsPerson}
              register={register}
              required
              error={errors.fullname?.message as string}
            />
          )}

          <Input
            type="email"
            placeholder="yourmail@email.com"
            id="email"
            icon={BsEnvelope}
            register={register}
            required
            error={errors.email?.message as string}
          />

          <Input
            type="password"
            placeholder="Your password"
            id="password"
            icon={BsLock}
            register={register}
            required
            error={errors.password?.message as string}
          />

          <button type="submit" className="btn-dark center mt-12">
            {type === "login" ? "Login" : "Create account"}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-40 text-black font-bold">
            <hr className="w-1/2 border-black dark:border-grey" />
            <p className="block dark:text-white">Or</p>
            <hr className="w-1/2 border-black dark:border-grey" />
          </div>

          <button
            className="btn-dark flex items-center justify-center gap-4 w-[90%] center"
            type="button"
            onClick={socialSign}
          >
            <div className="w-5 h-5 relative">
              <Image src="/images/google.png" alt="google_logo" fill />
            </div>
            Continue with google
          </button>

          <p className="mt-6 text-dark-grey text-xl text-center dark:text-white">
            {type === "login" ? "Don't have an account?" : "Already a member?"}
            <Link
              href={type === "login" ? "/sign-up" : "/sign-in"}
              className="text-xl underline text-black ml-1 dark:text-grey"
            >
              {type === "login" ? "Create an account" : "Sign in here"}
            </Link>
          </p>
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default Authform;
