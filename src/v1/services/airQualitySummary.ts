import {
  AirQualityData,
  AirQualitySummaryReport,
  PollutantExtrema,
} from "../interfaces/airQualityData.interface";

export class AirQualitySummary {
  carbonMonoxide: PollutantSummary = new PollutantSummary();
  groundLevelOzone: PollutantSummary = new PollutantSummary();
  nitrogenDioxide: PollutantSummary = new PollutantSummary();
  sulfurDioxide: PollutantSummary = new PollutantSummary();

  addDataPoint(data: AirQualityData) {
    this.carbonMonoxide.addDataPoint(data.carbonMonoxide, data.timestamp);
    this.groundLevelOzone.addDataPoint(data.groundLevelOzone, data.timestamp);
    this.nitrogenDioxide.addDataPoint(data.nitrogenDioxide, data.timestamp);
    this.sulfurDioxide.addDataPoint(data.sulfurDioxide, data.timestamp);
  }
  calculateAirQualitySummaryReport(): AirQualitySummaryReport {
    return {
      carbonMonoxide: {
        average: this.carbonMonoxide.calculateAverage(),
        maximum: this.carbonMonoxide.extrema.maximum,
        minimum: this.carbonMonoxide.extrema.minimum,
      },
      groundLevelOzone: {
        average: this.groundLevelOzone.calculateAverage(),
        maximum: this.groundLevelOzone.extrema.maximum,
        minimum: this.groundLevelOzone.extrema.minimum,
      },
      nitrogenDioxide: {
        average: this.nitrogenDioxide.calculateAverage(),
        maximum: this.nitrogenDioxide.extrema.maximum,
        minimum: this.nitrogenDioxide.extrema.minimum,
      },
      sulfurDioxide: {
        average: this.sulfurDioxide.calculateAverage(),
        maximum: this.sulfurDioxide.extrema.maximum,
        minimum: this.sulfurDioxide.extrema.minimum,
      },
    };
  }
}
export class PollutantSummary {
  numberOfDataPoints: number = 0;
  sumOfValues: number = 0;
  extrema: PollutantExtrema = {
    maximum: {
      value: Number.MIN_VALUE,
      timestamp: new Date(),
    },
    minimum: {
      value: Number.MAX_VALUE,
      timestamp: new Date(),
    },
  };

  addDataPoint(value: number, timestamp: Date) {
    this.replaceMaximum(value, timestamp);
    this.replaceMinimum(value, timestamp);
    this.numberOfDataPoints++;
    this.sumOfValues += value;
  }
  replaceMaximum(value: number, timestamp: Date) {
    if (this.extrema.maximum.value >= value) {
      return;
    }
    this.extrema.maximum = {
      value,
      timestamp,
    };
  }
  replaceMinimum(value: number, timestamp: Date) {
    if (this.extrema.minimum.value <= value) {
      return;
    }

    this.extrema.minimum = {
      value,
      timestamp,
    };
  }
  calculateAverage(): number {
    if (this.numberOfDataPoints <= 0) {
      return 0;
    } else {
      return this.sumOfValues / this.numberOfDataPoints;
    }
  }
}
