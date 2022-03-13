import { Component, OnInit, PipeTransform, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Vehicle } from './vehicle.model';
import { VehicleService } from './vehicle.service';
import { InfoModalContent } from './info/info.component'
import { NewVehicleModalContent } from './newVehicle/newVehicle.component'

@Component({
  selector: 'vehicles',
  templateUrl: './vehicle.component.html'
})
export class VehicleComponent implements OnInit {
  vehicles: Vehicle[] = [];
  search: string = '';

  constructor(private vehicleService: VehicleService, private route: Router,
    private modalService: NgbModal) { }

  async ngOnInit() {
    this.vehicleService.getVehicles().subscribe((values) => this.vehicles = values);
  }

  onTrack(vehicle: Vehicle) {
    this.vehicleService.setTrackedVehicle(vehicle);
  }

  onDelete(vehicle: Vehicle) {
    this.vehicleService.deleteVehicle(vehicle);
  }

  onAdd() {
    this.modalService.open(NewVehicleModalContent);
  }

  onAddInfo(vehicle: Vehicle) {
    const modalRef = this.modalService.open(InfoModalContent, { size: 'lg' });

    modalRef.componentInstance.setVehicle({ ...vehicle, additionalInfo: vehicle.additionalInfo && JSON.parse(vehicle.additionalInfo) });
  }

  onSearch(value: string) {
    const searchArray = this.vehicleService.getSavedVehicles().getValue().filter(vehicle =>
      vehicle.name.toLowerCase().includes(value.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(value.toLowerCase()));

    if (this.vehicles.length !== searchArray.length) {
      this.vehicles = [...searchArray];
    }
  }
}
