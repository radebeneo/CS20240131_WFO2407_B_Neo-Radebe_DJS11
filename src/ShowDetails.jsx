import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AudioPlayer from './AudioPlayer';

function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentEpisode, setCurrentEpisode] = useState(null);

  useEffect(() => {
    async function fetchShowDetails() {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        const data = await response.json();
        setShow(data);
      } catch (error) {
        console.error('Error fetching show details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchShowDetails();
  }, [id]);

  const playEpisode = (episode) => {
    setCurrentEpisode(episode.file);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!show) {
    return <div>Show not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 hover:underline">Back to Shows</Link>
      <h1 className="text-3xl font-bold mt-4">{show.title}</h1>
      <p>{show.description}</p>
      <h2 className="text-2xl font-semibold mt-4">Seasons</h2>
      <ul>
        {show.seasons.map((season, index) => (
          <li key={index} className="mb-2">
            <h3 className="text-xl font-medium">{season.title}</h3>
            <ul className="pl-4">
              {season.episodes.map((episode, idx) => (
                <li key={idx} className="mb-1 flex justify-between">
                  <span>{episode.title}</span>
                  <button
                    onClick={() => playEpisode(episode)}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Play
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {currentEpisode && <AudioPlayer src={currentEpisode} />}
    </div>
  );
}

export default ShowDetails;
