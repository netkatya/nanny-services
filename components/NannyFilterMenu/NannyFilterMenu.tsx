"use client";

import { Nanny } from "@/types/nanny";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export type SortOption =
  | "alphabet-asc"
  | "alphabet-desc"
  | "price-less-10"
  | "price-more-10"
  | "popular"
  | "not-popular"
  | "all";

type NannyFilterMenuProps = {
  onChange: (option: SortOption) => void;
  nannies?: Nanny[];
  setFilteredNannies?: React.Dispatch<React.SetStateAction<Nanny[]>>;
};

const FILTERS: { label: string; value: SortOption }[] = [
  { label: "A to Z", value: "alphabet-asc" },
  { label: "Z to A", value: "alphabet-desc" },
  { label: "Less then $10", value: "price-less-10" },
  { label: "Greater then $10", value: "price-more-10" },
  { label: "Popular", value: "popular" },
  { label: "Not popular", value: "not-popular" },
  { label: "Show All", value: "all" },
];

export default function NannyFilterMenu({ onChange }: NannyFilterMenuProps) {
  const [selected, setSelected] = useState<SortOption>("alphabet-asc");
  const [open, setOpen] = useState(false);

  const handleSelect = (option: SortOption) => {
    setSelected(option);
    onChange(option);
    setOpen(false);
  };

  return (
    <>
      <p className="font-medium text-[14px] leading-[129%] text-[#8a8a89] mb-2">
        Filters
      </p>
      <div className="relative inline-block text-left mb-8">
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex justify-between w-56.5 rounded-[14px] px-4.5 py-4 bg-(--dark-green) font-medium text-[18px] leading-[111%] text-background"
        >
          {FILTERS.find((f) => f.value === selected)?.label}

          {open ? (
            <ChevronUp className="ml-2 h-5 w-5" />
          ) : (
            <ChevronDown className="ml-2 h-5 w-5" />
          )}
        </button>

        {open && (
          <div className="absolute mt-2 w-56.5 rounded-[14px] shadow-[0_20px_69px_0_rgba(0,0,0,0.07)] bg-white z-50 px-4.5 pt-3.5 pb-1.5">
            <div className="">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => handleSelect(f.value)}
                  className={`block w-full text-left text-lg font-normal leading-[111%] text-[rgba(17,16,28,0.3)] mb-3 hover:text-foreground transition-colors duration-200 ${
                    selected === f.value ? "text-foreground" : ""
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
