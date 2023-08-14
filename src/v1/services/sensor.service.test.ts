import SensorService from './sensor.service'; // Update the path accordingly
import SensorDatabase from '../database/sensor.database'; // Update the path accordingly
import { AirQualityData, AirQualitySummaryReport } from '../interfaces/airQualityData.interface';
import { AirQualitySummary } from './airQualitySummary';

// Mocking the dependencies
jest.mock('../database/sensor.database');
jest.mock('./airQualitySummary');

describe('SensorService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should process sensor data correctly', () => {
    const mockData: AirQualityData = {
      carbonMonoxide: 10,
      groundLevelOzone: 0.5,
      nitrogenDioxide: 30,
      sulfurDioxide: 5,
      sensorId: 'sensor123',
      timestamp: new Date(),
    };

    SensorService.ProcessSensorData(mockData);

    expect(SensorDatabase.addAirQualityData).toHaveBeenCalledWith(mockData);
  });

//   it('should get air quality summary successfully with sensorId', () => {
//     const mockSensorId = 'sensor123';
//     const mockRawData: AirQualityData[] = [
//       {
//         carbonMonoxide: 10,
//         groundLevelOzone: 0.5,
//         nitrogenDioxide: 30,
//         sulfurDioxide: 5,
//         sensorId: 'sensor123',
//         timestamp: new Date(),
//       },
//       // Add more mock data if needed
//     ];
//     SensorDatabase.getAirQualityDataBySensorId.mockReturnValue(mockRawData);

//     const mockSummaryReport: AirQualitySummaryReport = {
//       carbonMonoxide: {
//         average: 10,
//         maximum: { value: 20, timestamp: new Date() },
//         minimum: { value: 5, timestamp: new Date() },
//       },
//       // Add more mock data if needed
//     };

//     (AirQualitySummary.prototype.calculateAirQualitySummaryReport as jest.Mock).mockReturnValue(mockSummaryReport);

//     const result = SensorService.GetAirQualitySummary(mockSensorId);

//     expect(SensorDatabase.getAirQualityDataBySensorId).toHaveBeenCalledWith(mockSensorId);
//     expect(AirQualitySummary.prototype.addDataPoint).toHaveBeenCalledTimes(mockRawData.length);
//     expect(result).toEqual(mockSummaryReport);
//   });

//   it('should return null for empty summary with sensorId', () => {
//     const mockSensorId = 'sensor123';
//     // SensorDatabase.getAirQualityDataBySensorId.mockReturnValue([]);

//     const result = SensorService.GetAirQualitySummary(mockSensorId);

//     expect(result).toBeNull();
//   });

//   it('should get air quality summary successfully without sensorId', () => {
//     const mockRawData: AirQualityData[] = [
//       {
//         carbonMonoxide: 10,
//         groundLevelOzone: 0.5,
//         nitrogenDioxide: 30,
//         sulfurDioxide: 5,
//         sensorId: 'sensor123',
//         timestamp: new Date(),
//       },
//       // Add more mock data if needed
//     ];
//     SensorDatabase.getAirQualityData.mockReturnValue(mockRawData);

//     const mockSummaryReport: AirQualitySummaryReport = {
//       carbonMonoxide: {
//         average: 10,
//         maximum: { value: 20, timestamp: new Date() },
//         minimum: { value: 5, timestamp: new Date() },
//       },
//       // Add more mock data if needed
//     };

//     (AirQualitySummary.prototype.calculateAirQualitySummaryReport as jest.Mock).mockReturnValue(mockSummaryReport);

//     const result = SensorService.GetAirQualitySummary(undefined);

//     expect(SensorDatabase.getAirQualityData).toHaveBeenCalled();
//     expect(AirQualitySummary.prototype.addDataPoint).toHaveBeenCalledTimes(mockRawData.length);
//     expect(result).toEqual(mockSummaryReport);
//   });

//   it('should return air quality data successfully', () => {
//     const mockRawData: AirQualityData[] = [
//       {
//         carbonMonoxide: 10,
//         groundLevelOzone: 0.5,
//         nitrogenDioxide: 30,
//         sulfurDioxide: 5,
//         sensorId: 'sensor123',
//         timestamp: new Date(),
//       },
//       // Add more mock data if needed
//     ];
//     SensorDatabase.getAirQualityData.mockReturnValue(mockRawData);

//     const result = SensorService.GetAirQualityData();

//     expect(result).toEqual(mockRawData);
//   });
});
