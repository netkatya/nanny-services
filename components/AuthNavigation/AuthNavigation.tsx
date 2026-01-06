"use client";

import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";

type Props = {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
};

export default function AuthNavigation({
  onLoginClick,
  onRegisterClick,
}: Props) {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (isAuthenticated) {
    return (
      <div className="flex justify-center items-center gap-4 text-background">
        <div className="flex items-center justify-center gap-3.5 ml-0 lg:ml-auto">
          <div className="w-10 h-10 flex justify-center items-center bg-background rounded-xl">
            <svg width={24} height={24}>
              <use href="/img/icons.svg#icon-user" fill="#103931" />
            </svg>
          </div>
          <span className="font-medium text-[18px] leading-[111%] tracking-[-0.01em]">
            {user.displayName || user.email}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="h-12 w-33.5 border border-background rounded-[30px] hover:bg-white hover:text-(--dark-green) transition duration-250"
        >
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-4 justify-center items-center">
      <button
        onClick={onLoginClick}
        className="flex justify-center items-center border border-[rgba(251,251,251,0.4)] rounded-[30px] w-31 h-12 py-3.5 font-medium text-[16px] text-background hover:text-(--dark-green) hover:bg-background transition-all duration-250 ease-in-out"
      >
        Log In
      </button>
      <button
        onClick={onRegisterClick}
        className="border border-[rgba(251,251,251,0.4)] rounded-[30px] px-10 py-3.5 bg-background hover:bg-[#103931] hover:text-background md:bg-[#103931] md:hover:text-(--dark-green) md:hover:bg-background transition-all duration-250 ease-in-out font-medium text-[16px] text-[#103931] md:text-background"
      >
        Register
      </button>
    </div>
  );
}
