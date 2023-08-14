import { Request, Response } from "express";
import SensorController from "./sensor.controller";
import SensorService from "../services/sensor.service";
import {
  AirQualityData,
  AirQualitySummaryReport,
} from "../interfaces/airQualityData.interface";

jest.mock("../services/sensor.service");

describe("SensorController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should collect sensor data successfully", () => {
    const mockData: AirQualityData = {
      carbonMonoxide: 10,
      groundLevelOzone: 0.5,
      nitrogenDioxide: 30,
      sulfurDioxide: 5,
      sensorId: "sensor123",
      timestamp: new Date(),
    };

    mockRequest.body = mockData;

    SensorController.CollectSensorData(
      mockRequest as Request,
      mockResponse as Response,
    );

    expect(SensorService.ProcessSensorData).toHaveBeenCalledWith(mockData);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: "success" });
  });

  it("should handle errors while collecting sensor data", () => {
    const mockError = new Error("Test error");

    jest.spyOn(SensorService, "ProcessSensorData").mockImplementation(() => {
      throw mockError;
    });

    SensorController.CollectSensorData(
      mockRequest as Request,
      mockResponse as Response,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
  });

  it("should get pollutant summary report successfully", async () => {
    const mockSummaryData: AirQualitySummaryReport = {
      carbonMonoxide: {
        average: 10,
        maximum: { value: 20, timestamp: new Date() },
        minimum: { value: 5, timestamp: new Date() },
      },
      groundLevelOzone: {
        average: 10,
        maximum: { value: 20, timestamp: new Date() },
        minimum: { value: 5, timestamp: new Date() },
      },
      nitrogenDioxide: {
        average: 10,
        maximum: { value: 20, timestamp: new Date() },
        minimum: { value: 5, timestamp: new Date() },
      },
      sulfurDioxide: {
        average: 10,
        maximum: { value: 20, timestamp: new Date() },
        minimum: { value: 5, timestamp: new Date() },
      },
    };

    const mockQuery = { sensorId: "sensor123" };
    mockRequest.query = mockQuery;

    jest
      .spyOn(SensorService, "GetAirQualitySummary")
      .mockReturnValue(mockSummaryData);

    await SensorController.GetPollutantSummaryReport(
      mockRequest as Request,
      mockResponse as Response,
    );

    expect(SensorService.GetAirQualitySummary).toHaveBeenCalledWith(
      mockQuery.sensorId,
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      summary: mockSummaryData,
    });
  });

  it("should handle empty summary data", async () => {
    mockRequest.query = {};

    jest.spyOn(SensorService, "GetAirQualitySummary").mockReturnValue(null);

    await SensorController.GetPollutantSummaryReport(
      mockRequest as Request,
      mockResponse as Response,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(204);
    expect(mockResponse.json).toHaveBeenCalledWith({});
  });

  it("should handle errors while getting pollutant summary report", async () => {
    const mockError = new Error("Test error");
    mockRequest.query = {};

    jest.spyOn(SensorService, "GetAirQualitySummary").mockImplementation(() => {
      throw mockError;
    });

    await SensorController.GetPollutantSummaryReport(
      mockRequest as Request,
      mockResponse as Response,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: mockError });
  });
});
