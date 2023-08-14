// import express, { Application, Router } from "express";
// // import { SensorController } from "./src/v1/controllers/sensor.controller";
// import { SensorService } from "./src/v1/services/sensor.service";
// import { SensorDatabase } from "./src/v1/database/sensor.database";
// import { SensorRoutes } from "./src/v1/routes/sensor.routes";
// import * as validators from './src/v1/validators/airQualityData.validator';

// export default class Server {
//     sensorController: SensorController
//     sensorRoutes: SensorRoutes
//     constructor(app: Application) {
//         this.sensorController = new SensorController(new SensorService(new SensorDatabase()))
//         this.sensorRoutes = new SensorRoutes()
//         this.config(app);
//         this.attachRoutes(app)
//     }

//   private config(app: Application): void {
//     app.use(express.json());
//     app.use(express.urlencoded({ extended: true }));
//   }
//   public attachRoutes(app: Application){
//     console.log("logging sensorController in Server",this.sensorController)
//     // this.sensorRoutes.initializeRoutes(this.sensorController)
//     app.post('/api/v1/sensor',  validators.validateAirQualityData, this.sensorController.CollectSensorData)
//     app.get('/api/v1/data',  this.sensorController.GetAllSensorData)
//   }
// }