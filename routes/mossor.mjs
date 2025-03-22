import express from 'express';
import { loadData } from '../dataHandler.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.log('Fetching data for mössor...');
    const data = await loadData();
    console.log('Data fetched:', data);
    res.json(data.mossor);
  } catch (error) {
    console.error('Error loading mössor:', error);
    res.status(500).send('Server error when fetching mössor');
  }
});


export default router;
