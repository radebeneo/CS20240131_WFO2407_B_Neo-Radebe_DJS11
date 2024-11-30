import React from 'react';

const genres = [
  { id: 'all', title: 'All' },
  { id: 1, title: 'Personal Growth' },
  { id: 2, title: 'Investigative Journalism' },
  { id: 3, title: 'History' },
  { id: 4, title: 'Comedy' },
  { id: 5, title: 'Entertainment' },
  { id: 6, title: 'Business' },
  { id: 7, title: 'Fiction' },
  { id: 8, title: 'News' },
  { id: 9, title: 'Kids and Family' },
];

function GenreFilter({ onFilterChange }) {
  return (
    <div className="mb-4">
      <label htmlFor="genre" className="block text-lg font-medium mb-2">Filter by Genre:</label>
      <select
        id="genre"
        className="border rounded p-2"
        onChange={(e) => onFilterChange(e.target.value)}
      >
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>{genre.title}</option>
        ))}

      </select>
    </div>
  );
}

export default GenreFilter;