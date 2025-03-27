import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { SummonerDTO, AccountDTO } from './models';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const RIOT_GAMES_PLATFORM_API = 'https://euw1.api.riotgames.com';
const RIOT_GAMES_REGIONAL_API = 'https://europe.api.riotgames.com';

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

app.get('/api/player/:name/:tagline', async (req: any, res: any) => {
  try {
    const name = req.params.name.toLowerCase();
    const tagline = req.params.tagline.toLowerCase();

    const accountResponse: any = await axios.get(`${RIOT_GAMES_REGIONAL_API}/riot/account/v1/accounts/by-riot-id/${name}/${tagline}`, {
      headers: {
        'X-Riot-Token': process.env.RIOT_GAMES_API_KEY
      }
    });
    
    const accountData: AccountDTO = accountResponse.data;
    const playerResponse: any = await axios.get(`${RIOT_GAMES_PLATFORM_API}/lol/summoner/v4/summoners/by-puuid/${accountData.puuid}`, {
      headers: {
        'X-Riot-Token': process.env.RIOT_GAMES_API_KEY
      }
    });

    const playerData: SummonerDTO = playerResponse.data;
    res.json(playerData);
  } catch (err: any) {
    console.error(err);
    res.status(404).json({ message: 'Player not found' });
  }
});

app.get('/api/health', (req: any, res: any) => {
  res.status(200).json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;