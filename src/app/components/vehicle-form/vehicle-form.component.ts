import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { FipeService } from 'src/app/services/fipe.service';
import { VehicleRequestForm, VehicleResponse } from 'src/app/types/vehicle';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss'],
})
export class VehicleFormComponent implements OnInit {
  public brands$: Observable<VehicleResponse[]>;
  public models: VehicleResponse[];
  public years: VehicleResponse[];
  public formGroup: FormGroup<VehicleRequestForm>;

  constructor(private fipeService: FipeService) {}

  ngOnInit(): void {
    this.formBuilder();
    this.listBrands();
    this.watchBrandChanges();
    this.watchedModelChanges();
  }

  listBrands(): void {
    this.brands$ = this.fipeService.listBrands();
  }

  watchBrandChanges() {
    this.formGroup.controls.brandId.valueChanges
      .pipe(
        filter((brandId): brandId is string => !!brandId),
        switchMap((brandId) => this.fipeService.listModels(brandId)),
        map((models) => models ?? [])
      )
      .subscribe((models) => {
        this.models = models;
      });
  }

  watchedModelChanges() {
    combineLatest([
      this.formGroup.controls.brandId.valueChanges.pipe(
        filter((brandId): brandId is string => !!brandId)
      ),
      this.formGroup.controls.modelId.valueChanges.pipe(
        filter((modelId): modelId is string => !!modelId)
      ),
    ])
      .pipe(
        switchMap(([brandId, modelId]) =>
          this.fipeService.listYearsByBrandAndModel(brandId, modelId)
        ),
        map((years) => years ?? [])
      )
      .subscribe((years) => {
        this.years = years;
      });
  }
  formBuilder() {
    this.formGroup = new FormGroup<VehicleRequestForm>({
      brandId: new FormControl<string | null>(null, [Validators.required]),
      modelId: new FormControl<string | null>(null, [Validators.required]),
      yearId: new FormControl<string | null>(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      console.log('Form submitted!', this.formGroup.value);
      // this.fipeService
    } else {
      console.log('Form inválido');
      this.formGroup.markAllAsTouched(); // marca campos inválidos
    }
  }
}
