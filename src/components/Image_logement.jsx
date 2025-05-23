import React, { useState } from "react";
import { FaHeart, FaTimes } from "react-icons/fa";
import ImageModal from "./ImageModal";

export default function Image_logement({
  listing,
  onFavoriteChange,
  isFavorite,
  onRemove, // Add this prop
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const toggleFavorite = () => {
    onFavoriteChange(listing.id, !isFavorite);
  };

  const openModal = () => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRemoveClick = (event) => {
    event.stopPropagation(); // Prevent modal from opening when clicking the remove button
    onRemove(listing.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0 w-64 relative">
      <button
        onClick={handleRemoveClick}
        className="absolute top-2 right-2 p-1 rounded-full focus:outline-none bg-gray-200 hover:bg-gray-300"
      >
        <FaTimes className="h-4 w-4 text-gray-600" />
      </button>
      <img
        src={listing.image}
        alt={listing.title}
        className="w-full h-48 object-cover cursor-pointer"
        onClick={openModal}
      />
      <div className="p-4">
        <h2 className="font-bold text-lg text-black">{listing.title}</h2>
        <p className="text-gray-600">{listing.location}</p>
        <p className="mt-2 text-red-500 font-semibold">
          {listing.price}€ / nuit
        </p>
      </div>
      <button
        onClick={toggleFavorite}
        className="absolute bottom-2 right-2 p-1 rounded-full focus:outline-none"
      >
        <FaHeart
          className={`h-6 w-6 ${
            isFavorite ? "text-pink-500" : "text-black"
          }`}
        />
      </button>
      {selectedListing && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          image={selectedListing.image}
          id={selectedListing.id}
          title={selectedListing.title}
          location={selectedListing.location}
          price={selectedListing.price}
        />
      )}
    </div>
  );
}
