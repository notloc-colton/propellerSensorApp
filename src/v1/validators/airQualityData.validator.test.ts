
import { validateDataPoint, validateAirQualityData } from './airQualityData.validator'
import express, { Express, Request, Response } from 'express'
import request from 'supertest';


describe('validateAirQualityData', () => {
    let app: express.Application;
  
    beforeEach(() => {
      app = express();
    });
  
    it('should respond with 400 and errors if validation fails', async () => {
      const invalidData = {
        carbonMonoxide: 60,
        groundLevelOzone: 0.7,
        nitrogenDioxide: 2500,
        sulfurDioxide: 1100,
      };
  
      app.use(express.json());
      app.use(validateAirQualityData);
  
      const response = await request(app).post('/').send(invalidData);
  
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        errors: [
          'carbonMonoxide field must be between 0 and 50.4',
          'groundLevelOzone field must be between 0 and 0.604',
          'nitrogenDioxide field must be between 0 and 2049',
          'sulfurDioxide field must be between 0 and 1004',
        ],
      });
    });
  
    it('should call the next middleware if validation passes', async () => {
      const validData = {
        carbonMonoxide: 25,
        groundLevelOzone: 0.3,
        nitrogenDioxide: 1000,
        sulfurDioxide: 500,
      };
  
      app.use(express.json());
      app.use(validateAirQualityData);
      app.use((_req: Request, res: Response) => {
        res.status(200).send('Validated successfully');
      });
  
      const response = await request(app).post('/').send(validData);
  
      expect(response.status).toBe(200);
      expect(response.text).toBe('Validated successfully');
    });
  });

describe('validateDataPoint', () => {
  it('should return an error if field is null', () => {
    const result = validateDataPoint('TestField', null, 10, 0);
    expect(result).toEqual(Error('TestField field cannot be null'));
  });

  it('should return an error if field is below the min value', () => {
    const result = validateDataPoint('TestField', -5, 10, 0);
    expect(result).toEqual(Error('TestField field must be between 0 and 10'));
  });

  it('should return an error if field is above the max value', () => {
    const result = validateDataPoint('TestField', 15, 10, 0);
    expect(result).toEqual(Error('TestField field must be between 0 and 10'));
  });

  it('should return null if field is within the valid range', () => {
    const result = validateDataPoint('TestField', 5, 10, 0);
    expect(result).toBeNull();
  });
});
