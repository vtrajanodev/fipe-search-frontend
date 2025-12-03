import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleHistoryComponent } from './vehicle-history.component';
import { CardModule } from 'primeng/card';
import { VehiclePriceHistory } from 'src/app/types/vehicle';

describe('VehicleHistoryComponent', () => {
  let component: VehicleHistoryComponent;
  let fixture: ComponentFixture<VehicleHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleHistoryComponent],
      imports: [CardModule],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleHistoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return empty string if vehicleHistory is undefined', () => {
    component.vehicleHistory = {
      year: '',
      price: '',
      diff: null,
      diffPercentage: null,
      previousYear: null,
      previousPrice: null,
    };
    
    expect(component.historyDescription).toBe('');
  });

  it('should return description with year and price if diff info is missing', () => {
    const history: VehiclePriceHistory = {
      year: '2019',
      price: 'R$ 41.322,00',
      diff: null,
      diffPercentage: null,
      previousYear: null,
      previousPrice: null,
    };
    component.vehicleHistory = history;

    const description = component.historyDescription;
    expect(description).toBe('Valor em 2019 -> R$ 41.322,00');
  });

  it('should return full description if diff info is present', () => {
    const history: VehiclePriceHistory = {
      year: '2020',
      price: 'R$ 44.689,00',
      diff: 'R$ 3.367,00',
      diffPercentage: '8,15%',
      previousYear: '2019',
      previousPrice: 'R$ 41.322,00',
    };
    component.vehicleHistory = history;

    const description = component.historyDescription;
    expect(description).toBe(
      'Valor em 2020 -> R$ 44.689,00, alteração de R$ 3.367,00 (8,15%) em relação a 2019'
    );
  });
});
