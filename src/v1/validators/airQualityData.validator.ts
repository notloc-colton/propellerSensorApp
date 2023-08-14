import express, { Express, Request, Response } from 'express';
import { AirQualityData } from '../interfaces/airQualityData.interface';
import _ from "lodash"

//TODO: Add validation for timestamp and sensorID!!!!!!!!!!!!!!!!

export async function  validateAirQualityData (req:Request, res:Response, next:express.NextFunction):Promise<void> {
    const body: AirQualityData = req.body
    let errors: string[] = []
    const carbonMonoxideError = validateDataPoint("carbonMonoxide", body.carbonMonoxide, 50.4, 0)
    if (carbonMonoxideError != null) {
        errors.push(carbonMonoxideError.message)
    }
    const groundLevelOzoneError = validateDataPoint("groundLevelOzone", body.groundLevelOzone, 0.604, 0)
    if (groundLevelOzoneError != null) {
        errors.push(groundLevelOzoneError.message)
    }
    const nitrogenDioxideError = validateDataPoint("nitrogenDioxide", body.nitrogenDioxide, 2049, 0)
    if (nitrogenDioxideError != null) {
        errors.push(nitrogenDioxideError.message)
    }
    const sulfurDioxideeError = validateDataPoint("sulfurDioxide", body.sulfurDioxide, 1004, 0)
    if (sulfurDioxideeError != null) {
        errors.push(sulfurDioxideeError.message)
    }
    
    if (Number.isNaN(new Date(body.timestamp).getTime())) {
        console.log("PROBLEM!")
        errors.push("invalid timestamp")
    }
    if (_.isEmpty(body.sensorId)){
        errors.push("invalid sensorId")
    }
    if (errors.length > 0) {
        res.status(400).json({errors})
        return
    }
    next()
}
export function validateDataPoint(name: string, field: number | null, max: number, min: number): Error | null{
    if (field == null) {
        return Error(`${name} field cannot be null`)
    }
    console.log(field)
    if ((field > max) || (field < min)) {
        return Error(`${name} field must be between ${min} and ${max}`)
    }
    return null
}