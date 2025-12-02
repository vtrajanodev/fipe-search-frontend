import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleResponse } from '../types/vehicle';

@Injectable({
  providedIn: 'root',
})
export class FipeService {
  private readonly baseUrl = 'http://localhost:8080/fipe';

  constructor(private httpClient: HttpClient) {}

  listBrands(vehicleType: string): Observable<VehicleResponse[]> {
    return this.httpClient.get<VehicleResponse[]>(
      `${this.baseUrl}/${vehicleType}/brands`
    );
  }

  listModels(
    vehicleType: string,
    brandId: string
  ): Observable<VehicleResponse[]> {
    return this.httpClient.get<VehicleResponse[]>(
      `${this.baseUrl}/${vehicleType}/brands/${brandId}/models`
    );
  }

  listYearsByBrandAndModel(
    vehicleType: string,
    brandId: string,
    modelId: string
  ): Observable<VehicleResponse[]> {
    return this.httpClient.get<VehicleResponse[]>(
      `${this.baseUrl}/${vehicleType}/brands/${brandId}/models/${modelId}/years`
    );
  }
}
