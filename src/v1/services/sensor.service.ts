import SensorDatabase  from "../database/sensor.database";
import { AirQualityData } from "../models/airQualityData.model";

class SensorService {
    private db = SensorDatabase

        constructor() {
        }
        public ProcessSensorData(data: AirQualityData){
            console.log("Inside processSensorData")
            this.db.addAirQualityData(data)
        }
        public GetAirQualitySummaryBySensorId(sensorId: string){
            this.db.getAirQualityDataBySensorId(sensorId)
        }
        public GetAirQualityData(): AirQualityData[]{
            return this.db.getAirQualityData()
        }
}
export default new SensorService()