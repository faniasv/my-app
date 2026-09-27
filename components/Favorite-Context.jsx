"use client";

import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Fungsi untuk menambah/menghapus dari favorit
  const toggleFavorite = (user) => {
    setFavorites((prev) => {
      const isFavorited = prev.some((fav) => fav.id === user.id);
      if (isFavorited) {
        return prev.filter((fav) => fav.id !== user.id); // Hapus jika sudah ada
      } else {
        return [...prev, user]; // Tambah jika belum ada
      }
    });
  };

  // Fungsi untuk mengecek apakah user ada di list favorit
  const isFavorite = (userId) => {
    return favorites.some((fav) => fav.id === userId);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

// Custom hook agar lebih mudah dipanggil di komponen lain
export const useFavorite = () => useContext(FavoriteContext);