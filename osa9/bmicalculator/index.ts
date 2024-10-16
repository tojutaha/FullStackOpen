import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateBmi(height, weight);
  res.json({
    height,
    weight,
    bmi: result
  });
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
