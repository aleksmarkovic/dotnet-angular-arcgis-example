import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { Vehicle } from './vehicle.model'

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private vehicles = new BehaviorSubject<Vehicle[]>([]);
  private trackedVehicle = new BehaviorSubject<Vehicle | undefined>(undefined);

  constructor(private http: HttpClient) { }

  getTrackedVehicle = () => this.trackedVehicle;
  setTrackedVehicle = (vehicle: Vehicle) => this.trackedVehicle.next(vehicle);

  getSavedVehicles = () => this.vehicles;

  getVehicles = () => {
    this.http.get<Vehicle[]>('/vehicle').subscribe((values) => this.vehicles.next(values));

    return this.vehicles;
  };

  updateVehicle = async (vehicle: Vehicle) => {
    this.http.put<Vehicle>(`/vehicle/${vehicle.id}`, vehicle).subscribe(() => {
      this.vehicles.next(this.vehicles.getValue().map((existingVehicle: Vehicle) => {
        if (existingVehicle.id === vehicle.id) {
          return vehicle;
        }

        return existingVehicle;
      }));
    });
  };

  addVehicle = (vehicle: Vehicle) => {
    const getRandomArbitrary = () => Math.random() * 999;
    
    vehicle.latitudePosition = 45 + getRandomArbitrary() / 1000;
    vehicle.longitudePosition = 15 + getRandomArbitrary() / 1000
    vehicle.additionalInfo = '';

    this.http.post<number>(`/vehicle`, vehicle).subscribe((value) => {
      this.vehicles.next([...this.vehicles.getValue(), { ...vehicle, id: value } ]);
    });
  }

  deleteVehicle = (vehicle: Vehicle) => {
    this.http.delete(`/vehicle/${vehicle.id}`).subscribe(() => {
      this.vehicles.next(this.vehicles.getValue().filter(currentVehicle => currentVehicle.id !== vehicle.id));
    });
  }
}
