import HeaderInner from "../HeaderInner/HeaderInner";
import { PageProps } from "@/types/types";
import clsx from "clsx";

type HeaderProps = PageProps & {
  variant?: "default" | "overlay";
};

export default function Header({
  pageOption,
  variant = "default",
}: HeaderProps) {
  return (
    <header
      className={clsx(
        "h-22 flex justify-center items-center w-full border-b border-white/40",
        variant === "default" && "bg-(--dark-green)",
        variant === "overlay" && "absolute top-4 left-0 md:top-8 z-20"
      )}
    >
      <div
        className={clsx(
          variant === "default" && "container",
          variant === "overlay" &&
            "container px-6! md:px-14! lg:px-8! xl:px-32!"
        )}
      >
        <HeaderInner />
      </div>
    </header>
  );
}
