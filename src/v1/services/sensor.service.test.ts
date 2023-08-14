import { AirQualitySummaryReport } from '../interfaces/airQualityData.interface';
import  SensorService  from './sensor.service'; // Update the path accordingly

jest.mock('./../database/sensor.database', () => ({
  addAirQualityData: jest.fn(),
  getAirQualityDataBySensorId: jest.fn(),
  getAirQualityData: jest.fn(),
}));

describe('SensorService', () => {
  let sensorService = SensorService;

  it('should process sensor data correctly', () => {
    const mockData = {
      carbonMonoxide: 10,
      groundLevelOzone: 0.5,
      nitrogenDioxide: 30,
      sulfurDioxide: 5,
      sensorId: 'sensor123',
      timestamp: new Date(),
    };

    sensorService.ProcessSensorData(mockData);

    expect(sensorService['db'].addAirQualityData).toHaveBeenCalledWith(mockData);
  });

  it('should get air quality summary without sensorId', () => {
    const mockRawData = [
      {
        carbonMonoxide: 10,
        groundLevelOzone: 0.5,
        nitrogenDioxide: 30,
        sulfurDioxide: 5,
        sensorId: 'sensor123',
        timestamp: new Date(),
      },
      {
        carbonMonoxide: 20,
        groundLevelOzone: 0.3,
        nitrogenDioxide: 10,
        sulfurDioxide: 10,
        sensorId: 'sensor555',
        timestamp: new Date(),
      },
    ];
    
    // sensorService['db'].getAirQualityData.mockReturnValue([mockRawData]);
    // sensorService.ProcessSensorData({
    //     carbonMonoxide: 10,
    //     groundLevelOzone: 0.5,
    //     nitrogenDioxide: 30,
    //     sulfurDioxide: 5,
    //     sensorId: 'sensor123',
    //     timestamp: new Date(),
    //   })
    //   sensorService.ProcessSensorData({
    //     carbonMonoxide: 20,
    //     groundLevelOzone: 0.3,
    //     nitrogenDioxide: 10,
    //     sulfurDioxide: 10,
    //     sensorId: 'sensor555',
    //     timestamp: new Date(),
    //   })

    // const result = sensorService.GetAirQualitySummary(null);

    // expect(result.carbonMonoxide.average).toBe(15)
    // expect(result.carbonMonoxide.maximum.value).toBe(20)
    // expect(result.carbonMonoxide.maximum.timestamp).toBeDefined()
    // expect(result.carbonMonoxide.minimum.value).toBe(10)
    // expect(result.carbonMonoxide.minimum.timestamp).toBeDefined()
    // expect(sensorService['db'].getAirQualityData).toHaveBeenCalledTimes(1);
    // expect(sensorService['db'].getAirQualityDataBySensorId).toHaveBeenCalledTimes(0);

    
  });

//   it('should get air quality summary with sensorId', () => {
//     const mockSensorId = 'sensor123';
//     const mockRawData = [
//       {
//         carbonMonoxide: 10,
//         groundLevelOzone: 0.5,
//         nitrogenDioxide: 30,
//         sulfurDioxide: 5,
//         sensorId: 'sensor123',
//         timestamp: new Date(),
//       },
      
//     ];

//     sensorService['db'].getAirQualityDataBySensorId.mockReturnValue(mockRawData);

//     const result = sensorService.GetAirQualitySummary(mockSensorId);
//     expect(sensorService['db'].getAirQualityData).toHaveBeenCalledTimes(0);
//     expect(sensorService['db'].getAirQualityDataBySensorId).toHaveBeenCalledTimes(1);

    
//   });
});
