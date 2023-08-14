import { AirQualitySummary, PollutantSummary } from "./airQualitySummary";

describe("AirQualitySummary", () => {
  let airQualitySummary: AirQualitySummary;

  beforeEach(() => {
    airQualitySummary = new AirQualitySummary();
  });

  it("should initialize with PollutantSummary objects", () => {
    expect(airQualitySummary.carbonMonoxide).toBeInstanceOf(PollutantSummary);
    expect(airQualitySummary.groundLevelOzone).toBeInstanceOf(PollutantSummary);
    expect(airQualitySummary.nitrogenDioxide).toBeInstanceOf(PollutantSummary);
    expect(airQualitySummary.sulfurDioxide).toBeInstanceOf(PollutantSummary);
  });

  it("should add data points correctly", () => {
    const dataPoint = {
      carbonMonoxide: 10,
      groundLevelOzone: 0.5,
      nitrogenDioxide: 30,
      sulfurDioxide: 5,
      sensorId: "test123",
      timestamp: new Date(),
    };

    airQualitySummary.addDataPoint(dataPoint);

    const carbonMonoxideExtrema = airQualitySummary.carbonMonoxide.extrema;
    const groundLevelOzoneExtrema = airQualitySummary.groundLevelOzone.extrema;
    const nitrogenDioxideExtrema = airQualitySummary.nitrogenDioxide.extrema;
    const sulfurDioxideExtrema = airQualitySummary.sulfurDioxide.extrema;

    expect(carbonMonoxideExtrema.maximum.value).toBe(10);
    expect(groundLevelOzoneExtrema.minimum.value).toBe(0.5);
    expect(nitrogenDioxideExtrema.maximum.value).toBe(30);
    expect(sulfurDioxideExtrema.minimum.value).toBe(5);
  });

  it("should calculate air quality summary report correctly", () => {
    airQualitySummary.addDataPoint({
      carbonMonoxide: 10,
      groundLevelOzone: 0.5,
      nitrogenDioxide: 30,
      sulfurDioxide: 5,
      sensorId: "test123",
      timestamp: new Date(),
    });

    airQualitySummary.addDataPoint({
      carbonMonoxide: 15,
      groundLevelOzone: 0.3,
      nitrogenDioxide: 40,
      sulfurDioxide: 8,
      sensorId: "test789",
      timestamp: new Date(),
    });

    const report = airQualitySummary.calculateAirQualitySummaryReport();

    expect(report.carbonMonoxide.average).toBe(12.5);
    expect(report.groundLevelOzone.maximum.value).toBe(0.5);
    expect(report.nitrogenDioxide.minimum.value).toBe(30);
    expect(report.sulfurDioxide.maximum.value).toBe(8);
  });
});

describe("PollutantSummary", () => {
  let pollutantSummary: PollutantSummary;

  beforeEach(() => {
    pollutantSummary = new PollutantSummary();
  });

  it("should initialize with correct values", () => {
    expect(pollutantSummary.numberOfDataPoints).toBe(0);
    expect(pollutantSummary.sumOfValues).toBe(0);
    expect(pollutantSummary.extrema.maximum.value).toBe(Number.MIN_VALUE);
    expect(pollutantSummary.extrema.minimum.value).toBe(Number.MAX_VALUE);
  });

  it("should calculate average correctly", () => {
    pollutantSummary.addDataPoint(5, new Date());
    pollutantSummary.addDataPoint(10, new Date());
    expect(pollutantSummary.calculateAverage()).toBe(7.5);
  });

  it("should replace maximum and minimum correctly", () => {
    const timestamp = new Date();
    pollutantSummary.addDataPoint(5, timestamp);
    pollutantSummary.addDataPoint(10, timestamp);
    pollutantSummary.addDataPoint(2, timestamp);

    expect(pollutantSummary.extrema.maximum.value).toBe(10);
    expect(pollutantSummary.extrema.minimum.value).toBe(2);
  });

  it("should not replace maximum when value is smaller", () => {
    pollutantSummary.addDataPoint(5, new Date());
    pollutantSummary.addDataPoint(2, new Date());
    expect(pollutantSummary.extrema.maximum.value).toBe(5);
  });

  it("should not replace minimum when value is larger", () => {
    pollutantSummary.addDataPoint(5, new Date());
    pollutantSummary.addDataPoint(10, new Date());
    expect(pollutantSummary.extrema.minimum.value).toBe(5);
  });

  it("should handle zero data points for average calculation", () => {
    expect(pollutantSummary.calculateAverage()).toBe(0);
  });
});
