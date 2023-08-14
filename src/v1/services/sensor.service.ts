import { SensorDatabase } from "../database/sensor.database";
import { AirQualityData } from "../models/airQualityData.model";

export class SensorService {
    private db: SensorDatabase

        constructor(db: SensorDatabase) {
            this.db = db
        }
        public ProcessSensorData(data: AirQualityData){
            
        }
}