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
  const [filteredList, setFilteredList] = useState([]);
  const [showWorkInProgress, setShowWorkInProgress] = useState(false);

  const workInProgressListing = listeMaison.find((listing) => listing.id === 12);

  useEffect(() => {
    const initialFiltered = listeMaison.filter((listing) => listing.id !== 12);

    const filteredByLocation = initialFiltered.filter((listing) =>
      listing.location.toLowerCase().includes(filter.toLowerCase())
    );

    setFilteredList(filteredByLocation);
  }, [filter]);

  const handleWorkInProgressClick = () => {
    setShowWorkInProgress(true);
    if (workInProgressListing) {
      setFilteredList((prevList) => [...prevList, workInProgressListing]);
    }
  };

  return (
    <div className="ml-6 mt-6">
      <h1 className="text-2xl font-bold">Logements disponibles</h1>
      {isLoggedIn && (
        <button
          onClick={handleWorkInProgressClick}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Voir les maisons en travaux
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
