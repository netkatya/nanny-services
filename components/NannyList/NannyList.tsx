"use client";

import NannyCard from "@/components/NannyCard/NannyCard";
import type { Nanny } from "@/types/nanny";

type Props = {
  nannies: Nanny[];
  visibleCount: number;
  onLoadMore: () => void;
  hasMore: boolean;
};

export default function NannyList({
  nannies,
  visibleCount,
  onLoadMore,
  hasMore,
}: Props) {
  return (
    <>
      {nannies.length > 0 ? (
        <ul className="flex flex-col gap-8">
          {nannies.map((nanny) => (
            <li key={nanny.id}>
              <NannyCard nanny={nanny} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No nannies found for this filter.
        </p>
      )}

      {hasMore && (
        <div className="flex justify-center mt-16">
          <button
            onClick={onLoadMore}
            className="rounded-[30px] px-10 py-3.5 w-39.75 h-12 bg-(--dark-green) text-background font-medium text-[16px] leading-tight tracking-[-0.01em]"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}
