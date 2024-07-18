import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routers/index';
import sequelize from './utils/connections';
dotenv.config();

const PORT = process.env.PORT || 5050;
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);

// Error handling middleware
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log('Database connection established');
    })
    .catch((error) => console.log('Unable to connect to the database:', error));
});
