"use client";

import React, { useState } from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  FieldPath,
} from "react-hook-form";

type EmailPasswordFieldsProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

export default function EmailPasswordFields<T extends FieldValues>({
  register,
  errors,
}: EmailPasswordFieldsProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {/* Email */}
      <div className="h-17.5 mb-1">
        <input
          type="email"
          placeholder="Email"
          className="input focus:outline-none"
          {...register("email" as FieldPath<T>)}
        />
        {errors.email?.message && (
          <p className="text-red-500 text-[14px] mb-1">
            {errors.email.message as string}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="h-16 md:h-23 mb-4.5 relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="input pr-12 focus:outline-none"
          {...register("password" as FieldPath<T>)}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-7 -translate-y-1/2"
          aria-label="Toggle password visibility"
        >
          <svg width="24" height="24">
            <use
              href={
                showPassword
                  ? "/img/icons.svg#icon-eye-off"
                  : "/img/icons.svg#icon-eye"
              }
              fill="#fff"
              stroke="#11101c"
            />
          </svg>
        </button>
        {errors.password?.message && (
          <p className="text-red-500 text-[14px] mb-1">
            {errors.password.message as string}
          </p>
        )}
      </div>
    </>
  );
}
