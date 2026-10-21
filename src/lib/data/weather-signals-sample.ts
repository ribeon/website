import sourceData from "./generated/weather-signals-sample";
export interface WeatherSignalRow {
    date: string;
    region: string;
    gdd_anomaly_pct: number;
    precip_deficit_prob: number;
    hdd_anomaly: number;
    drought_probability: number;
    frost_risk_prob: number;
    composite_rank: number;
}
export const weatherSignalsSample: WeatherSignalRow[] = sourceData.weatherSignalsSample;
