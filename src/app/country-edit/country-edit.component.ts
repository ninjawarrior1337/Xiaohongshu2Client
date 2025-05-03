import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Country } from "../country";

@Component({
  selector: "app-country-edit",
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterLink,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: "./country-edit.component.html",
  styleUrl: "./country-edit.component.css",
})
export class CountryEditComponent {
  public country: Country | undefined

  form = new FormGroup({
    countryName: new FormControl("", [Validators.required]),
    iso2: new FormControl("", [Validators.required]),
    iso3: new FormControl("", [Validators.required]),
  });

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe({
      next: (p) => {this.populateData(p["id"])},
    });
  }

  populateData(id: string) {
    this.http
      .get<Country>(`/api/Countries/${id}`)
      .subscribe({
        next: (res) => {
          this.country = res;

          this.form.patchValue({
            countryName: this.country.name,
            iso2: this.country.iso2,
            iso3: this.country.iso3
          })
        },
        error: (e) => {
          console.error(e);
        },
      });
  }

  onSubmit() {}
}
