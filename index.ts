import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import  SensorController  from './src/v1/controllers/sensor.controller';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/api/v1/sensor',  SensorController.CollectSensorData)
app.get('/api/v1/data',  SensorController.GetAllSensorData)

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

process.on('SIGTERM', () => {
    console.debug('SIGTERM signal received: closing HTTP server')
    server.close(() => {
      console.debug('HTTP server closed')
    })
  })