import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

interface PlayerSearchProps {
  username: string;
}

interface PlayerData {
  summonerName: string;
  level: number;
  rankTier: string;
}

const PlayerSearch: React.FC = () => {
  const [username, setUsername] = useState('');
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      setError(null);
      const response = await axios.get(`http://localhost:5000/api/player/${username}`);
      setPlayerData(response.data);
    } catch (err) {
      setError('Failed to fetch player data');
      console.error(err);
    }
  };

  return (
    <div className="player-search-container">
      <h1>LOL Player Stats Tracker</h1>
      <div className="search-input-container">
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Summoner Name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {playerData && (
        <div className="player-data">
          <h2>{playerData.summonerName}</h2>
          <p>Level: {playerData.level}</p>
          <p>Rank: {playerData.rankTier}</p>
        </div>
      )}
    </div>
  );
};

export default PlayerSearch;