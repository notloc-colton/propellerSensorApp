import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import sensorRoutes, { SensorRouter } from './src/v1/routes/sensor.routes';
import Server from './server';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const server2 = new Server(app)
app.use('/api', sensorRoutes)
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.post('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

process.on('SIGTERM', () => {
    console.debug('SIGTERM signal received: closing HTTP server')
    server.close(() => {
      console.debug('HTTP server closed')
    })
  })