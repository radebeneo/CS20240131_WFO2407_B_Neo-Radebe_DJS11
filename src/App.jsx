import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GenreFilter from './GenreFilter';

function App() {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShows() {
      try {
        const response = await fetch('https://podcast-api.netlify.app');
        const data = await response.json();
        setShows(data);
        setFilteredShows(data);
      } catch (error) {
        console.error('Error fetching shows:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchShows();
  }, []);

  const handleFilterChange = (genre) => {
    if (genre === 'all') {
      setFilteredShows(shows);
    } else {
      setFilteredShows(shows.filter((show) => show.genreIds.includes(parseInt(genre, 10))));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Podcast Shows</h1>
        <Link to="/favorites" className="text-blue-500 hover:underline">Favorites</Link>
      </div>
      <GenreFilter onFilterChange={handleFilterChange} />
      <ul>
        {filteredShows.map((show) => (
          <li key={show.id} className="mb-2">
            <Link to={`/show/${show.id}`} className="text-xl font-semibold text-blue-500 hover:underline">
              {show.title}
            </Link>
            <p>{show.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Pagination logic.
const [currentPage, setCurrentPage] = useState(1);

const loadMore = () => {
  setCurrentPage((prev) => prev + 1);
  // Fetch additional data or display more items from the list
};

export default App;


