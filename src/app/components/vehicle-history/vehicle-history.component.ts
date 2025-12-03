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
    if (
      !this.vehicleHistory ||
      !this.vehicleHistory.year ||
      !this.vehicleHistory.price
    ) {
      return '';
    }

    const { year, price, diff, diffPercentage, previousYear } =
      this.vehicleHistory;

    let description = `Valor em ${year} -> ${price}`;

    if (diff && diffPercentage && previousYear) {
      description += `, alteração de ${diff} (${diffPercentage}) em relação ao ano de ${previousYear}`;
    }

    return description;
  }
}
