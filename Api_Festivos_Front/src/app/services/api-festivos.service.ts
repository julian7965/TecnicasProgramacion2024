import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface EsFestivoResponse {
  esFestivo: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FestivosService {
  private _urlApi: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  public consultarSiDiaEsFestivo(fecha: string) {
    return this.http.get<EsFestivoResponse>(
      `${this._urlApi}/festivos/es-festivo?fecha=${fecha}`
    );
  }

  public traerFestivosPorAnio(anio: string) {
    return this.http.get<string[]>(
      `${this._urlApi}/festivos/obtener-festivos?anio=${anio}`
    );
  }
}
