import { Routes } from "@angular/router";
import { WeatherComponent } from "./weather/weather.component";
import { CitiesComponent } from "./cities/cities.component";
import { CountriesComponent } from "./countries/countries.component";
import { CountryPopulationComponent } from "./country-population/country-population.component";

export const routes: Routes = [
  {
    path: "weather",
    component: WeatherComponent,
  },
  {
    path: "cities",
    component: CitiesComponent,
  },
  {
    path: "countries",
    component: CountriesComponent,
  },
  {
    path: "countryPopulation/:id",
    component: CountryPopulationComponent,
  },
  {
    path: "",
    pathMatch: "full",
    component: WeatherComponent,
  },
];
