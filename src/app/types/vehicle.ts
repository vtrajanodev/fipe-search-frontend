import { FormControl } from '@angular/forms';

export interface VehicleResponse {
  code: string;
  name: string;
}

export interface VehicleRequestForm {
  vehicleType: FormControl<string | null>;
  brandId: FormControl<string | null>;
  modelId: FormControl<string | null>;
}

export interface FipeInformationResponse {
  brand: string;
  codeFipe: string;
  fuel: string;
  fuelAcronym: string;
  model: string;
  modelYear: number;
  price: string;
  priceHistory: VehiclePriceHistory[];
  referenceMonth: string;
  vehicleType: number;
}

export interface VehiclePriceHistory {
  month: string;
  price: string;
  reference: string;
}
