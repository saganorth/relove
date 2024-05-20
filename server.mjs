import express from 'express';
import cors from 'cors';
import balaklavaRouter from './routes/balaklava.mjs';
import filtRouter from './routes/filtar.mjs';
import mossorRouter from './routes/mossor.mjs';
import vaskorRouter from './routes/vaskor.mjs';
import productsRouter from './routes/products.mjs'; 

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());





app.use('/api/balaklava', balaklavaRouter);
app.use('/api/filtar', filtRouter);
app.use('/api/mossor', mossorRouter);
app.use('/api/vaskor', vaskorRouter);
app.use('/api/products', productsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
