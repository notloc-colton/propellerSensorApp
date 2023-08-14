import express, { Express, Request, Response } from "express";
import { AirQualityData } from "../interfaces/airQualityData.interface";
import SensorService from "../services/sensor.service";
import SensorDatabase from "../database/sensor.database";

class SensorController {
  public CollectSensorData(req: Request, res: Response) {
    try {
      const body: AirQualityData = req.body;
      body.timestamp = new Date(body.timestamp);
      SensorService.ProcessSensorData(body);
      res.status(200).json({ message: "success" });
      return;
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
      return;
    }
  }
  public async GetAllSensorData(req: Request, res: Response) {
    try {
      const data = SensorService.GetAirQualityData();
      res.status(200).json({ data });
      return;
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
    return null;
  }
  public async GetPollutantSummaryReport(req: Request, res: Response) {
    const sensorId = req.query.sensorId?.toString();
    try {
      const data = SensorService.GetAirQualitySummary(sensorId);
      if (data == null) {
        res.status(204).json({});
        return;
      }
      res.status(200).json({ summary: data });
      return;
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
    return null;
  }
}
export default new SensorController();
