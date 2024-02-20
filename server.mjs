import express from 'express';
import cors from 'cors';
import besokareRouter from './routes/besokare.mjs';
import massInfoRouter from './routes/massInfo.mjs';
import omradenRouter from './routes/omraden.mjs';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/api/besokare', besokareRouter);
app.use('/api/massInfo', massInfoRouter);
app.use('/api/omraden', omradenRouter);

app.listen(port, () => {
  console.log(`Server körs på port ${port}`);
});
