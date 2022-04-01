import {BoxHelper, Box3, ObjectLoader} from 'three';
import {loadUnit} from '../utils/load-obj';
import convert from 'convert-units';

import React from 'react';

let width, depth, height, scale, unit;
let el, preview, image2d;

let object = {

  init: function ({ name, prototype, info, properties, size, asset }) {
    this.name = name;
    this.prototype = prototype;
    this.info = info;
    this.properties = properties;
    ({width, depth, height, scale, unit} = size);
    ({el, preview, image2d} = asset);
    return this;
  },

  render2D: function (element, layer, scene) {

    return (
      <g transform={`translate(${-width / 2},${-depth / 2})`}>
        <image href={image2d}  width={width} height={depth} />
      </g>
    );  
  },

  render3D: function (element, layer, scene) {

    let onLoadItem = (object) => {
      let newWidth = convert(width).from(unit).to(scene.unit) * scale;
      let newHeight = convert(height).from(unit).to(scene.unit) * scale;
      let newDepth = convert(depth).from(unit).to(scene.unit) * scale;

      let box = new BoxHelper(object, 0x99c3fb);
      box.material.linewidth = 2;
      box.material.depthTest = false;
      box.renderOrder = 1000;
      box.visible = element.selected;
      object.add(box);

      object.scale.set(newWidth / width, newHeight / height, newDepth / depth);

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

    return loadUnit(el)
      .then(object => {
        return onLoadItem(object)
      });
  },

  updateRender3D: ( element, layer, scene, mesh, oldElement, differences, selfDestroy, selfBuild ) => {

    let noPerf = () => { selfDestroy(); return selfBuild(); };

    if( differences.indexOf('selected') !== -1 )
    {
      mesh.traverse(( child ) => {
        if ( child instanceof BoxHelper ) {
          child.visible = element.selected;
        }
      });

      return Promise.resolve(mesh);
    }

    if( differences.indexOf('rotation') !== -1 ) {
      mesh.rotation.y = element.rotation * Math.PI / 180;
      return Promise.resolve(mesh);
    }

    return noPerf();
  }
};

export default Object.assign(object);
