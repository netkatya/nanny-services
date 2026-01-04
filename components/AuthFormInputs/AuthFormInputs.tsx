"use client";

import React from "react";
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
  return (
    <>
      {/* Email */}
      <div className="h-17.5 mb-1">
        <input
          type="email"
          placeholder="Email"
          className="input"
          {...register("email" as FieldPath<T>)}
        />
        {errors.email?.message && (
          <p className="text-red-500 text-[14px] mb-1">
            {errors.email.message as string}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="h-16 md:h-23 mb-4.5">
        <input
          type="password"
          placeholder="Password"
          className="input"
          {...register("password" as FieldPath<T>)}
        />
        {errors.password?.message && (
          <p className="text-red-500 text-[14px] mb-1">
            {errors.password.message as string}
          </p>
        )}
      </div>
    </>
  );
}
