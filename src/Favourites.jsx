// Favorites.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [sortOption, setSortOption] = useState('title-asc');

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFavorite = (index) => {
    const updatedFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleSort = (option) => {
    let sortedFavorites;
    if (option === 'title-asc') {
      sortedFavorites = [...favorites].sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === 'title-desc') {
      sortedFavorites = [...favorites].sort((a, b) => b.title.localeCompare(a.title));
    } else if (option === 'date-recent') {
      sortedFavorites = [...favorites].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    } else if (option === 'date-oldest') {
      sortedFavorites = [...favorites].sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    }
    setFavorites(sortedFavorites);
  };

  const handleProgressSave = (index, progress) => {
    const updatedFavorites = [...favorites];
    updatedFavorites[index].progress = progress;
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    handleSort(sortOption);
  }, [sortOption]);

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 hover:underline">Back to Shows</Link>
      <h1 className="text-3xl font-bold mt-4">Favorite Episodes</h1>
      <div className="my-4">
        <label htmlFor="sort" className="block text-lg font-medium mb-2">Sort by:</label>
        <select
          id="sort"
          className="border rounded p-2"
          onChange={(e) => setSortOption(e.target.value)}
          value={sortOption}
        >
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
          <option value="date-recent">Date Added (Most Recent)</option>
          <option value="date-oldest">Date Added (Oldest)</option>
        </select>
      </div>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <ul>
          {favorites.map((fav, index) => (
            <li key={index} className="mb-4 p-4 border rounded shadow">
              <div>
                <h2 className="text-xl font-medium">{fav.title}</h2>
                <p className="text-sm">From: {fav.showTitle}</p>
                <p className="text-sm">Progress: {fav.progress || 'Not started'}</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => handleRemoveFavorite(index)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
                <button
                  onClick={() => handleProgressSave(index, '50%')}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Mark Progress (50%)
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorites;
