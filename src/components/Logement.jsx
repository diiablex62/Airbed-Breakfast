import React, { useState, useEffect } from "react";
import Image_logement from "./Image_logement";
import listeMaison from "./Liste_maison";

export default function Logement({
  isLoggedIn,
  isReversed,
  onFavoriteChange,
  favoriteList,
}) {
  const [filter, setFilter] = useState("");
  const [filteredList, setFilteredList] = useState(listeMaison);

  useEffect(() => {
    const filtered = listeMaison.filter((listing) =>
      listing.location.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredList(filtered);
  }, [filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="ml-6 mt-6">
      <h1 className="text-2xl font-bold">Logements disponibles</h1>
      <input
        type="text"
        placeholder="Filtrer par ville"
        value={filter}
        onChange={handleFilterChange}
        className="border border-gray-300 rounded-md p-2 mt-2"
      />
      {!isLoggedIn ? (
        <p>Il faut être connecté pour voir les logements.</p>
      ) : (
        <div
          className={`flex overflow-x-auto gap-6 mt-6 cursor-pointer ${
            isReversed ? "flex-row-reverse" : "flex-row"
          }`}
          style={{
            justifyContent: isReversed ? "flex-end" : "flex-start",
          }}
        >
          {filteredList.map((listing) => (
            <Image_logement
              key={listing.id}
              listing={listing}
              onFavoriteChange={onFavoriteChange}
              isFavorite={favoriteList.includes(listing.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
