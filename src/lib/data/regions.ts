import sourceData from "./generated/regions";
export interface Region {
    id: string;
    name: string;
    commodities: string[];
    bounds: [
        [
            number,
            number
        ],
        [
            number,
            number
        ]
    ]; // [[south, west], [north, east]]
    description: string;
}
export const REGIONS: Region[] = sourceData.REGIONS as Region[];
