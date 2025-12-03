import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { of } from 'rxjs';
import { VehicleTypeEnum } from './types/vehicle-type.enum';
import { FipeService } from './services/fipe.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let fipeServiceMock: jasmine.SpyObj<FipeService>;

  beforeEach(async () => {
    fipeServiceMock = jasmine.createSpyObj('FipeService', [
      'listBrands',
      'listModels',
      'getVehicleHistory',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        CardModule,
        DropdownModule,
        DividerModule,
      ],
      declarations: [AppComponent],
      providers: [{ provide: FipeService, useValue: fipeServiceMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fipeServiceMock.listBrands.and.returnValue(of([]));
    fipeServiceMock.listModels.and.returnValue(of([]));
    fipeServiceMock.getVehicleHistory.and.returnValue(of([]));

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the formGroup with 3 controls', () => {
    expect(component.formGroup.get('vehicleType')).toBeTruthy();
    expect(component.formGroup.get('brandId')).toBeTruthy();
    expect(component.formGroup.get('modelId')).toBeTruthy();
  });

  it('should reset brands and models when vehicleType changes', fakeAsync(() => {
    const brandsMock = [{ code: '1', name: 'Brand 1' }];
    fipeServiceMock.listBrands.and.returnValue(of(brandsMock));

    component.formGroup.controls.vehicleType.setValue(VehicleTypeEnum.CARS);
    tick();

    expect(component.brands).toEqual(brandsMock);
    expect(component.models).toEqual([]);
    expect(component.formGroup.controls.brandId.enabled).toBeTrue();
    expect(component.formGroup.controls.modelId.disabled).toBeTrue();
  }));

  it('should reset models when brandId changes', fakeAsync(() => {
    const modelsMock = [{ code: '10', name: 'Model 10' }];
    fipeServiceMock.listModels.and.returnValue(of(modelsMock));

    component.formGroup.controls.vehicleType.setValue(VehicleTypeEnum.CARS);
    component.formGroup.controls.brandId.setValue('1');
    tick();

    expect(component.models).toEqual(modelsMock);
    expect(component.formGroup.controls.modelId.enabled).toBeTrue();
  }));

  it('should call getVehicleHistory when submitting valid form', fakeAsync(() => {
    const historyMock = [
      {
        year: '2023',
        price: 'R$ 55.000,00',
        diff: null,
        diffPercentage: null,
        previousYear: null,
        previousPrice: null,
      },
    ];

    fipeServiceMock.getVehicleHistory.and.returnValue(of(historyMock));

    component.formGroup.controls.vehicleType.setValue(VehicleTypeEnum.CARS);
    component.formGroup.controls.brandId.setValue('1');
    component.formGroup.controls.modelId.setValue('10');

    component.submitForm();
    tick();

    component.vehiclePriceHistory$.subscribe((data) => {
      expect(data).toEqual(historyMock);
    });

    expect(component.loadingHistory).toBeFalse();
  }));

  it('should mark all controls as touched if form is invalid on submit', () => {
    spyOn(component.formGroup, 'markAllAsTouched');

    component.formGroup.controls.vehicleType.setValue(null);
    component.submitForm();

    expect(component.formGroup.markAllAsTouched).toHaveBeenCalled();
  });

  it('should clear form and reset brands, models, and vehiclePriceHistory$', () => {
    component.brands = [{ code: '1', name: 'Brand' }];
    component.models = [{ code: '10', name: 'Model' }];
    component.vehiclePriceHistory$ = of([
      {
        year: '2023',
        price: 'R$ 55.000,00',
        diff: null,
        diffPercentage: null,
        previousYear: null,
        previousPrice: null,
      },
    ]);

    component.clearForm();

    const formValues = component.formGroup.getRawValue();
    expect(formValues.vehicleType).toBeNull();
    expect(formValues.brandId).toBeNull();
    expect(formValues.modelId).toBeNull();
    expect(component.brands).toEqual([]);
    expect(component.models).toEqual([]);

    component.vehiclePriceHistory$.subscribe((data) => {
      expect(data).toEqual([]);
    });
  });
});
