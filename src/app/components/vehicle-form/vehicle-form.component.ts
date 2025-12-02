import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, switchMap } from 'rxjs/operators';
import { FipeService } from 'src/app/services/fipe.service';
import {
  VehicleRequestForm,
  VehicleResponse,
  VehiclePriceHistory,
} from 'src/app/types/vehicle';
import { VehicleTypeEnum } from 'src/app/types/vehicle-type.enum';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss'],
})
export class VehicleFormComponent implements OnInit {
  public brands: VehicleResponse[] = [];
  public models: VehicleResponse[] = [];
  public vehiclePriceHistory: VehiclePriceHistory[] = [];
  public formGroup: FormGroup<VehicleRequestForm>;

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
    this.handleModelChanges();
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
    this.formGroup.controls.vehicleType.valueChanges
      .pipe(
        filter(
          (vehicleType): vehicleType is VehicleTypeEnum => vehicleType !== null
        )
      )
      .subscribe((vehicleType) => {
        this.formGroup.controls.brandId.reset({ value: null, disabled: false });
        this.formGroup.controls.modelId.reset({ value: null, disabled: true });
        this.models = [];
        this.vehiclePriceHistory = [];

        this.fipeService.listBrands(vehicleType).subscribe((brands) => {
          this.brands = brands;
        });
      });
  }

  private handleBrandChanges(): void {
    this.formGroup.controls.brandId.valueChanges
      .pipe(filter((brandId): brandId is string => brandId !== null))
      .subscribe((brandId) => {
        this.formGroup.controls.modelId.reset({ value: null, disabled: false });
        this.vehiclePriceHistory = [];

        const vehicleType = this.formGroup.controls.vehicleType.value;
        if (!vehicleType) return;

        this.fipeService
          .listModels(vehicleType, brandId)
          .subscribe((models) => {
            this.models = models;
          });
      });
  }

  private handleModelChanges(): void {
    this.formGroup.controls.modelId.valueChanges
      .pipe(filter((modelId): modelId is string => modelId !== null))
      .subscribe((modelId) => {
        const vehicleType = this.formGroup.controls.vehicleType.value;
        const brandId = this.formGroup.controls.brandId.value;
        if (!vehicleType || !brandId) return;

        this.fipeService
          .getVehicleHistory(vehicleType, brandId, modelId)
          .subscribe((years) => {
            this.vehiclePriceHistory = years ?? [];
          });
      });
  }

  public submitForm(): void {
    if (this.formGroup.valid) {
      const { vehicleType, brandId, modelId } = this.formGroup.getRawValue();
      this.fipeService
        .getVehicleHistory(vehicleType!, brandId!, modelId!)
        .subscribe((history) => {
          console.log('Vehicle history:', history);
        });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
