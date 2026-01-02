"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ref, get, set } from "firebase/database";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase/firebase";
import type { Nanny, Review } from "@/types/nanny";
import { FaStar } from "react-icons/fa";
import { Heart } from "lucide-react";

interface NannyCardProps {
  nanny: Nanny;
}

export default function NannyCard({ nanny }: NannyCardProps) {
  const { user } = useAuth();
  const [showDetails, setShowDetails] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!user) return;
    get(ref(db, `users/${user.uid}/favorites/${nanny.id}`)).then((snapshot) =>
      setIsFavorite(snapshot.exists())
    );
  }, [user, nanny.id]);

  const toggleFavorite = async () => {
    if (!user) {
      alert("For authorized users only!");
      return;
    }
    const favRef = ref(db, `users/${user.uid}/favorites/${nanny.id}`);
    await set(favRef, isFavorite ? null : true);
    setIsFavorite((prev) => !prev);
  };

  function calculateAge(birthday: string) {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 border rounded-lg bg-white shadow-sm">
      {/* Avatar */}
      <div className="border-2 border-[rgba(240,63,59,0.2)] rounded-[30px] w-30 h-30 p-3 flex justify-center items-center overflow-hidden">
        <Image
          src={nanny.avatar_url}
          alt={nanny.name}
          width={96}
          height={96}
          className="w-24 h-24 rounded-[15px] object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col">
        {/* Top row: Nanny type, location, rating, price, favorite */}
        <div className="flex justify-between items-start md:items-center">
          <div className="flex items-center flex-wrap gap-2 md:gap-4">
            <p className="font-medium text-[16px] text-gray-500">Nanny</p>

            {/* Location */}
            <div className="flex items-center">
              <svg width={16} height={16} className="mr-2">
                <use
                  href="/img/icons.svg#icon-map-pin"
                  fill="#fbfbfb"
                  stroke="#000"
                />
              </svg>
              <p className="font-medium text-[16px] text-[#11101c]">
                {nanny.location}
              </p>
            </div>

            <div className="w-px h-4 bg-[rgba(17,16,28,0.2)] mx-2"></div>

            {/* Rating */}
            <p className="flex items-center gap-1">
              <FaStar size={15} color="#ffc531" />
              {nanny.rating}
            </p>

            <div className="w-px h-4 bg-[rgba(17,16,28,0.2)] mx-2"></div>

            {/* Price */}
            <p className="text-[16px] text-[#11101c]">
              ${nanny.price_per_hour}/hour
            </p>
          </div>

          {/* Favorite */}
          <button
            onClick={toggleFavorite}
            aria-label="Add to favorites"
            className="ml-2"
          >
            <Heart
              size={24}
              strokeWidth={2}
              className="transition-transform duration-200 hover:scale-110 cursor-pointer"
              {...(isFavorite
                ? { fill: "#103931", stroke: "#103931" }
                : { fill: "none", stroke: "#11101c" })}
            />
          </button>
        </div>

        {/* Name */}
        <h3 className="font-medium text-[24px] leading-none mt-2">
          {nanny.name}
        </h3>

        {/* About */}
        <div className="mt-2 text-sm space-y-1">
          <p>Age: {calculateAge(nanny.birthday)}</p>
          <p>Experience: {nanny.experience}</p>
          <p>Kids age: {nanny.kids_age}</p>
          <p>
            <strong>Characters:</strong>{" "}
            {nanny.characters && nanny.characters.length > 0
              ? nanny.characters.map((char, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-100 rounded text-sm mr-1"
                  >
                    {char}
                  </span>
                ))
              : "N/A"}
          </p>
          <p>Education: {nanny.education}</p>
        </div>
        <p>{nanny.about}</p>
        {/* Read more / reviews */}
        <div className="mt-2">
          <button
            onClick={() => setShowDetails((prev) => !prev)}
            className="text-blue-500 underline text-sm mb-2"
          >
            {showDetails ? "Hide details" : "Read more"}
          </button>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              showDetails ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {nanny.reviews && nanny.reviews.length > 0 ? (
              nanny.reviews.map((review: Review, index: number) => (
                <div
                  key={index}
                  className="p-2 border rounded-md bg-gray-50 mt-2"
                >
                  <p className="font-medium">{review.reviewer}</p>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-yellow-500">Rating: {review.rating}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 mt-2">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
