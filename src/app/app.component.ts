import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize, Observable, of } from 'rxjs';
import { FipeService } from './services/fipe.service';
import {
  VehicleResponse,
  VehiclePriceHistory,
  VehicleRequestForm,
} from './types/vehicle';
import { VehicleTypeEnum } from './types/vehicle-type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fipe-search';
  public brands: VehicleResponse[] = [];
  public models: VehicleResponse[] = [];
  public vehiclePriceHistory$: Observable<VehiclePriceHistory[]> = of([]);
  public formGroup: FormGroup<VehicleRequestForm>;
  public loading = false;

  public readonly vehicleTypeOptions = [
    { code: VehicleTypeEnum.CARS, name: 'Carros e utilitários pequenos' },
    { code: VehicleTypeEnum.MOTORCYCLES, name: 'Motos' },
    { code: VehicleTypeEnum.TRUCKS, name: 'Caminhões e microônibus' },
  ];

  constructor(private fipeService: FipeService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.handleVehicleTypeChanges();
    this.handleBrandChanges();
  }

  public submitForm(): void {
    const formValues = this.getFormValues();
    if (!formValues) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const { vehicleType, brandId, modelId } = formValues;

    this.loading = true;
    this.vehiclePriceHistory$ = this.fipeService
      .getVehicleHistory(vehicleType, brandId, modelId)
      .pipe(finalize(() => (this.loading = false)));
  }

  public clearForm(): void {
    this.formGroup.reset();
    this.vehiclePriceHistory$ = of([]);
    this.models = [];
    this.brands = [];
  }

  private initializeForm(): void {
    this.formGroup = new FormGroup<VehicleRequestForm>({
      vehicleType: new FormControl<VehicleTypeEnum | null>(
        null,
        Validators.required
      ),
      brandId: new FormControl<string | null>(
        { value: null, disabled: true },
        Validators.required
      ),
      modelId: new FormControl<string | null>(
        { value: null, disabled: true },
        Validators.required
      ),
    });
  }

  private handleVehicleTypeChanges(): void {
    this.formGroup.controls.vehicleType.valueChanges.subscribe(
      (vehicleType) => {
        this.formGroup.controls.brandId.reset({ value: null, disabled: false });
        this.formGroup.controls.modelId.reset({ value: null, disabled: true });
        this.models = [];
        this.brands = [];

        if (!vehicleType) return;

        this.fipeService.listBrands(vehicleType).subscribe((brands) => {
          this.brands = brands;
        });
      }
    );
  }

  private handleBrandChanges(): void {
    this.formGroup.controls.brandId.valueChanges.subscribe((brandId) => {
      this.formGroup.controls.modelId.reset({ value: null, disabled: false });
      this.models = [];

      const vehicleType = this.formGroup.controls.vehicleType.value;
      if (!vehicleType || !brandId) return;

      this.fipeService.listModels(vehicleType, brandId).subscribe((models) => {
        this.models = models;
      });
    });
  }

  private getFormValues(): {
    vehicleType: VehicleTypeEnum;
    brandId: string;
    modelId: string;
  } | null {
    const { vehicleType, brandId, modelId } = this.formGroup.getRawValue();
    if (vehicleType && brandId && modelId) {
      return { vehicleType, brandId, modelId };
    }
    return null;
  }
}
