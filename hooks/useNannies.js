"use client";
import { useState, useEffect } from "react";
import { ref, onValue, query, orderByKey } from "firebase/database";
import { db } from "@/lib/firebase";

export const useNannies = () => {
  const [nannies, setNannies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const nanniesRef = query(ref(db, "nannies"), orderByKey());
    const unsubscribe = onValue(nanniesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setNannies(Object.values(data));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { nannies, loading };
};