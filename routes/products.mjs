import express from 'express';
const router = express.Router();
import { loadData } from '../dataHandler.mjs'; // Ensure this path accurately points to your dataHandler file

// Route to get all products
router.get('/', async (req, res) => {
    try {
      const data = await loadData(); 
      res.json(data);
    } catch (error) {
      console.error('Error loading data:', error);
      res.status(500).send('Server error occurred while fetching data');
    }
});


router.get('/:category', async (req, res) => {
    try {
      const { category } = req.params;
      const data = await loadData();
      const categoryData = data[category];
      if (categoryData) {
        res.json(categoryData);
      } else {
        res.status(404).send('Category not found');
      }
    } catch (error) {
      console.error('Error loading category data:', error);
      res.status(500).send('Server error occurred while fetching category data');
    }
});

// Route to get a specific product by ID within a category
router.get('/:category/:id', async (req, res) => {
    try {
      const { category, id } = req.params;
      const data = await loadData();
      const categoryData = data[category];
      if (categoryData) {
        const product = categoryData.find(product => product.id === parseInt(id, 10));
        if (product) {
          res.json(product);
        } else {
          res.status(404).send('Product not found');
        }
      } else {
        res.status(404).send('Category not found');
      }
    } catch (error) {
      console.error('Error loading product data:', error);
      res.status(500).send('Server error occurred while fetching product data');
    }
});

export default router;
