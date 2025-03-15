import { Component, OnInit } from "@angular/core";
import { Country } from "../country";
import { HttpClient } from "@angular/common/http";
import { RouterLink } from '@angular/router';


@Component({
  selector: "app-countries",
  imports: [RouterLink],
  templateUrl: "./countries.component.html",
  styleUrl: "./countries.component.css",
})
export class CountriesComponent implements OnInit {
  public countries: Country[] = []

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.getCountries()
  }

  getCountries() {
    this.http.get<Country[]>("/api/Countries").subscribe({
      next: (res) => {
        this.countries = res;
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}
