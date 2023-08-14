
export interface AirQualityData {
    carbonMonoxide: number;
    groundLevelOzone: number;
    nitrogenDioxide: number;
    sulfurDioxide: number;
    sensorId: string;
    timestamp: Date
}

export interface AirQualitySummaryReport {
    carbonMonoxide: PollutantSummary;
    groundLevelOzone: PollutantSummary;
    nitrogenDioxide: PollutantSummary;
    sulfurDioxide: PollutantSummary;
}
export interface PollutantSummary {
    average: number;
    maximum: {
        value: number;
        timestamp: Date
    };
    minimum: {
        value: number;
        timestamp: Date
    };
}

export interface PollutantExtrema {
    maximum: {
        value: number;
        timestamp: Date
    };
    minimum: {
        value: number;
        timestamp: Date
    };
}