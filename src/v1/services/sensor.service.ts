import SensorDatabase  from "../database/sensor.database";
import { AirQualityData, AirQualitySummaryReport } from "../interfaces/airQualityData.interface";
import { AirQualitySummary} from "./airQualitySummary";
class SensorService {
    private db = SensorDatabase

        public ProcessSensorData(data: AirQualityData){
            this.db.addAirQualityData(data)
        }
        public GetAirQualitySummary(sensorId: string | undefined): AirQualitySummaryReport{
            let rawData: AirQualityData[]
            if (sensorId != null) {
                rawData = this.db.getAirQualityDataBySensorId(sensorId)
            } else {
                rawData = this.db.getAirQualityData()
            }
            const dataSummary = new AirQualitySummary()
            rawData.forEach((data) => {
                dataSummary.addDataPoint(data)
            })
            return dataSummary.calculateAirQualitySummaryReport()
        }
        public GetAirQualityData(): AirQualityData[]{
            return this.db.getAirQualityData()
        }
}
export default new SensorService()