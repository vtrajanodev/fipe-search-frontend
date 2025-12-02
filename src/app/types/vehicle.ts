import { FormControl } from '@angular/forms';

export interface VehicleRequest {
  brandId: string;
  modelId: string;
  yearCode: string;
}

export interface VehicleRequestForm {
  brand: FormControl<String | null>;
  model: FormControl<String | null>;
  yearCode: FormControl<String | null>;
}
