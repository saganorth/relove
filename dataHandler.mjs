import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'reloveyarn.json');

export const loadData = async () => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Failed to load data:', error);
        return { orders: [], inventory: [] }; // ✅ Ensure the structure is correct
    }
};

export const saveData = async (data) => {
  try {
      const existingData = await loadData();

      // ✅ Merge new data with existing data instead of overwriting
      const mergedData = {
          ...existingData,
          orders: [...(existingData.orders || []), ...(data.orders || [])], // Merge orders properly
          inventory: existingData.inventory || [] // ✅ Ensure inventory is not erased
      };

      await fs.writeFile(DATA_FILE, JSON.stringify(mergedData, null, 2), 'utf8');
  } catch (error) {
      console.error('❌ Failed to save data:', error);
      throw new Error('Failed to save data');
  }
};
