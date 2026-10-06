// Update
// BE 2 CRUD not using useState again, but using Context API to manage state globally
// DB Live 2 Connect to Supabase
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FavoriteContext = createContext(undefined);

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const res = await fetch("/api/favorites-db");

        if (!res.ok) {
          throw new Error("Gagal mengambil data favorites");
        }

        const data = await res.json();

        setFavorites(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load favorites:", error);
        setFavorites([]);
      }
    }

    loadFavorites();
  }, []);

  async function addFavorite(user) {
    try {
      const res = await fetch("/api/favorites-db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Failed to add favorite:", result.error);
        return;
      }

      setFavorites((prev) => [...prev, result]);
    } catch (error) {
      console.error("Failed to add favorite:", error);
    }
  }

  async function removeFavorite(userId) {
    try {
      const res = await fetch(`/api/favorites-db/${userId}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Failed to remove favorite:", result.error);
        return;
      }

      setFavorites((prev) =>
        prev.filter((favorite) => favorite.id !== userId)
      );
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  }

  function isFavorite(userId) {
    return favorites.some(
      (favorite) => favorite.id === userId
    );
  }

  async function toggleFavorite(user) {
    if (isFavorite(user.id)) {
      await removeFavorite(user.id);
    } else {
      await addFavorite(user);
    }
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);

  if (context === undefined) {
    throw new Error(
      "useFavorite harus dipakai di dalam <FavoriteProvider>"
    );
  }

  return context;
}