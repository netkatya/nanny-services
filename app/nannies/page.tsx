"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import NannyCard from "@/components/NannyCard/NannyCard";

import { ref, get } from "firebase/database";
import { db } from "@/lib/firebase/firebase";
import type { Nanny } from "@/types/nanny";
import Loading from "../Loading";

const ITEMS_PER_PAGE = 3;

export default function NanniesPage() {
  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNannies = async () => {
      try {
        const snapshot = await get(ref(db, "nannies"));

        if (!snapshot.exists()) return;

        const data = snapshot.val();

        const list: Nanny[] = Object.entries(data).map(([id, value]) => ({
          id,
          ...(value as Omit<Nanny, "id">),
        }));

        setNannies(list);
      } finally {
        setLoading(false);
      }
    };

    fetchNannies();
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <>
      <Header pageOption="other" variant="default" />

      <main className="bg-[#f3f3f3] pt-16 pb-25 px-4 lg:px-32">
        <div className="container">
          {loading && <Loading />}

          {!loading && (
            <>
              <ul className="flex flex-col gap-8">
                {nannies.slice(0, visibleCount).map((nanny) => (
                  <li key={nanny.id}>
                    <NannyCard nanny={nanny} />
                  </li>
                ))}
              </ul>

              {visibleCount < nannies.length && (
                <div className="flex justify-center mt-16">
                  <button
                    onClick={loadMore}
                    className="rounded-[30px] px-10 py-3.5 w-39.75 h-12 bg-(--dark-green) text-background font-medium text-[16px] leading-tight tracking-[-0.01em]"
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
