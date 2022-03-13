import Point from '@arcgis/core/geometry/Point';
import Geometry from '@arcgis/core/geometry/Geometry';
import Graphic from '@arcgis/core/Graphic';
import TextSymbol from "@arcgis/core/symbols/TextSymbol";

export function pointGraphic(id: number, point: Point | Geometry, color: string) {
  const simpleMarkerSymbol = {
    style: 'triangle',
    color: color,
    type: "simple-marker",
    size: '20px',
  };

  return new Graphic({
    geometry: point,
    symbol: simpleMarkerSymbol,
    attributes: { vehicleId: id }
  });
}

export function textGraphic(text: string, point: Point) {
  let textMarkerSymbol = {
    text,
    yoffset: -16
  };

  const textSymbol = new TextSymbol(textMarkerSymbol);

  return new Graphic({
    geometry: point,
    symbol: textSymbol
  });
}
