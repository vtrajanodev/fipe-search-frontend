import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VehicleRequestForm } from 'src/app/types/vehicle';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss'],
})
export class VehicleFormComponent implements OnInit {
  public formGroup: FormGroup<VehicleRequestForm>;

  constructor() {}

  ngOnInit(): void {
    this.formBuilder();
  }

  formBuilder() {
    this.formGroup = new FormGroup<VehicleRequestForm>({
      brand: new FormControl<string | null>(null),
      model: new FormControl<string | null>(null),
      year: new FormControl<string | null>(null),
    });
  }
}
