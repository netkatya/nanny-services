"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ref, get, set } from "firebase/database";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase/firebase";
import type { Nanny, Review } from "@/types/nanny";
import { FaStar } from "react-icons/fa";
import { Heart } from "lucide-react";
import { toast } from "sonner";

interface NannyCardProps {
  nanny: Nanny;
  onRemoveFavorite?: (nannyId: string) => void;
  onMakeAppointment: (nanny: Nanny) => void;
}

export default function NannyCard({
  nanny,
  onRemoveFavorite,
  onMakeAppointment,
}: NannyCardProps) {
  const { user } = useAuth();
  const [showDetails, setShowDetails] = useState(false); // toggle detailed view
  const [isFavorite, setIsFavorite] = useState(false); // track if nanny is favorite

  // Check if the nanny is already in favorites in Firebase
  useEffect(() => {
    if (!user) return;
    const favRef = ref(db, `users/${user.uid}/favorites/${nanny.id}`);
    get(favRef).then((snapshot) => setIsFavorite(snapshot.exists()));
  }, [user, nanny.id]);

  // Add/remove nanny from favorites
  const toggleFavorite = async () => {
    if (!user) {
      toast.error("For authorized users only!");
      return;
    }
    const favRef = ref(db, `users/${user.uid}/favorites/${nanny.id}`);
    const newValue = !isFavorite;
    await set(favRef, newValue ? true : null);
    setIsFavorite(newValue);

    // Notify parent to remove from Favorites page
    if (!newValue && onRemoveFavorite) {
      onRemoveFavorite(nanny.id);
    }
  };

  // Calculate age from birthday
  const calculateAge = (birthday: string) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 rounded-3xl bg-background">
      {/* Avatar */}
      <div className="border-2 border-[rgba(240,63,59,0.2)] rounded-[30px] w-30 h-30 p-3 flex justify-center items-center overflow-hidden relative">
        <span className="w-2.5 h-2.5 border-2 border-white rounded-full bg-[#38cd3e] z-20 absolute top-2.25 right-2.25"></span>
        <Image
          src={nanny.avatar_url}
          alt={nanny.name}
          width={96}
          height={96}
          className="w-24 h-24 rounded-[15px] object-cover"
        />
      </div>

      {/* Info section */}
      <div className="flex-1 flex flex-col">
        {/* Top row: nanny type, location, rating, price, favorite */}
        <div className="flex justify-between items-start md:items-center">
          <div className="flex items-center flex-wrap md:flex-nowrap w-full">
            <p className="font-medium text-[16px] text-gray-500 mb-2">Nanny</p>
            <div className="flex ml-auto flex-wrap gap-2 md:gap-0 mb-2 md:mb-0">
              {/* Location */}
              <div className="flex items-center">
                <svg width={16} height={16} className="mr-2 ml-auto">
                  <use
                    href="/img/icons.svg#icon-map-pin"
                    fill="#fbfbfb"
                    stroke="#000"
                  />
                </svg>
                <p className="font-medium md:text-[16px] leading-[150%]">
                  {nanny.location}
                </p>
              </div>
              <div className="w-px h-4 bg-[rgba(17,16,28,0.2)] mx-2"></div>

              {/* Rating */}
              <p className="flex items-center gap-1 font-medium text-[16px] leading-[150%]">
                <FaStar size={15} color="#ffc531" />
                {nanny.rating}
              </p>
              <div className="w-px h-4 bg-[rgba(17,16,28,0.2)] mx-2"></div>

              {/* Price */}
              <p className="font-medium text-[16px] leading-[150%]">
                Price / 1 hour:{" "}
                <span className="text-[#38cd3e]">{nanny.price_per_hour}$</span>
              </p>
            </div>
          </div>

          {/* Favorite button */}
          <button
            onClick={toggleFavorite}
            aria-label="Add to favorites"
            className="ml-12"
          >
            <Heart
              size={24}
              strokeWidth={2}
              className="transition-transform duration-200 hover:scale-110"
              {...(isFavorite
                ? { fill: "#103931", stroke: "#103931" }
                : { fill: "none", stroke: "#11101c" })}
            />
          </button>
        </div>

        {/* Nanny name */}
        <h3 className="font-medium text-[24px] leading-[100%] mb-6">
          {nanny.name}
        </h3>

        {/* Characteristics */}
        <div className="mt-2 flex flex-wrap gap-2">
          <div className="rounded-3xl py-2 px-4 bg-(--grey-bg) font-medium text-(--grey-text)">
            Age:{" "}
            <span className="text-foreground underline">
              {calculateAge(nanny.birthday)}
            </span>
          </div>
          <div className="rounded-3xl py-2 px-4 bg-(--grey-bg) font-medium text-(--grey-text)">
            Experience:{" "}
            <span className="text-foreground">{nanny.experience}</span>
          </div>
          <div className="rounded-3xl py-2 px-4 bg-(--grey-bg) font-medium text-(--grey-text)">
            Kids age: <span className="text-foreground">{nanny.kids_age}</span>
          </div>
          <div className="rounded-3xl py-2 px-4 bg-(--grey-bg) font-medium text-(--grey-text)">
            Characters:{" "}
            <span className="text-foreground">
              {nanny.characters?.length ? nanny.characters.join(", ") : "N/A"}
            </span>
          </div>
          <div className="rounded-3xl py-2 px-4 bg-(--grey-bg) font-medium text-(--grey-text)">
            Education:{" "}
            <span className="text-foreground">{nanny.education}</span>
          </div>
        </div>

        <p className="text-(--text1) mt-6">{nanny.about}</p>

        {/* Read more / reviews section */}
        <div className="mt-3.5">
          {!showDetails && nanny.reviews?.length ? (
            <button
              onClick={() => setShowDetails(true)}
              className="font-medium text-base leading-normal underline"
            >
              Read more
            </button>
          ) : null}

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              showDetails ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {nanny.reviews?.length ? (
              nanny.reviews.map((review: Review, index: number) => (
                <div key={index} className="mt-2">
                  <div className="flex gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full bg-(--light-green) flex justify-center items-center">
                      {review.reviewer.slice(0, 1)}
                    </div>
                    <div>
                      <p className="font-medium mb-1">{review.reviewer}</p>
                      <p className="font-medium text-[14px] leading-[1.29] flex gap-2">
                        <FaStar size={15} color="#ffc531" />
                        {review.rating.toFixed(1)}
                      </p>
                    </div>
                  </div>
                  <p className="text-(--text1)">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 mt-2">No reviews yet.</p>
            )}

            <button
              onClick={() => onMakeAppointment(nanny)}
              className="green-button mt-12 mb-6 px-7 py-3.5 w-53.75 h-12 font-medium text-[16px] leading-tight tracking-[-0.01em] text-background"
            >
              Make an appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
