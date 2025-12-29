import Link from "next/link";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

import { PageProps } from "@/types/types";

export default function HeaderInner({ pageOption }: PageProps) {
  return (
    <div className="flex justify-between items-center">
      <Link href="/">
        <svg width={164} height={28}>
          <use href="/img/icons.svg#icon-Logo" fill="#fbfbfb"></use>
        </svg>
      </Link>
      <nav className="flex gap-10">
        <a href="">Home</a>
        <a href="">Nannies</a>
        {pageOption === "other" && <a href="/favorites">Favorites</a>}
      </nav>
      <AuthNavigation />
    </div>
  );
}
