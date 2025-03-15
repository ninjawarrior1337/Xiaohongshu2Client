import { Country } from "./country"

export interface CountryPopulation extends Country {
    population: number
    cityCount: number
}