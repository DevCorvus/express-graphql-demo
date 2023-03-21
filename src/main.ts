import express from 'express';
import morgan from 'morgan';

const PORT = 8000;

const app = express();

app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}!`);
});
