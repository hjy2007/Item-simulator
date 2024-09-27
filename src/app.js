import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', []);

app.use(cookieParser());

app.use(ErrorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(PORT, '포트 Test');
});
