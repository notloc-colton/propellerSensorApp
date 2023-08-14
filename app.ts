import express, { Express, Request, Response } from 'express';


export class App {
    private express: Express
    constructor(){
        this.express = express()
    }
}