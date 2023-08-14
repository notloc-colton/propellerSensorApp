import SensorService from "./sensor.service"; // Update the path accordingly
import SensorDatabase from "../database/sensor.database"; // Update the path accordingly
import { AirQualityData } from "../interfaces/airQualityData.interface";

jest.mock("../database/sensor.database");
jest.mock("./airQualitySummary");

describe("SensorService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should process sensor data correctly", () => {
    const mockData: AirQualityData = {
      carbonMonoxide: 10,
      groundLevelOzone: 0.5,
      nitrogenDioxide: 30,
      sulfurDioxide: 5,
      sensorId: "sensor123",
      timestamp: new Date(),
    };

    SensorService.ProcessSensorData(mockData);

    expect(SensorDatabase.addAirQualityData).toHaveBeenCalledWith(mockData);
  });
});
