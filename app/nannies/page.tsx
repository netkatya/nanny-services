"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import NannyFilterMenu from "@/components/NannyFilterMenu/NannyFilterMenu";
import NannyList from "@/components/NannyList/NannyList";

import { ref, get } from "firebase/database";
import { db } from "@/lib/firebase/firebase";
import type { Nanny, SortOption } from "@/types/nanny";
import { filterAndSortNannies } from "@/utils/nannyUtils";
import Loading from "../Loading";
import AppointmentModal from "@/components/AppointmentModal/AppointmentModal";

const ITEMS_PER_PAGE = 3;

export default function NanniesPage() {
  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [filteredNannies, setFilteredNannies] = useState<Nanny[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState<SortOption>("all");
  const [selectedNanny, setSelectedNanny] = useState<Nanny | null>(null);

  // Fetch nannies from Firebase
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

  // Apply filter + pagination
  useEffect(() => {
    const list = filterAndSortNannies(nannies, currentFilter);
    setFilteredNannies(list.slice(0, visibleCount));
  }, [nannies, currentFilter, visibleCount]);

  // Load more nannies
  const loadMore = () => setVisibleCount((prev) => prev + ITEMS_PER_PAGE);

  // Handle filter menu change
  const handleFilterChange = (option: SortOption) => {
    setCurrentFilter(option);
    setVisibleCount(ITEMS_PER_PAGE); // reset pagination on filter change
  };

  // Calculate if there are more items for "Load more" button
  const hasMore =
    filteredNannies.length <
    filterAndSortNannies(nannies, currentFilter).length;

  const handleMakeAppointment = (nanny: Nanny) => {
    setSelectedNanny(nanny);
  };

  return (
    <>
      <Header pageOption="other" variant="default" />

      <main className="bg-[#f3f3f3] pt-16 pb-25 px-4 lg:px-32 min-h-screen">
        <div className="container">
          {loading ? (
            <Loading />
          ) : (
            <>
              <NannyFilterMenu onChange={handleFilterChange} />
              <NannyList
                nannies={filteredNannies}
                visibleCount={visibleCount}
                onLoadMore={loadMore}
                hasMore={hasMore}
                onMakeAppointment={handleMakeAppointment}
              />
            </>
          )}
          {selectedNanny && (
            <AppointmentModal
              nanny={selectedNanny}
              onClose={() => setSelectedNanny(null)}
            />
          )}
        </div>
      </main>
    </>
  );
}
