import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FipeService } from './fipe.service';
import { VehicleTypeEnum } from '../types/vehicle-type.enum';
import { VehicleResponse, VehiclePriceHistory } from '../types/vehicle';

describe('FipeService', () => {
  let service: FipeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FipeService],
    });
    service = TestBed.inject(FipeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch brands', () => {
    const mockBrands: VehicleResponse[] = [
      { code: '1', name: 'Ford' },
      { code: '2', name: 'Chevrolet' },
    ];

    service.listBrands(VehicleTypeEnum.CARS).subscribe((brands) => {
      expect(brands.length).toBe(2);
      expect(brands).toEqual(mockBrands);
    });

    const req = httpMock.expectOne(
      `https://fipe-search-backend-production.up.railway.app/fipe/${VehicleTypeEnum.CARS.toLowerCase()}/brands`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockBrands);
  });

  it('should fetch models', () => {
    const mockModels: VehicleResponse[] = [
      { code: '10', name: 'Focus' },
      { code: '11', name: 'Fiesta' },
    ];

    service.listModels(VehicleTypeEnum.CARS, '1').subscribe((models) => {
      expect(models.length).toBe(2);
      expect(models).toEqual(mockModels);
    });

    const req = httpMock.expectOne(
      `https://fipe-search-backend-production.up.railway.app/fipe/${VehicleTypeEnum.CARS.toLowerCase()}/brands/1/models`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockModels);
  });

  it('should fetch vehicle history', () => {
    const mockHistory: VehiclePriceHistory[] = [
      { year: '2018', price: 'R$ 40.000', diff: null, diffPercentage: null, previousYear: null, previousPrice: null },
      { year: '2019', price: 'R$ 45.000', diff: 'R$ 5.000', diffPercentage: '12,5%', previousYear: '2018', previousPrice: 'R$ 40.000' },
    ];

    service.getVehicleHistory(VehicleTypeEnum.CARS, '1', '10').subscribe((history) => {
      expect(history.length).toBe(2);
      expect(history).toEqual(mockHistory);
    });

    const req = httpMock.expectOne(
      `https://fipe-search-backend-production.up.railway.app/fipe/${VehicleTypeEnum.CARS.toLowerCase()}/brands/1/models/10/history`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockHistory);
  });
});
