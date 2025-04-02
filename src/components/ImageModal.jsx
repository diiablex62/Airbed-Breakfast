import React from "react";

function ImageModal({ isOpen, onClose, image, id, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          X
        </button>
        <img
          src={image}
          alt={`Large view of ${title}`}
          className="w-full object-contain"
        />
        <h1 className="mt-2 text-center text-xl font-bold">{title}</h1>
        <p className="mt-2 text-center">ID: {id}</p>
      </div>
    </div>
  );
}

export default ImageModal;
