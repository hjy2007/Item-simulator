import express from 'express';
import simulateRouter from './routes/simulate.router';
import errorHandlerMiddleware from './middlewares/error-handler.middleware';

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', [router, simulateRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});

app.use(errorHandlerMiddleware);
