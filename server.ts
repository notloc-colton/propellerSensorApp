import express, { Application, Router } from "express";
import { SensorController } from "./src/v1/controllers/sensor.controller";
import { SensorService } from "./src/v1/services/sensor.service";
import { SensorDatabase } from "./src/v1/database/sensor.database";

export default class Server {
    sensorController: SensorController
    constructor(app: Application) {
        this.config(app);
        this.sensorController = new SensorController(new SensorService(new SensorDatabase()))
    }

  private config(app: Application): void {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
  public attachRoutes(){
    
  }
}