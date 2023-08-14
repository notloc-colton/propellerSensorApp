import SensorDatabase from "./sensor.database";
import { AirQualityData } from "../interfaces/airQualityData.interface";

describe("SensorDatabase", () => {
  beforeEach(() => {
    SensorDatabase.dataMap.clear();
  });

  it("should add air quality data correctly", () => {
    const mockData: AirQualityData = {
      carbonMonoxide: 10,
      groundLevelOzone: 0.5,
      nitrogenDioxide: 30,
      sulfurDioxide: 5,
      sensorId: "sensor123",
      timestamp: new Date(),
    };

    SensorDatabase.addAirQualityData(mockData);

    const storedData = SensorDatabase.dataMap.get(mockData.sensorId);
    expect(storedData).toHaveLength(1);
    expect(storedData![0]).toEqual(mockData);
  });

  it("should get air quality data by sensorId correctly", () => {
    const mockData: AirQualityData = {
      carbonMonoxide: 10,
      groundLevelOzone: 0.5,
      nitrogenDioxide: 30,
      sulfurDioxide: 5,
      sensorId: "sensor123",
      timestamp: new Date(),
    };

    SensorDatabase.addAirQualityData(mockData);

    const retrievedData = SensorDatabase.getAirQualityDataBySensorId(
      mockData.sensorId,
    );
    expect(retrievedData).toHaveLength(1);
    expect(retrievedData[0]).toEqual(mockData);
  });

  it("should return empty array for nonexistent sensorId", () => {
    const retrievedData =
      SensorDatabase.getAirQualityDataBySensorId("imNotReal");
    expect(retrievedData).toHaveLength(0);
  });

  it("should get all air quality data correctly", () => {
    const mockData1: AirQualityData = {
      carbonMonoxide: 10,
      groundLevelOzone: 0.5,
      nitrogenDioxide: 30,
      sulfurDioxide: 5,
      sensorId: "sensor123",
      timestamp: new Date(),
    };
    const mockData2: AirQualityData = {
      carbonMonoxide: 15,
      groundLevelOzone: 0.3,
      nitrogenDioxide: 40,
      sulfurDioxide: 8,
      sensorId: "sensor456",
      timestamp: new Date(),
    };

    SensorDatabase.addAirQualityData(mockData1);
    SensorDatabase.addAirQualityData(mockData2);

    const allData = SensorDatabase.getAirQualityData();
    expect(allData).toHaveLength(2);
    expect(allData).toContainEqual(mockData1);
    expect(allData).toContainEqual(mockData2);
  });

  it("should return empty array when no data exists", () => {
    const allData = SensorDatabase.getAirQualityData();
    expect(allData).toHaveLength(0);
  });
});
