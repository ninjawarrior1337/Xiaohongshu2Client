import { Component } from "@angular/core";
import { CountryPopulation } from "../country-population";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-country-population",
  imports: [RouterLink, MatButtonModule],
  templateUrl: "./country-population.component.html",
  styleUrl: "./country-population.component.css",
})
export class CountryPopulationComponent {
  public countryPopulation: CountryPopulation | undefined;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe({
      next: (p) => this.getCountryWithPopulation(p["id"]),
    });
  }

  getCountryWithPopulation(id: string) {
    this.http
      .get<CountryPopulation>(`/api/Countries/GetPopulation/${id}`)
      .subscribe({
        next: (res) => {
          this.countryPopulation = res;
        },
        error: (e) => {
          console.error(e);
        },
      });
  }
}
