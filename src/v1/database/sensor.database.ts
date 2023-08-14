import { AirQualityData } from "../interfaces/airQualityData.interface";

class SensorDatabase {
  dataMap = new Map<string, AirQualityData[]>();
  public addAirQualityData(data: AirQualityData) {
    console.log("inside DB");
    console.log(data);
    const existing = this.dataMap.get(data.sensorId);
    if (existing != undefined) {
      const appendedArray: AirQualityData[] = [...existing, data];
      this.dataMap.set(data.sensorId, appendedArray);
    } else {
      this.dataMap.set(data.sensorId, [data]);
    }
  }
  public getAirQualityDataBySensorId(sensorId: string): AirQualityData[] {
    const found = this.dataMap.get(sensorId);
    if (found != undefined) {
      return found;
    }
    return [];
  }
  public getAirQualityData(): AirQualityData[] {
    const response: AirQualityData[] = [];
    this.dataMap.forEach((value) => {
      response.push(...value);
    });
    return response;
  }
}
export default new SensorDatabase();
