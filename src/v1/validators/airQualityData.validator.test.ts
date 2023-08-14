import express, { Request, Response, NextFunction } from "express";
import * as validators from "./airQualityData.validator";
import _ from "lodash";
import { AirQualityData } from "../interfaces/airQualityData.interface";

describe("validateAirQualityData", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it("should pass validation with valid data", async () => {
    const validData: AirQualityData = {
      carbonMonoxide: 10,
      groundLevelOzone: 0.5,
      nitrogenDioxide: 30,
      sulfurDioxide: 5,
      sensorId: "sensor123",
      timestamp: new Date(),
    };

    mockRequest.body = validData;

    await validators.validateAirQualityData(
      mockRequest as Request,
      mockResponse as Response,
      mockNext,
    );

    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it("should return 400 with errors for invalid data", async () => {
    const invalidData: AirQualityData = {
      carbonMonoxide: 60,
      groundLevelOzone: 0.7,
      nitrogenDioxide: 2500,
      sulfurDioxide: 1100,
      sensorId: "",
      timestamp: new Date("notADate"),
    };

    mockRequest.body = invalidData;

    await validators.validateAirQualityData(
      mockRequest as Request,
      mockResponse as Response,
      mockNext,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errors: [
        "carbonMonoxide field must be between 0 and 50.4",
        "groundLevelOzone field must be between 0 and 0.604",
        "nitrogenDioxide field must be between 0 and 2049",
        "sulfurDioxide field must be between 0 and 1004",
        "invalid timestamp",
        "invalid sensorId",
      ],
    });
  });
});
