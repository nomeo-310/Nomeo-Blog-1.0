"use client";

import React from "react";
import Input from "../common/Input";
import { useRouter } from "next/navigation";
import { BsPerson, BsEnvelope, BsKey } from "react-icons/bs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserValidation,loginUserValidation } from "@/libs/utils/validationSchemas";
import Image from "next/image";
import Link from "next/link";
import AnimationWrapper from "../common/AnimationWrapper";
import { createUser } from "@/libs/actions/user.action";
import { userProps } from "@/types/types";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

interface authFormProps {
  type: "login" | "register";
}

const Authform = ({ type }: authFormProps) => {
  const router = useRouter();

  const authFormDefaultData = { email: "", password: "", fullname: "" };

  const { register, handleSubmit, formState: { errors }} = useForm<FieldValues>({
    resolver: zodResolver(
      type === "register" ? createUserValidation : loginUserValidation
    ),
    defaultValues: authFormDefaultData,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (type === "register") {
      try {
        const newdata = await createUser(data as userProps);

        if (newdata.success) {
          toast.success(newdata.success);
          router.push("/sign-in");
        } else {
          toast.error(newdata.error);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }

    if (type === "login") {
      signIn("credentials", { ...data, redirect: false }).then((callback) => {
        if (callback?.ok) {
          toast.success("Succesfull Logged In");
          router.refresh();
          router.push("/");
        }

        if (callback?.error) {
          toast.error(callback.error);
        }
      });
    }
  };

  const socialSign = () => {
    signIn("google");
  };

  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <form
          className="w-[80%] max-w-[400px]"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h1 className="font-bold text-4xl capitalize text-center mb-16">
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
            icon={BsKey}
            register={register}
            required
            error={errors.password?.message as string}
          />

          <button type="submit" className="btn-dark center mt-12">
            {type === "login" ? "Login" : "Create account"}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-40 text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p className="block">Or</p>
            <hr className="w-1/2 border-black" />
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

          <p className="mt-6 text-dark-grey text-xl text-center">
            {type === "login" ? "Don't have an account?" : "Already a member?"}
            <Link
              href={type === "login" ? "/sign-up" : "/sign-in"}
              className="text-xl underline text-black ml-1"
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
