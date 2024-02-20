import express from 'express';
import { loadData } from '../dataHandler.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await loadData(); 
    res.json(data.mossor);
  } catch (error) {
    console.error('Error loading omarden:', error);
    res.status(500).send('Serverfel vid hämtning av mössor');
  }
});

export default router;
