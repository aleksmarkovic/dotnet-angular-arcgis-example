import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import Point from '@arcgis/core/geometry/Point';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

import { VehicleService } from '../vehicle/vehicle.service'
import { Vehicle } from '../vehicle/vehicle.model'

import { pointGraphic, textGraphic } from './graphics'

class Coordinates {
  private coordsWidget: HTMLDivElement;

  constructor(private view: MapView) {
    this.coordsWidget = document.createElement("div");
    this.coordsWidget.id = "coordsWidget";
    this.coordsWidget.className = "esri-widget esri-component";
    this.coordsWidget.style.padding = "7px 15px 5px";
  }

  public showCoordinates = (pt: Point) => {
    const coords =
      "Lat/Lon " +
      pt.latitude.toFixed(3) +
      " " +
      pt.longitude.toFixed(3) +
      " | Scale 1:" +
      Math.round(this.view.scale * 1) / 1 +
      " | Zoom " +
      this.view.zoom;
    this.coordsWidget.innerHTML = coords;
  }

  public getCoordsWidget = () => this.coordsWidget;
}

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnDestroy {
  public view: MapView | undefined;
  public vehicles: Vehicle[];

  private webmap: WebMap;
  private graphicsLayer: GraphicsLayer;

  constructor(private route: ActivatedRoute, private vehicleService: VehicleService) {
    this.vehicles = [];

    this.webmap = new WebMap({
      portalItem: {
        id: 'aa1d3f80270146208328cf66d022e09c',
      },
    });
    this.graphicsLayer = new GraphicsLayer();
  }

  // The <div> where we will place the map
  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;

  initializeMap(): Promise<any> {
    const container = this.mapViewEl.nativeElement;

    const view = new MapView({
      container,
      map: this.webmap,
      center: [15.758, 45.330],
      zoom: 8
    });

    // adding coordinates
    const coords = new Coordinates(view);

    view.ui.add(coords.getCoordsWidget(), "bottom-right");

    view.watch("stationary", function (isStationary) {
      coords.showCoordinates(view.center);
    });

    view.on("pointer-move", function (evt) {
      coords.showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
    });

    this.view = view;
    return this.view.when();
  }

  addVehiclePoints() {
    this.webmap.remove(this.graphicsLayer);
    this.graphicsLayer.removeAll();

    this.webmap.add(this.graphicsLayer);

    this.vehicles.forEach((vehicle: Vehicle) => {
      const point = new Point({ longitude: vehicle.longitudePosition, latitude: vehicle.latitudePosition });

      this.graphicsLayer.add(pointGraphic(vehicle.id, point, 'blue'));
      this.graphicsLayer.add(textGraphic(`${vehicle.brand}  ${vehicle.name}`, point));
    });
  }

  highlightVehicle(vehicle: Vehicle) {
    this.webmap.remove(this.graphicsLayer);
    const oldGraphics = this.graphicsLayer.graphics.clone();

    this.graphicsLayer.graphics = oldGraphics.map((graphic) => {
      if (!graphic.attributes?.vehicleId) {
        return graphic;
      }
      const point = graphic.geometry.clone();

      if (graphic.attributes.vehicleId === vehicle.id) {
        console.log('match')

        if (this.view) {
          this.view.center = new Point({ longitude: point.get('x'), latitude: point.get('y') })
        }

        return pointGraphic(graphic.attributes.vehicleId, point, 'red');
      }

      return pointGraphic(graphic.attributes.vehicleId, point, 'blue');
    })

    this.webmap.add(this.graphicsLayer);
  }

  ngOnInit(): any {
    this.initializeMap();

    this.vehicleService.getSavedVehicles().subscribe((values) => {
      this.vehicles = values;
      this.addVehiclePoints();
    });

    this.vehicleService.getTrackedVehicle().subscribe((value) => {
      if (value) {
        this.highlightVehicle(value);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.view) {
      this.view.destroy();
    }
  }
}
