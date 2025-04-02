import React, { useState, useEffect } from "react";
import Image_logement from "./Image_logement";
import listeMaison from "./Liste_maison";

export default function Logement({
  isLoggedIn,
  isReversed,
  onFavoriteChange,
  favoriteList,
  filter,
}) {
  const [filteredList, setFilteredList] = useState(listeMaison);
  const [showTravaux, setShowTravaux] = useState(false);

  useEffect(() => {
    const filtered = listeMaison.filter((listing) => {
      const matchesFilter = listing.location
        .toLowerCase()
        .includes(filter.toLowerCase());
      const isTravaux = listing.id === 12 
      return matchesFilter && (showTravaux || !isTravaux);
    });
    setFilteredList(filtered);
  }, [filter, showTravaux]);

  return (
    <div className='ml-6 mt-6'>
      <h1 className='text-2xl font-bold'>Logements disponibles</h1>
      {isLoggedIn && (
        <button
          className='mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded'
          onClick={() => setShowTravaux(true)}>
          Voir maisons avec travaux
        </button>
      )}
      {!isLoggedIn ? (
        <p>Il faut être connecté pour voir les logements.</p>
      ) : (
        <div
          className={`flex overflow-x-auto gap-6 mt-6 cursor-pointer ${
            isReversed ? "flex-row-reverse" : "flex-row"
          }`}
          style={{
            justifyContent: isReversed ? "flex-end" : "flex-start",
          }}>
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
