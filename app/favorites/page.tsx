"use client";

import { useState, useEffect } from "react";
import NannyCard from "@/components/NannyCard/NannyCard";
import { useAuth } from "@/context/AuthContext";
import { ref, get } from "firebase/database";
import { db } from "@/lib/firebase/firebase";
import type { Nanny } from "@/types/nanny";
import Header from "@/components/Header/Header";
import NannyFilterMenu from "@/components/NannyFilterMenu/NannyFilterMenu";
import { SortOption } from "@/components/NannyFilterMenu/NannyFilterMenu";
import { filterAndSortNannies } from "@/utils/nannyUtils";
import Loading from "../Loading";

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Nanny[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<Nanny[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch favorites from Firebase
  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      setLoading(true); // start loading
      try {
        const snapshot = await get(ref(db, `users/${user.uid}/favorites`));
        if (!snapshot.exists()) {
          setFavorites([]);
          setFilteredFavorites([]);
          setLoading(false);
          return;
        }

        const favIds = Object.keys(snapshot.val());
        const nanniesSnapshot = await get(ref(db, "nannies"));
        if (!nanniesSnapshot.exists()) {
          setFavorites([]);
          setFilteredFavorites([]);
          setLoading(false);
          return;
        }

        const allNannies: Nanny[] = Object.entries(nanniesSnapshot.val()).map(
          ([id, value]) => ({ id, ...(value as Omit<Nanny, "id">) })
        );

        const favNannies = allNannies.filter((n) => favIds.includes(n.id));
        setFavorites(favNannies);
        setFilteredFavorites(favNannies);
      } finally {
        setLoading(false); // stop loading
      }
    };

    fetchFavorites();
  }, [user]);

  // Remove a nanny from favorites
  const handleRemoveFavorite = (nannyId: string) => {
    setFavorites((prev) => prev.filter((n) => n.id !== nannyId));
    setFilteredFavorites((prev) => prev.filter((n) => n.id !== nannyId));
  };

  // Handle filter changes
  const handleFilterChange = (option: SortOption) => {
    setFilteredFavorites(filterAndSortNannies(favorites, option));
  };

  return (
    <>
      <Header pageOption="other" variant="default" />
      <main className="bg-[#f3f3f3] pt-16 pb-25 px-4 lg:px-32 min-h-screen">
        <div className="container">
          <NannyFilterMenu onChange={handleFilterChange} />

          {/* Loading indicator */}
          {loading ? (
            <Loading />
          ) : filteredFavorites.length > 0 ? (
            filteredFavorites.map((nanny) => (
              <NannyCard
                key={nanny.id}
                nanny={nanny}
                onRemoveFavorite={handleRemoveFavorite}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">No favorites yet.</p>
          )}
        </div>
      </main>
    </>
  );
}
