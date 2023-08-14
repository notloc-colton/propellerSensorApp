import express, { Express, Request, Response } from 'express';
import { AirQualityData } from "../models/airQualityData.model";
import SensorService  from "../services/sensor.service";
import SensorDatabase  from '../database/sensor.database';

class SensorController {
    // private service= SensorService

    constructor(){
    }
    public CollectSensorData(req:Request, res:Response) {
        try{
            console.log("what is this",this)
            // console.log(this.service)
            console.log("inside CollectSensorData")
            const body: AirQualityData = req.body
            console.log("Log1")
            console.log(body)
            console.log("Log2")
            console.log(SensorService)
            SensorService.ProcessSensorData(body)
            console.log("Log3")
            res.status(200).json({message: "success", stored: body})
            console.log("Log4")
            return
            // res.json({message: "success", stored: body})
        } catch(err) {
            console.log(err)
            res.status(500).json({error: err})
            return 
        }
        return null
    }
    public async GetAllSensorData(req:Request, res:Response) {
        console.log("request received")
        try{
            const data = SensorService.GetAirQualityData()
            res.status(200).json({data})
            return
        } catch(err) {
            
        }
        return null
    }
}
export default new SensorController()