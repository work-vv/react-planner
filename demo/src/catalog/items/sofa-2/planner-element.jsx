import {BoxHelper, Box3, ObjectLoader} from 'three';
import {loadObjWithMaterial} from '../../utils/load-obj';
import path from 'path';
import convert from 'convert-units';

import React from 'react';

const mtl = require('./burlap-sofa.mtl');
const obj = require('./burlap-sofa.obj');
const preview = require('./burlap-sofa.jpg');
const image2d = require('./burlap-sofa-2d.png');

const width = {length: 170, unit: 'cm'};
const depth = {length: 90, unit: 'cm'};
const height = {length: 80, unit: 'cm'};
const scale = 1;

export default {
  name: 'sofa-2',
  prototype: 'items',

  info: {
    title: 'sofa-2',
    tag: ['furnishings', 'burlap sofa', 'bump sofa'],
    description: 'Burlap sofa',
    image: preview,
  },

  properties: {},

  render2D: function (element, layer, scene) {

    return (
      <g transform={`translate(${-width.length / 2},${-depth.length / 2})`}>
        <image href={image2d}  width={width.length} height={depth.length} />
      </g>
    );  
  },

  render3D: function (element, layer, scene) {

    let onLoadItem = (object) => {
      let newWidth = convert(width.length).from(width.unit).to(scene.unit) * scale;
      let newHeight = convert(height.length).from(height.unit).to(scene.unit) * scale;
      let newDepth = convert(depth.length).from(depth.unit).to(scene.unit) * scale;

      let box = new BoxHelper(object, 0x99c3fb);
      box.material.linewidth = 2;
      box.material.depthTest = false;
      box.renderOrder = 1000;
      box.visible = element.selected;
      object.add(box);

      object.scale.set(newWidth / width.length, newHeight / height.length, newDepth / depth.length);

      // Normalize the origin of this item
      let boundingBox = new Box3().setFromObject(object);

      let center = [
        (boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x,
        (boundingBox.max.y - boundingBox.min.y) / 2 + boundingBox.min.y,
        (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z];

      object.position.x -= center[0];
      object.position.y -= center[1] - (boundingBox.max.y - boundingBox.min.y) / 2;
      object.position.z -= center[2];

      return object;
    };

    return loadObjWithMaterial(mtl, obj)
      .then(object => {
        return onLoadItem(object)
      });
  },

};
