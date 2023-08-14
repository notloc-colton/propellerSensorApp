import express, { Express, Request, Response } from 'express';
import { AirQualityData } from "../models/airQualityData.model";
import { SensorService } from "../services/sensor.service";

export function TestFunc1(){}
export class SensorController {
    private service: SensorService

    constructor(service: SensorService){
        this.service = service
    }
    public CollectSensorData(req:Request, res:Response): Error | null {
        try{
            const body: AirQualityData = req.body
            console.log(body)
            res.json({message: "success",...body})
        } catch(err) {
            
        }
        return null
    }
}