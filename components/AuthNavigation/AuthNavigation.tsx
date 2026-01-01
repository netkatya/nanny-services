"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";

type AuthNavigationProps = {
  onClick?: () => void;
};

export default function AuthNavigation({ onClick }: AuthNavigationProps) {
  const router = useRouter();
  const { isAuthenticated, clearIsAuthenticated } = useAuthStore();

  const handleLogout = () => {
    clearIsAuthenticated();
    router.push("/");
    onClick?.();
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <div className="flex gap-3.5">
            <svg width={40} height={40}>
              <use href="/public/img/icons.svg#icon-user"></use>
            </svg>
            <p></p>
          </div>
          <button onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        <ul className="flex gap-2 justify-center items-center">
          <li className="">
            <Link
              href="/auth/login"
              className="border border-[rgba(251,251,251,0.4)] rounded-[30px] px-9.75 py-3.5 w-31 h-12
                font-medium text-[16px] leading-tight tracking-[-0.01em] text-background"
              prefetch={false}
              onClick={onClick}
            >
              Log In
            </Link>
          </li>
          <li className="">
            <Link
              href="/auth/register"
              className="rounded-[30px] px-10 py-3.5 w-42 h-12 bg-background md:bg-[#103931] font-medium text-[16px] leading-tight tracking-[-0.01em] text-[#103931] md:text-background"
              prefetch={false}
              onClick={onClick}
            >
              Registration
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}
