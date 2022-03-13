import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppRoutingModule } from './app-routing.module'
import { VehicleComponent } from './vehicle/vehicle.component'
import { InfoModalContent } from './vehicle/info/info.component'
import { NewVehicleModalContent } from './vehicle/newVehicle/newVehicle.component'


import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';

import {VehicleService} from './vehicle/vehicle.service'

@NgModule({
  declarations: [
    AppComponent, VehicleComponent, MapComponent, InfoModalContent, NewVehicleModalContent
  ],
  imports: [
    AppRoutingModule, BrowserModule, HttpClientModule, NgbModule, FormsModule, ReactiveFormsModule
  ],
  providers: [VehicleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
