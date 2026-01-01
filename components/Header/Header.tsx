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
        variant === "overlay" && "absolute top-8 left-4 md:top-8 md:left-8 z-20"
      )}
    >
      <div className="container">
        <HeaderInner pageOption={pageOption} />
      </div>
    </header>
  );
}
