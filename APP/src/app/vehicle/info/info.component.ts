import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Vehicle } from '../vehicle.model';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'info-modal-content',
  templateUrl: `./info.component.html`
})
export class InfoModalContent {
  private vehicle!: Vehicle;

  constructor(public activeModal: NgbActiveModal, private vehicleService: VehicleService) { }

  getVehicle = () => this.vehicle;
  setVehicle = (vehicle: Vehicle) => this.vehicle = vehicle;

  onAddInfo = () => {
    const infoKeys = Object.keys(this.vehicle.additionalInfo);

    this.vehicle.additionalInfo = Object.assign(this.vehicle.additionalInfo,
      {
        [`${infoKeys.length}_tmp`]: ''
      });
  }

  onSubmit = (data: any) => {
    let formattedData = {};
    const dataKeys = Object.keys(data);

    dataKeys.forEach((key, index) => {
      if (key.includes('key') && data[key] !== '') {
        formattedData = { ...formattedData, [data[key]]: data[dataKeys[index + 1]] };
      }
    });

    this.vehicle.additionalInfo = JSON.stringify(formattedData);
    this.vehicleService.updateVehicle(this.vehicle);

    this.activeModal.close();
  }
}
