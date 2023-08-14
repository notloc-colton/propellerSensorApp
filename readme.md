# Propeller Sensor App

This application is a basic CRUD application accepting incoming sensor data and responding to sensor data summary report requests

## Installation

Use node package manager

```bash
npm i
```
## Running the application
You will need to have a .env file at the root of the project (next to index.ts) with the following:
```bash
PORT=8080
```
After that, all you'll need to do is run the following and the application will accept inbound requests
```bash
npm run serve
```

## Examples
To post sensor data to the application, you will need a request like the following
```bash
curl --location --request POST 'http://localhost:8080/api/v1/sensor' \
--header 'Content-Type: application/json' \
--data-raw '{
    "carbonMonoxide": 40,
    "groundLevelOzone": 0.6,
    "nitrogenDioxide": 3,
    "sulfurDioxide": 100,
    "sensorId": "test123",
    "timestamp": "2021-10-21T06:20:00.000Z"
}'

# which will return
status:200
{
    "message": "success"
}


```
To get sensor summary data from the application, you will need a request like the following (sensorId query string parameter optional)
```bash
curl --location --request GET 'http://localhost:8080/api/v1/summary?sensorId=id567'

# which will return
status:200
{
    "summary": {
        "carbonMonoxide": {
            "average": 40,
            "maximum": {
                "value": 40,
                "timestamp": "2021-10-21T06:20:00.000Z"
            },
            "minimum": {
                "value": 40,
                "timestamp": "2021-10-21T06:20:00.000Z"
            }
        },
        "groundLevelOzone": {
            "average": 0.6,
            "maximum": {
                "value": 0.6,
                "timestamp": "2021-10-21T06:20:00.000Z"
            },
            "minimum": {
                "value": 0.6,
                "timestamp": "2021-10-21T06:20:00.000Z"
            }
        },
        "nitrogenDioxide": {
            "average": 3,
            "maximum": {
                "value": 3,
                "timestamp": "2021-10-21T06:20:00.000Z"
            },
            "minimum": {
                "value": 3,
                "timestamp": "2021-10-21T06:20:00.000Z"
            }
        },
        "sulfurDioxide": {
            "average": 100,
            "maximum": {
                "value": 100,
                "timestamp": "2021-10-21T06:20:00.000Z"
            },
            "minimum": {
                "value": 100,
                "timestamp": "2021-10-21T06:20:00.000Z"
            }
        }
    }
}

# OR if no data is found
status:204
{}
```