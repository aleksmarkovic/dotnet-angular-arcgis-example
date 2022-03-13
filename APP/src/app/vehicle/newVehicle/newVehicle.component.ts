import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'newVehicle-modal-content',
  templateUrl: `./newVehicle.component.html`
})
export class NewVehicleModalContent {
  constructor(public activeModal: NgbActiveModal, private vehicleService: VehicleService) { }

  onSubmit = (data: any) => {
    if (data.brand && data.name) {
      this.vehicleService.addVehicle(data);
    }

    this.activeModal.close();
  }
}
