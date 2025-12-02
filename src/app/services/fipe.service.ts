import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleRequest, VehicleResponse } from '../types/vehicle';

@Injectable({
  providedIn: 'root',
})
export class FipeService {
  private readonly baseUrl = 'http://localhost:8080/fipe/cars';
  constructor(private httpClient: HttpClient) {}

  listBrands(): Observable<VehicleResponse[]> {
    return this.httpClient.get<VehicleResponse[]>(`${this.baseUrl}/brands`);
  }

  listModels(brandId: string): Observable<VehicleResponse[]> {
    return this.httpClient.get<VehicleResponse[]>(
      `${this.baseUrl}/brands/${brandId}/models`
    );
  }
}
