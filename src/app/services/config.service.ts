import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppConfig } from '../models/appConfig';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private url = environment.apiUrl + 'config/';

  constructor(private http: HttpClient) { }

  get() {
    this.http.get<AppConfig>(this.url + 'get').subscribe(data => {
      localStorage.setItem('appConfig', JSON.stringify(data));
    });
  }

  retrieve(): AppConfig {
    return JSON.parse(localStorage.getItem('appConfig'));
  }

  update(config: AppConfig) {
    this.http.put(this.url + 'update', config).subscribe((data: AppConfig) => {
      localStorage.setItem('appConfig', JSON.stringify(config));
    });
  }
}
