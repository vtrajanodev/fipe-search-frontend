import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, filter, map } from 'rxjs/operators';
import { FipeService } from 'src/app/services/fipe.service';
import { VehicleRequestForm, VehicleResponse } from 'src/app/types/vehicle';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss'],
})
export class VehicleFormComponent implements OnInit {
  public brands: VehicleResponse[] = [];
  public models: VehicleResponse[] = [];
  public years: VehicleResponse[] = [];
  public formGroup: FormGroup<VehicleRequestForm>;
  public readonly vehicleTypeOptions = [
    { code: 'cars', name: 'Carros e utilitários pequenos' },
    { code: 'motorcycles', name: 'Motos' },
    { code: 'trucks', name: 'Caminhões e microônibus' },
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
      vehicleType: new FormControl<string | null>(null, Validators.required),
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
        filter((vehicleType): vehicleType is string => vehicleType !== null)
      )
      .subscribe((vehicleType) => {
        this.formGroup.controls.brandId.reset({ value: null, disabled: false });
        this.formGroup.controls.modelId.reset({ value: null, disabled: true });
        this.models = [];
        this.years = [];

        this.fipeService
          .listBrands(vehicleType)
          .subscribe((brands) => (this.brands = brands));
      });
  }

  private handleBrandChanges(): void {
    this.formGroup.controls.brandId.valueChanges
      .pipe(filter((brandId): brandId is string => brandId !== null))
      .subscribe((brandId) => {
        this.formGroup.controls.modelId.reset({ value: null, disabled: false });
        this.years = [];

        const vehicleType = this.formGroup.controls.vehicleType.value;
        if (vehicleType) {
          this.fipeService
            .listModels(vehicleType, brandId)
            .subscribe((models) => (this.models = models));
        }
      });
  }

  private handleModelChanges(): void {
    this.formGroup.controls.modelId.valueChanges
      .pipe(filter((modelId): modelId is string => modelId !== null))
      .subscribe((modelId) => {
        const vehicleType = this.formGroup.controls.vehicleType.value;
        const brandId = this.formGroup.controls.brandId.value;

        if (vehicleType && brandId) {
          this.fipeService
            .listYearsByBrandAndModel(vehicleType, brandId, modelId)
            .subscribe((years) => (this.years = years ?? []));
        }
      });
  }

  public submitForm(): void {
    if (this.formGroup.valid) {
      console.log('Form submitted!', this.formGroup.value);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
