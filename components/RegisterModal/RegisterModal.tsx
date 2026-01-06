import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FirebaseError } from "firebase/app";
import AuthFormInputs from "../AuthFormInputs/AuthFormInputs";
import { regSchema } from "@/validation/validation";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

type Props = {
  onClose: () => void;
};

export default function RegisterModal({ onClose }: Props) {
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(regSchema),
  });

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  const onSubmit = async (data: FormValues) => {
    setAuthError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(userCredential.user, {
        displayName: data.name,
      });

      onClose();
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/email-already-in-use":
            setAuthError("Email already in use");
            break;
          case "auth/weak-password":
            setAuthError("Password is too weak");
            break;
          default:
            setAuthError("Something went wrong. Try again.");
        }
      } else {
        setAuthError("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="backdrop" onClick={onClose}>
      <div
        className="w-74 md:w-141.25 min-h-122.25 rounded-2xl md:rounded-[30px] p-8 lg:p-16 bg-background relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-xl"
          aria-label="Close modal"
        >
          ✕
        </button>

        <h2 className="font-medium text-2xl md:text-4xl mb-5">Registration</h2>
        <p className="text-(--text1) text-xm mb-10">
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="h-17.5 mb-1">
            <input
              type="text"
              placeholder="Name"
              className="input focus:outline-none"
              {...register("name")}
            />
            {errors.name?.message && (
              <p className="text-red-500 text-[14px] mb-1">
                {errors.name.message as string}
              </p>
            )}
          </div>
          <AuthFormInputs register={register} errors={errors} />
          <button
            type="submit"
            disabled={isSubmitting}
            className="green-button py-4 w-full mb-2"
          >
            {isSubmitting ? "Registrating..." : "Sign Up"}
          </button>
          <div className="flex items-center h-4 mb-1">
            {authError && (
              <p className="text-red-500 text-[14px] mb-1">{authError}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
