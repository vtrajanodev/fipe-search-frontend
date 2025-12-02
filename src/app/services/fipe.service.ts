import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehiclePriceHistory, VehicleResponse } from '../types/vehicle';
import { VehicleTypeEnum } from '../types/vehicle-type.enum';

@Injectable({
  providedIn: 'root',
})
export class FipeService {
  private readonly baseUrl = 'http://localhost:8080/fipe';

  constructor(private httpClient: HttpClient) {}

  listBrands(vehicleType: VehicleTypeEnum): Observable<VehicleResponse[]> {
    return this.httpClient.get<VehicleResponse[]>(
      `${this.baseUrl}/${vehicleType}/brands`
    );
  }

  listModels(
    vehicleType: VehicleTypeEnum,
    brandId: string
  ): Observable<VehicleResponse[]> {
    return this.httpClient.get<VehicleResponse[]>(
      `${this.baseUrl}/${vehicleType}/brands/${brandId}/models`
    );
  }

  getVehicleHistory(
    vehicleType: VehicleTypeEnum,
    brandId: string,
    modelId: string
  ): Observable<VehiclePriceHistory[]> {
    return this.httpClient.get<VehiclePriceHistory[]>(
      `${this.baseUrl}/${vehicleType}/brands/${brandId}/models/${modelId}/history`
    );
  }
}
