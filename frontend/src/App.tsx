import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

export type PlayerData = {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

const PlayerSearch: React.FC = () => {
  const [name, setName] = useState('');
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tagline, setTagline] = useState('');

  const handleSearch = async () => {
    try {
      setError(null);
      const response = await axios.get(`http://localhost:5000/api/player/${name}/${tagline}`);
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Summoner Name"
        />
        <input 
          type="text" 
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="Enter Tagline"
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
          <h2>{playerData.id}</h2>
          <p>Level: {playerData.summonerLevel}</p>
        </div>
      )}
    </div>
  );
};

export default PlayerSearch;