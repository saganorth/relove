import express from 'express';
import { loadData, saveData } from '../dataHandler.mjs';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newOrder = req.body;
        

        const requiredFields = ['product', 'type', 'yarnType', 'color', 'measurements', 'comment', 'contactInfo'];
        const missingFields = requiredFields.filter(field => !newOrder[field] || (Array.isArray(newOrder[field]) && newOrder[field].length === 0));

        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` });
        }

        // Generate a unique ID for the order
        newOrder.id = uuidv4();

        // Load existing data
        const data = await loadData();

        // Ensure `orders` and `inventory` exist in data
        if (!data.orders) data.orders = [];
        if (!data.inventory) data.inventory = [];

        // Append the new order without overwriting previous orders
        data.orders.push(newOrder);

        // Save updated data
        await saveData(data);

        res.json({ message: 'Order saved successfully!', order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});




router.get('/:id', async (req, res) => {
    try {
        const data = await loadData();
        const order = data.orders.find(order => order.id === req.params.id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

export default router;