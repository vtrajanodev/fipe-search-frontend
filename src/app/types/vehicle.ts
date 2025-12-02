import { FormControl } from '@angular/forms';
import { VehicleTypeEnum } from './vehicle-type.enum';

export interface VehicleResponse {
  code: string;
  name: string;
}

export interface VehicleRequestForm {
  vehicleType: FormControl<VehicleTypeEnum | null>;
  brandId: FormControl<string | null>;
  modelId: FormControl<string | null>;
}

export interface VehiclePriceHistory {
  year: string;
  price: string;
  diff?: number;
  diffPercentage?: number;
}
