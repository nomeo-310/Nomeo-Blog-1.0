"use client";

import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";


export interface inputProps {
  type: string;
  id: string;
  placeholder?: string;
  icon: IconType;
  disabled?: boolean;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  error?: string;
  value?:string
}

const Input = ({type, id, placeholder, icon: Icon, register, required, error, value }: inputProps) => {
  const [passwordType, setPasswordType] = React.useState("password");
  return (
    <div className="mb-3">
      <div className="relative w-[100%]">
        <input
          type={type === "password" ? passwordType : type}
          id={id}
          className={error ? "input-error-box" : "input-box"}
          placeholder={placeholder}
          {...register(id, { required })}
          autoComplete={id}
          value={value}
        />
        <Icon size={22} className="input-icon" />
        {type === "password" && (
          <React.Fragment>
            {passwordType === "password" ? (
              <BsEyeSlashFill
                size={22}
                className="password-icon"
                onClick={() => setPasswordType("text")}
              />
            ) : (
              <BsEyeFill
                size={22}
                className="password-icon"
                onClick={() => setPasswordType("password")}
              />
            )}
          </React.Fragment>
        )}
      </div>
      <p className="mt-1 ml-2 text-red">{error}</p>
    </div>
  );
};

export default Input;
