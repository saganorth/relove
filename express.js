import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

// Get the directory name for the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize the Express application
const app = express();

// CORS setup for specific allowed origins with detailed configuration
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// Serving static files
app.use('/public', express.static('public'));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
console.log(`Serving static files from ${path.join(__dirname, 'public')}`);

// Routes
app.get('/api/products', (req, res) => {
    res.json({ msg: 'This is CORS-enabled for all origins!' });
});

app.get('/products/:id', async (req, res) => {
  try {
      // Assuming Product.findById is a valid method from your model
      const product = await Product.findById(req.params.id);
      res.json(product);
  } catch (error) {
      console.error("Error retrieving product details", error);
      res.status(500).send("Error retrieving product details");
  }
});

// Listen on the configured port
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
