import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true
}));
app.use(express.json());

// Mock data (will be replaced with Riot Games API later)
const mockPlayerData = {
  'testuser': {
    summonerName: 'TestUser',
    level: 50,
    rankTier: 'Gold IV'
  }
};

// Player lookup route
app.get('/api/player/:username', (req: any, res: any) => {
  const username = req.params.username.toLowerCase();
  
  // Simulate API lookup
  const playerData = mockPlayerData[username as keyof typeof mockPlayerData];

  if (playerData) {
    return res.json(playerData);
  }

  res.status(404).json({ message: 'Player not found' });
});

// Health check route
app.get('/api/health', (req: any, res: any) => {
  res.status(200).json({ status: 'healthy' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;