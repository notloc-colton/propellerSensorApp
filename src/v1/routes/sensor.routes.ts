import express, { Express, Request, Response, Application } from 'express';
// import { SensorController } from '../controllers/sensor.controller';
// import { SensorService } from '../services/sensor.service';
// import { SensorDatabase } from '../database/sensor.database';
import * as validators from '../validators/airQualityData.validator';

export const SensorRouter = express.Router()

export class SensorRoutes {
    router = express.Router()
    // controller = new SensorController(new SensorService(new SensorDatabase()))

    constructor(){
        // this.initializeRoutes()
    }
    initializeRoutes(){
        // const controller = new SensorController(new SensorService(new SensorDatabase()))
        // console.log('init routes controller', controller)
        // this.router.post('/v1/sensor',  validators.validateAirQualityData, controller.CollectSensorData)
        // this.router.get('/v1/data',  controller.GetAllSensorData)
    }
}

export default new SensorRoutes().router