import React from "react";
import _ from 'lodash';

let polygonColors = ['green', 'rgb(180,180,180)', 'rgb(220,220,220)', 'gray', 'pink'];

// https://stackoverflow.com/a/42234774
const getCenterFromDegrees = data =>
{       
    if (!(data.length > 0)){
        return false;
    } 

    let num_coords = data.length;

    let X = 0.0;
    let Y = 0.0;
    let Z = 0.0;

    for(let i = 0; i < data.length; i++){
        let lat = data[i][0] * Math.PI / 180;
        let lon = data[i][1] * Math.PI / 180;

        let a = Math.cos(lat) * Math.cos(lon);
        let b = Math.cos(lat) * Math.sin(lon);
        let c = Math.sin(lat);

        X += a;
        Y += b;
        Z += c;
    }

    X /= num_coords;
    Y /= num_coords;
    Z /= num_coords;

    let lon = Math.atan2(Y, X);
    let hyp = Math.sqrt(X * X + Y * Y);
    let lat = Math.atan2(Z, hyp);

    let newX = (lat * 180 / Math.PI);
    let newY = (lon * 180 / Math.PI);

    return [newX, newY];
}

const Polygons = ({ mapState: { width, height }, latLngToPixel, shapes }) => {
  let polygons = [], idx = 0;
  
  _.map(shapes, (shape, key) => {
    let coordsArray = shape.coords;
    let points = [];
    
    if (coordsArray.length < 2) {
      return null
    }

    for (let i = 0; i < coordsArray.length; i++) {
      points[i] = latLngToPixel(coordsArray[i]);
    }

    let defaultLabelPxCoords = getCenterFromDegrees(coordsArray);
    
    polygons.push(
      <polygon 
        key={'polygon-'+idx} 
        points={_.flatten(points)} 
        style={{fill: (shape.color || polygonColors[shape.id % 5]) }} 
        stroke={shape.strokeColor || 'rgb(0,0,0)'} 
        strokeWidth={shape.strokeWidth || '1px'} 
        strokeDasharray={shape.strokeDasharray || 'none'}
      />
    );
    let pixelLatLong = latLngToPixel( (shape.label && shape.label.coords) || defaultLabelPxCoords);
    polygons.push(
      <text 
        key={'label-'+idx} 
        x={pixelLatLong[0]} 
        y={pixelLatLong[1]} 
        textAnchor="middle" 
        fontSize={ (shape.label && shape.label.fontSize) || "15"} 
        fill={ (shape.label && shape.label.color) || 'rgb(0,0,0)'}>
          {key}
        </text>
      );
    idx++;
  });

  return (
    <svg width={width} height={height} style={{ top: 0, left: 0 }} >
      {polygons}
    </svg>
  )
}

export default Polygons;