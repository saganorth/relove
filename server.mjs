import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

import balaklavaRouter from './routes/balaklava.mjs';
import filtRouter from './routes/filtar.mjs';
import mossorRouter from './routes/mossor.mjs';
import vaskorRouter from './routes/vaskor.mjs';
import productsRouter from './routes/products.mjs'; 
import ordersRouter from './routes/orders.mjs'; 


const app = express();
const dirname = path.dirname(fileURLToPath(new URL(import.meta.url)));


app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/public', express.static('public'));
app.use('/img', express.static(path.join(dirname, 'public/img')));
console.log(`Serving static files from ${path.join(dirname, 'public/img')}`);

// API routes

app.use('/api/products/balaklava', balaklavaRouter);
app.use('/api/products/filtar', filtRouter);
app.use('/api/products', productsRouter);
app.use('/api/products/mossor', mossorRouter); 
app.use('/api/products/vaskor', vaskorRouter);
app.use('/api/orders', ordersRouter);
// Catch 404 and forward to error handler for API
app.use('/api', (req, res, next) => {
  res.status(404).json({ error: "API endpoint not found" });
});
app.use('/img', express.static(path.join(dirname, 'public/img')));

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).json({ error: 'Internal Server Error' });
});

// Set the port and start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
