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

  get historyDescription(): string {
    console.log(this.vehicleHistory);

    if (!this.vehicleHistory) {
      return '';
    }

    const { year, price, diff, diffPercentage, previousYear } =
      this.vehicleHistory;

    let description = `Valor em ${year} -> ${price}`;

    if (diff != null && diffPercentage != null && previousYear) {
      description += `, alteração de R$ ${diff} (${diffPercentage}) em relação a ${previousYear}`;
    }

    return description;
  }
}
