import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { WeatherForecast } from '../weather-forecast';

@Component({
  selector: 'app-weather',
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getForecasts();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('weatherforecast').subscribe({
      next: (res) => {
        this.forecasts = res;
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}