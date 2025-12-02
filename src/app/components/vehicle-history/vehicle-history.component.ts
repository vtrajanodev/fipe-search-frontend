import { Component, Input, OnInit } from '@angular/core';
import { VehiclePriceHistory } from 'src/app/types/vehicle';

@Component({
  selector: 'app-vehicle-history',
  templateUrl: './vehicle-history.component.html',
  styleUrls: ['./vehicle-history.component.scss'],
})
export class VehicleHistoryComponent implements OnInit {
  @Input() public vehicleHistory: VehiclePriceHistory;

  constructor() {}

  ngOnInit(): void {}
}
