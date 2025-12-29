import HeaderInner from "../HeaderInner/HeaderInner";
import { PageProps } from "@/types/types";

export default function Header({ pageOption }: PageProps) {
  return (
    <header className="h-22 flex justify-center items-center">
      <div className="container">
        <HeaderInner pageOption={pageOption} />
      </div>
    </header>
  );
}
