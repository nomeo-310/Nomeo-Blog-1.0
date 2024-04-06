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
  value?:string
  onChange?: (event:React.ChangeEvent<HTMLInputElement>) => void
}

const InputBox = ({type, id, placeholder, icon: Icon, value, disabled, onChange }: inputProps) => {
  return (
    <div className="mb-3">
      <div className="relative w-[100%]">
        <input type={type} id={id} className="input-box" placeholder={placeholder} autoComplete={id} value={value} disabled={disabled} onChange={onChange}/>
        <Icon size={22} className="input-icon" />
      </div>
    </div>
  );
};

export default InputBox;