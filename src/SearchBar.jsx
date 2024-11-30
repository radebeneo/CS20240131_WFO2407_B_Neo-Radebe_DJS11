import React from 'react';

function SearchBar({ onSearch }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search for shows..."
        className="border p-2 rounded w-full"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;