import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FirebaseError } from "firebase/app";
import AuthFormInputs from "../AuthFormInputs/AuthFormInputs";
import { loginSchema } from "@/validation/validation";

type FormValues = {
  email: string;
  password: string;
};

type Props = {
  onClose: () => void;
};

export default function LogInModal({ onClose }: Props) {
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
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
      await signInWithEmailAndPassword(auth, data.email, data.password);
      onClose();
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        if (
          err.code === "auth/wrong-password" ||
          err.code === "auth/user-not-found"
        ) {
          setAuthError("Invalid email or password");
        } else {
          setAuthError("Something went wrong. Try again.");
        }
      } else if (err instanceof Error) {
        setAuthError(err.message);
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

        <h2 className="font-medium text-2xl md:text-4xl mb-5">Log In</h2>
        <p className="text-(--text1) text-xm mb-10">
          Welcome back! Please enter your credentials to access your account and
          continue your babysitter search.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <AuthFormInputs register={register} errors={errors} />
          <button
            type="submit"
            disabled={isSubmitting}
            className="green-button py-4 w-full mb-2"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
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
